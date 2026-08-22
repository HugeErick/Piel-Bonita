import { supabaseAdmin } from "$lib/server/supabaseAdmin";
import type { Cookies } from "@sveltejs/kit";

const COOKIE_NAME = "session_id";

export async function createSession(email: string, cookies: Cookies) {
  const { data, error } = await supabaseAdmin
  .from("pielBonitaSessions")
  .insert({ email })
  .select("id, expires_at")
  .single();

  if (error || !data) throw error ?? new Error("Failed to create session");

  cookies.set(COOKIE_NAME, data.id, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: new Date(data.expires_at),
  });

  return data;
}

export async function getSessionUser(cookies: Cookies) {
  const sessionId = cookies.get(COOKIE_NAME);
  if (!sessionId) return null;

  const { data, error } = await supabaseAdmin
  .from("pielBonitaSessions")
  .select("id, email, expires_at")
  .eq("id", sessionId)
  .gt("expires_at", new Date().toISOString())
  .single();

  if (error || !data) return null;

  // sliding expiry — bump last_seen_at, don't block on it
  supabaseAdmin
  .from("pielBonitaSessions")
  .update({ last_seen_at: new Date().toISOString() })
  .eq("id", data.id)
  .then();

  return { email: data.email };
}

export async function destroySession(cookies: Cookies) {
  const sessionId = cookies.get(COOKIE_NAME);
  if (sessionId) {
    await supabaseAdmin.from("pielBonitaSessions").delete().eq("id", sessionId);
  }
  cookies.delete(COOKIE_NAME, { path: "/" });
}
