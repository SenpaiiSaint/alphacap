import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";


export async function GET(_request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const funds = await prisma.fund.findMany({
            where: { managerId: session.user.id },
        });
        return NextResponse.json({ funds });
    } catch (error) {
        console.error("GET /api/funds error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { name, budget } = body;
    if (!name || !budget) return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

    try {
        const fund = await prisma.fund.create({
            data: {
                name,
                budget,
                managerId: session.user.id,
            },
        });
        return NextResponse.json({ fund }, { status: 201 });
    } catch (error) {
        console.error("POST /api/funds error:", error);
        return NextResponse.json({ error: "Failed to create fund" }, { status: 500 });
    }
}