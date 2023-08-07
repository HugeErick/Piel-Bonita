import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { PostValidator } from "@/lib/validators/post";
import { CachedPost } from "@/types/redis";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, content } = PostValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const admin = await db.admin.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    if (!admin) {
      return new Response("Unauthorized", { status: 401 });
    }

    const cookedpost = await db.post.create({
      data: {
        title,
        content,
        authorId: session.user.id,
      },
    });

    const cachePayload: CachedPost = {
      authorUsername: admin.adminname ?? "",
      content: JSON.stringify(cookedpost.content),
      id: cookedpost.id,
      title: cookedpost.title,
      createdAt: cookedpost.createdAt,
    };

    await redis.hset(`post:${cookedpost.id}`, cachePayload) // Store the post data as a hash

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not post to subreddit at this time. Please try later",
      { status: 500 }
    );
  }
}
