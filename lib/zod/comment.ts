import { z } from "zod";

const commentSchema = z.object({
  content: z.string().min(1, { message: "Content cannot be empty" }),
  postId: z.string().cuid({ message: "Invalid post ID" }),
  commentatorId: z.string().cuid({ message: "Invalid commentator ID" }),
});

export type CommentType = z.infer<typeof commentSchema>;
export default commentSchema;
