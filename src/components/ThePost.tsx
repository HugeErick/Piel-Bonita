"use client";

import { formatTimeToNow } from "@/lib/utils";
import { Post } from "@prisma/client";
import { FC, useRef } from "react";
import EditorOutput from "./EditorOutput";
import Link from "next/link";
import { Icons } from "./Icons";

interface ThePostProps {
  post: Post;
}

const ThePost: FC<ThePostProps> = ({ post }) => {
  const pRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className="rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        <div className="w-0 flex-1">
          <div className="bg-gray-50 z-20 text-sm px-4 py-4 sm:px-6">
            <Link
              href={`/p/post/${post.id}`}
              className="w-fit flex items-center gap-2"
            >
              {" "}
              View Content
              <Icons.tempLogo />
            </Link>
          </div>
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            {formatTimeToNow(new Date(post.createdAt))}
          </div>
          <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
            {post.title}
          </h1>
          <div
            className="relative text-sm max-h-40 w-full overflow-clip"
            ref={pRef}
          >
            <EditorOutput content={post.content} />
            {pRef.current?.clientHeight === 160 ? (
              // blur bottom if content is too long
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ThePost;
