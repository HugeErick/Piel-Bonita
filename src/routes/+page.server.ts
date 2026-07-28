import type { PageServerLoad, Actions } from "./$types";
import { createSession, destroySession } from "$lib/server/session";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = ({ locals }) => {
  return { user: locals.user };
};

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    const form = await request.formData();
    const email = form.get("email")?.toString().trim();

    // todo implement zed for validations
    if (!email || !email.includes("@")) {
      return fail(400, { error: "Enter a valid email" });
    }

    await createSession(email, cookies);
    return { success: true };
  },

  logout: async ({ cookies }) => {
    await destroySession(cookies);
    return { success: true };
  },
};
