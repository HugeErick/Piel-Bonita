import { error, type Handle } from "@sveltejs/kit";
import { verifyToken } from "$lib/server/adminAuth";
import { getSessionUser } from "$lib/server/session";

export const handle: Handle = async ({ event, resolve }) => {
  // check if the user is trying to access any route starting with /admin
  if (event.url.pathname.startsWith("/admin")) {
    const token = event.url.searchParams.get("key") ?? "";
    if (!verifyToken(token)) {
      error(404, "Not Found");
    }
  }

  event.locals.user = await getSessionUser(event.cookies);

  return resolve(event);
};
