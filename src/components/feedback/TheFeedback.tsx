"use client";

import { formatTimeToNow } from "@/lib/utils";
import { FeedbackPost, User } from "@prisma/client";
import { FC } from "react";
import { UserAvatar } from "../UserAvatar";

interface TheFeedbackProps {
  feedback: FeedbackPost & {
    creator: User;
  };
}

const TheFeedback: FC<TheFeedbackProps> = ({ feedback }) => {
  return (
    <div>
      <div className="flex w-full gap-2">
        <UserAvatar
          user={{
            name: feedback.creator.name || null,
            image: feedback.creator.image || null,
          }}
          className="h-6 w-6"
        />
        <div>
          <span>{feedback.creator.name} </span>
        </div>
        <div className="max-h-40 mt-[6px] text-xs text-gray-500">
          {formatTimeToNow(new Date(feedback.createdAt))}
        </div>
      </div>
      <div className="flex items-center my-4">
        <p className="text-xl text-zinc-900 dark:text-white indent-2">
          {feedback.content}
        </p>
      </div>
    </div>
  );
};

export default TheFeedback;