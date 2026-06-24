// src/lib/server/catalogue.ts
import { writable, get } from "svelte/store";

const DB_NAME    = "piel-bonita";
const STORE_NAME = "box-images";
const META_KEY   = "__catalogue_meta__";
const VERSION    = 1;
const BOX_COUNT  = 5;
const CHANNEL    = "catalogue-sync";

export type Layout = "grid" | "list";

export interface CatalogueState {
  previews : (string | null)[];   // object-URL strings, one per box
  layout   : Layout;
}

// writable store
export const catalogue = writable<CatalogueState>({
  previews : Array(BOX_COUNT).fill(null),
  layout   : "grid",
});

// indexedDB helpers
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE_NAME);
    req.onsuccess       = () => resolve(req.result);
    req.onerror         = () => reject(req.error);
  });
}

async function dbPut(key: string, value: Blob | string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(value, key);
    tx.oncomplete = () => resolve();
    tx.onerror    = () => reject(tx.error);
  });
}

async function dbGet<T>(key: string): Promise<T | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(STORE_NAME, "readonly");
    const req = tx.objectStore(STORE_NAME).get(key);
    req.onsuccess = () => resolve(req.result ?? null);
    req.onerror   = () => reject(req.error);
  });
}

async function dbDelete(key: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror    = () => reject(tx.error);
  });
}

// broadcastChannel
let bc: BroadcastChannel | null = null;

function getChannel(): BroadcastChannel {
  if (!bc) bc = new BroadcastChannel(CHANNEL);
  return bc;
}

type SyncMessage =
  | { type: "layout";  layout: Layout }
  | { type: "image";   index: number }   // tells other tabs to reload from IDB
  | { type: "delete";  index: number };

function broadcast(msg: SyncMessage) {
  getChannel().postMessage(msg);
}

// initialise: load persisted state into store
export async function initCatalogue(): Promise<void> {
  // load layout preference
  const meta = await dbGet<{ layout: Layout }>(META_KEY);
  const layout: Layout = meta?.layout ?? "grid";

  // load image blobs → object urls
  const previews: (string | null)[] = Array(BOX_COUNT).fill(null);
  for (let i = 0; i < BOX_COUNT; i++) {
    const blob = await dbGet<Blob>(`box${i + 1}`);
    if (blob) previews[i] = URL.createObjectURL(blob);
  }

  catalogue.set({ previews, layout });

  // listen for updates from other tabs
  getChannel().onmessage = async (e: MessageEvent<SyncMessage>) => {
    const msg = e.data;
    const state = get(catalogue);

    if (msg.type === "layout") {
      catalogue.set({ ...state, layout: msg.layout });
    }

    if (msg.type === "image") {
      const blob = await dbGet<Blob>(`box${msg.index + 1}`);
      const next = [...state.previews];
      if (next[msg.index]) URL.revokeObjectURL(next[msg.index]!);
      next[msg.index] = blob ? URL.createObjectURL(blob) : null;
      catalogue.set({ ...state, previews: next });
    }

    if (msg.type === "delete") {
      const next = [...state.previews];
      if (next[msg.index]) URL.revokeObjectURL(next[msg.index]!);
      next[msg.index] = null;
      catalogue.set({ ...state, previews: next });
    }
  };
}

// public API used by admin

/** persist a new image for a box and update the store + notify other tabs. */
export async function saveBoxImage(index: number, file: File): Promise<void> {
  await dbPut(`box${index + 1}`, file);

  catalogue.update(s => {
    const previews = [...s.previews];
    if (previews[index]) URL.revokeObjectURL(previews[index]!);
    previews[index] = URL.createObjectURL(file);
    return { ...s, previews };
  });

  broadcast({ type: "image", index });
}

/** delete a box image from persistence and update the store + notify. */
export async function deleteBoxImage(index: number): Promise<void> {
  await dbDelete(`box${index + 1}`);

  catalogue.update(s => {
    const previews = [...s.previews];
    if (previews[index]) URL.revokeObjectURL(previews[index]!);
    previews[index] = null;
    return { ...s, previews };
  });

  broadcast({ type: "delete", index });
}

/** persist layout choice and notify other tabs. */
export async function saveLayout(layout: Layout): Promise<void> {
  const meta = await dbGet<object>(META_KEY) ?? {};
  await dbPut(META_KEY, JSON.stringify({ ...meta, layout }) as unknown as Blob);

  catalogue.update(s => ({ ...s, layout }));
  broadcast({ type: "layout", layout });
}

