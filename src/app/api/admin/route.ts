import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PasswordAdminValidator } from "@/lib/validators/passwordAdmin";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const username = session.user.username;

    const body = await req.json();
    const { password } = PasswordAdminValidator.parse(body);

    if (password === process.env.AMORCITOPASSW) {
      const admin = await db.admin.create({
        data: {
          adminname: username,
          userId: session.user.id,
        },
      });
      return new Response(admin.adminname, {
        status: 200,
      });
    } else {
      return new Response("Go away", { status: 403 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}
