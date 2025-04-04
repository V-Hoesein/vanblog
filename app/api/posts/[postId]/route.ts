import { prisma } from "@/lib/client";
import postSchema from "@/lib/zod/post";
import { NextRequest, NextResponse } from "next/server";

const GET = async (_: Request, { params }: { params: { postId?: string } }) => {
  try {
    const { postId } = params;
    if (!postId) {
      return NextResponse.json(
        { message: "Post ID is required" },
        { status: 400 }
      );
    }

    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      return NextResponse.json(
        { message: "Post not found", data: null },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Post fetched successfully",
      data: post,
    });
  } catch (error) {
    console.error("Error fetching post", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

const PUT = async (
  request: NextRequest,
  { params }: { params: { postId?: string } }
) => {
  try {
    const { postId } = params;
    if (!postId) {
      return NextResponse.json(
        { message: "Post ID is required" },
        { status: 400 }
      );
    }

    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return NextResponse.json(
        { message: "Post not found", data: null },
        { status: 404 }
      );
    }

    const body = await request.json();
    const validate = postSchema.partial().safeParse(body);

    if (!validate.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: validate.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: validate.data,
    });

    return NextResponse.json(
      { message: "Post updated successfully", data: updatedPost },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

const DELETE = async (
  _: Request,
  { params }: { params: { postId?: string } }
) => {
  try {
    const { postId } = params;
    if (!postId) {
      return NextResponse.json(
        { message: "Post ID is required" },
        { status: 400 }
      );
    }

    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    await prisma.post.delete({ where: { id: postId } });

    return NextResponse.json(
      { message: "Post deleted successfully", data: postId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export { GET, PUT, DELETE };
