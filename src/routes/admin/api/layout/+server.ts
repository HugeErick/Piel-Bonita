import { json } from "@sveltejs/kit";
import { supabaseAdmin } from "$lib/server/supabaseAdmin";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const { layout } = await request.json();
  if (layout !== "grid" && layout !== "list") {
    return json({ error: "Invalid layout" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("catalogue_settings")
    .update({ layout, updated_at: new Date().toISOString() })
    .eq("id", true);

  if (error) return json({ error: error.message }, { status: 500 });
  return json({ ok: true });
};
