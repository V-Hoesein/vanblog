import { prisma } from "@/lib/client";
import { NextResponse } from "next/server";

export const GET = async (
  _: Request,
  { params }: { params: { pid?: string } }
) => {
  try {
    const { pid } = params;
    if (!pid) {
      return NextResponse.json(
        { message: "Post ID is required" },
        { status: 400 }
      );
    }

    const post = await prisma.post.findUnique({ where: { id: pid } });

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
