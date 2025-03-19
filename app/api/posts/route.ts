import { prisma } from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";
import postSchema from "@/lib/zod/post";

export const GET = async () => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        Comment: true,
        _count: {
          select: { Like: true },
        },
      },
    });
    return NextResponse.json({
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching posts" },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validate = postSchema.safeParse(body);
    if (!validate.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: validate.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({ data: validate.data });

    return NextResponse.json(
      { message: "Post created successfully", data: post.title },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
