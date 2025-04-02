import { prisma } from "@/lib/client";
import { userSchema } from "@/lib/zod/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export interface ResponseData {
  message: string;
  status: "success" | "error";
  data?: object | string;
}

const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const validatedFields = userSchema.safeParse(body);
    if (!validatedFields.success) {
      return NextResponse.json(
        {
          message: "Invalid request body",
          status: "error",
          data: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, password, username } = validatedFields.data;

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "Email or Username already exists",
          status: "error",
          data: null,
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        status: "success",
        data: { id: newUser.id, name: newUser.name, email: newUser.email },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      {
        message: "Error creating user",
        status: "error",
        data: null,
      },
      { status: 500 }
    );
  }
};

export { POST };
