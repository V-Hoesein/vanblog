import { signIn } from "@/lib/auth";
import { signInSchema } from "@/lib/zod/auth";
import { NextRequest, NextResponse } from "next/server";

const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validatedFields = signInSchema.safeParse(body);

    if (!validatedFields.success) {
      const { fieldErrors } = validatedFields.error.flatten();
      return NextResponse.json(
        {
          message: "Invalid request body",
          status: "error",
          data: fieldErrors,
        },
        { status: 400 }
      );
    }

    const response = await signIn("credentials", { ...body, redirect: false });

    if (!response) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
          status: "error",
          data: null,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Signin successful",
        status: "success",
        data: [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during sign-in:", error);

    return NextResponse.json(
      {
        message: "Internal server error",
        status: "error",
        data: null,
      },
      { status: 500 }
    );
  }
};

export { POST };
