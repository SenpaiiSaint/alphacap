// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import * as Sentry from "@sentry/nextjs";

const SALT_ROUNDS = process.env.NODE_ENV === "production" ? 12 : 10;

export async function POST(request: Request) {
  let bodyData;
  try {
    // Read the raw request body as text.
    const rawBody = await request.text();
    
    // If the raw body is empty, return a clear error message.
    if (!rawBody) {
      return NextResponse.json(
        { error: "Empty request body" },
        { status: 400 }
      );
    }
    
    // Attempt to parse the JSON.
    bodyData = JSON.parse(rawBody);
  } catch (parseError) {
    console.error("Error parsing request body:", parseError);
    Sentry.captureException(parseError);
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  const { email, password, role } = bodyData;
  if (!email || !password || !role) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password securely using bcryptjs
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user record.
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role, // e.g., "EMPLOYEE"
      },
    });

    // Return non-sensitive user data to the client.
    return NextResponse.json(
      { user: { id: user.id, email: user.email, role: user.role } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Sign-up error:", error);
    Sentry.captureException(error); // Capture the error with Sentry
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
