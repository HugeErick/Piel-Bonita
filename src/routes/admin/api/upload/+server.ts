import { json } from "@sveltejs/kit";
import { supabaseAdmin } from "$lib/server/supabaseAdmin";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const form = await request.formData();
  const file = form.get("file") as File | null;
  const indexRaw = form.get("index");

  const index = Number(indexRaw);
  if (!file || Number.isNaN(index) || index < 0 || index > 4) {
    return json({ error: "Missing file or invalid box index" }, { status: 400 });
  }

  const ext = file.name.split(".").pop() || "jpg";
  const path = `box-${index}.${ext}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from("catalogue-images")
    .upload(path, file, { upsert: true, contentType: file.type });

  if (uploadError) {
    return json({ error: uploadError.message }, { status: 500 });
  }

  const { data, error: dbError } = await supabaseAdmin
    .from("catalogue_images")
    .upsert({ box_index: index, storage_path: path, updated_at: new Date().toISOString() })
    .select()
    .single();

  if (dbError) {
    return json({ error: dbError.message }, { status: 500 });
  }

  const { data: { publicUrl } } = supabaseAdmin.storage
    .from("catalogue-images")
    .getPublicUrl(path);

  return json({ url: `${publicUrl}?v=${new Date(data.updated_at).getTime()}` });
};
