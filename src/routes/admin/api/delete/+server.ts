import { json } from "@sveltejs/kit";
import { supabaseAdmin } from "$lib/server/supabaseAdmin";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const { index } = await request.json();
  if (typeof index !== "number" || index < 0 || index > 4) {
    return json({ error: "Invalid box index" }, { status: 400 });
  }

  const { data: row } = await supabaseAdmin
    .from("catalogue_images")
    .select("storage_path")
    .eq("box_index", index)
    .maybeSingle();

  if (row?.storage_path) {
    await supabaseAdmin.storage.from("catalogue-images").remove([row.storage_path]);
  }

  const { error } = await supabaseAdmin
    .from("catalogue_images")
    .delete()
    .eq("box_index", index);

  if (error) return json({ error: error.message }, { status: 500 });
  return json({ ok: true });
};
