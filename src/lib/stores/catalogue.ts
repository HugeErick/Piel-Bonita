// src/lib/server/catalogue.ts
import { writable, get } from "svelte/store";
import { supabase } from "$lib/supabaseClient";

const BOX_COUNT  = 5;

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

function publicUrlFor(path: string, updatedAt: string) {
  const { data } = supabase.storage.from("catalogue-images").getPublicUrl(path);
  return `${data.publicUrl}?v=${new Date(updatedAt).getTime()}`;
}

async function refreshCatalogue(): Promise<void> {
  const [{ data: images }, {data: settings }] = await Promise.all([
    supabase.from("catalogue_images").select("box_index, storage_path, updated_at"),
    supabase.from("catalogue_settings").select("layout").eq("id", true).single(),
  ]);
  const previews: (string | null)[] = Array(BOX_COUNT).fill(null);
  for (const row of images ?? []) {
    previews[row.box_index] = publicUrlFor(row.storage_path, row.updated_at);
  } 
  catalogue.set({ previews, layout: (settings?.layout as Layout) ?? "grid" });
}

let syncChannel: ReturnType<typeof supabase.channel> | null = null;

export async function initCatalogue(): Promise<void> {
  await refreshCatalogue();

  if (syncChannel) return;

  // live sync across tabs/users
  syncChannel = supabase
  .channel("catalogue-sync")
  .on("postgres_changes", { event: "*", schema: "public", table: "catalogue_images" }, () => {
    refreshCatalogue();
  })
  .on("postgres_changes", { event: "*", schema: "public", table: "catalogue_settings" }, () => {
    refreshCatalogue();
  })
  .subscribe();
}

function currentAdminKey(): string {
  return new URLSearchParams(window.location.search).get("key") ?? "";
}

function withKey(path: string): string {
  const key = currentAdminKey();
  return key ? `${path}?key=${encodeURIComponent(key)}` : path;
}


async function adminFetch(path: string, init: RequestInit) {
  const res = await fetch(withKey(path), init);
  if (!res.ok) {
    // hooks.server.ts returns a plain error(404) — not JSON — on a bad/expired key
    if (res.status === 404) {
      throw new Error("Admin session expired — reload the page with a fresh admin link.");
    }
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed (${res.status})`);
  }
  return res;
}

export async function saveBoxImage(index: number, file: File): Promise<void> {
  const form = new FormData();
  form.append("file", file);
  form.append("index", String(index));

  const res = await adminFetch("/admin/api/upload", { method: "POST", body: form });
  const { url } = await res.json();

  catalogue.update((s) => {
    const previews = [...s.previews];
    previews[index] = url;
    return { ...s, previews };
  });
}

export async function deleteBoxImage(index: number): Promise<void> {
  await adminFetch("/admin/api/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ index }),
  });

  catalogue.update((s) => {
    const previews = [...s.previews];
    previews[index] = null;
    return { ...s, previews };
  });
}

export async function saveLayout(layout: Layout): Promise<void> {
  await adminFetch("/admin/api/layout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ layout }),
  });

  catalogue.update((s) => ({ ...s, layout }));
}

