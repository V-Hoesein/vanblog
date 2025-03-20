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

export const POST = async (
  request: NextRequest,
  { params }: { params: Promise<{ pid: string }> }
) => {
  try {
    const { pid } = await params;

    if (!pid) {
      return NextResponse.json(
        { message: "Missing postId parameter" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { message: "Missing userId parameter" },
        { status: 400 }
      );
    }

    const existPost = await prisma.post.findUnique({
      where: { id: pid },
    });

    if (!existPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const existingLike = await prisma.like.findFirst({
      where: { postId: pid, userId },
    });

    if (existingLike) {
      const unlike = await prisma.like.delete({
        where: { id: existingLike.id },
      });

      return NextResponse.json(
        { message: "Post unliked successfully", data: unlike },
        { status: 201 }
      );
    }

    const liked = await prisma.like.create({
      data: {
        postId: pid,
        userId,
      },
    });

    return NextResponse.json(
      { message: "Post liked successfully", data: liked.postId },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error liking post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
