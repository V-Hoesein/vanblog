import { prisma } from "@/lib/client";
import commentSchema from "@/lib/zod/comment";
import { NextRequest, NextResponse } from "next/server";

const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ postId: string; commentId: string }> }
) => {
  const { postId, commentId } = await params;

  // params validation
  if (!postId || !commentId) {
    return NextResponse.json(
      {
        message: "Missing postId or commentId parameter",
        status: 400,
        data: null,
      },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    const validate = commentSchema.partial().safeParse(body); // only content is required

    if (!validate.success) {
      const { fieldErrors } = validate.error.flatten();
      return NextResponse.json(
        {
          message: "Validation error",
          status: "error",
          data: fieldErrors,
        },
        { status: 400 }
      );
    }

    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: body,
    });

    if (!updatedComment) {
      return NextResponse.json(
        { message: "Comment not found", data: null },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Comment updated successfully",
        status: "success",
        data: updatedComment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json(
      { message: "Internal Server Error", data: null },
      { status: 500 }
    );
  }
};

export { PUT };
