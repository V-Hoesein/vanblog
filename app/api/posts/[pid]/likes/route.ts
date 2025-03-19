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

    const likeCount = await prisma.like.count({
      where: { postId: pid },
    });

    return NextResponse.json({
      message: "Like count fetched successfully",
      data: {
        postId: pid,
        like: likeCount,
      },
    });
  } catch (error) {
    console.error("Error fetching like count:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
