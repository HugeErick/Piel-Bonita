import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { FeedbackValidator } from "@/lib/validators/feedback";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { content } = FeedbackValidator.parse(body);

    const feedback = await db.feedbackPost.create({
      data: {
        content,
        creatorId: session.user.id,
      },
    });

    return new Response(feedback.content);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}