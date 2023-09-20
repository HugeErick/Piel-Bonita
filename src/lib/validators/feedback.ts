import { z } from "zod";

export const FeedbackValidator = z.object({
  content: z.string().min(3).max(200),
});

export type CreateFeedbackPayload = z.infer<typeof FeedbackValidator>;