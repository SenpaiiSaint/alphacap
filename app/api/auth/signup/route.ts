import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Using a higher number for production and a lower number for development
const SALT_ROUNDS = process.env.NODE_ENV === "production" ? 12 : 10;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password, role } = body;

        //Validating required fields
        if (!email || !password || !role) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Checking if the user already exists
        const exisitingUser = await prisma.user.findUnique({ where: { email } });
        if (exisitingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // Hashing the password using bcryptjs asynchronously
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating the user record; only return non-sensitive fields
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role,
            },
        });

        return NextResponse.json(
            { user: { id: user.id, email: user.email, role: user.role } },
            { status: 201 }
        );
    } catch (error) {
        console.error("Sign-up error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}