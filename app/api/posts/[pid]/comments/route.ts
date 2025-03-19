import { prisma } from "@/lib/client";
import commentSchema from "@/lib/zod/comment";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _: NextRequest,
  { params }: { params: Promise<{ pid?: string }> }
) => {
  try {
    const { pid } = await params;

    if (!pid) {
      return NextResponse.json(
        { message: "Missing postId parameter" },
        { status: 400 }
      );
    }

    const postComments = await prisma.comment.findMany({
      where: { postId: pid },
      include: { comentator: true },
    });

    return NextResponse.json({
      message: "Comments fetched successfully",
      data: postComments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { message: "Internal Server Error", data: null },
      { status: 500 }
    );
  }
};

export const POST = async (
  request: NextRequest,
  { params }: { params: Promise<{ pid?: string }> }
) => {
  try {
    const { pid } = await params;

    if (!pid) {
      return NextResponse.json(
        { message: "Missing postId parameter" },
        { status: 400 }
      );
    }

    const existPost = await prisma.post.findUnique({
      where: { id: pid },
    });

    if (!existPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const body = await request.json();

    const validate = commentSchema.safeParse(body);
    if (!validate.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: validate.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({
      data: {
        content: validate.data.content,
        postId: pid,
        comentatorId: validate.data.commentatorId,
      },
    });

    return NextResponse.json(
      { message: "Comment created successfully", data: comment.content },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error creating comment:", error);
    return NextResponse.json(
      { message: "Internal Server Error", data: null },
      { status: 500 }
    );
  }
};
