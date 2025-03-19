import { z } from "zod";

const postSchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(15, {
    message: "Title must be at least 15 characters long",
  }),
  content: z.string({ required_error: "Content is required" }).min(50, {
    message: "Content must be at least 50 characters long",
  }),
  authorId: z.string({ required_error: "Author ID is required" }),
});

export type PostType = z.infer<typeof postSchema>;
export default postSchema;
