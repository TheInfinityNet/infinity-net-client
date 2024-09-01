import { z } from "zod";

export const CreateCommentSchema = z.object({
  content: z.string().min(1).max(63206),
  postId: z.string().min(1),
  parentId: z.string().optional(),
});
