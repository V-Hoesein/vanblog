import { prisma } from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";
import postSchema from "@/lib/zod/post";
import { validationHandler } from "@/lib/zod/validationHandler";

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
    const validate = validationHandler(postSchema, body);

    if (!validate.success) {
      throw new Error("Validation failed: Data is undefined");
    }
    const author = await prisma.user.findUnique({
      where: { id: validate.data.authorId },
    });

    if (!author) {
      return NextResponse.json(
        {
          message: "Author not found",
          status: "error",
          data: null,
        },
        { status: 404 }
      );
    }

    const post = await prisma.post.create({
      data: {
        ...validate.data,
        authorId: validate.data.authorId,
      },
    });

    return NextResponse.json(
      {
        message: "Post created successfully",
        status: "success",
        data: post,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        status: "error",
        data: null,
      },
      { status: 500 }
    );
  }
};
