import type {Post, FeedbackPost, User} from "@prisma/client"

export type ExtendedPost = Post

export type ExtendedFeedbackPost = FeedbackPost & {
  creator: User;
}