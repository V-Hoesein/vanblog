import { prisma } from "@/lib/client";
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
