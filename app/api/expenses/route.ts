import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId: session.user.id },
    });
    return NextResponse.json({ expenses });
  } catch (error) {
    console.error("GET /api/expenses error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const body = await request.json();
  const { amount, vendor, category, cardId } = body;
  if (!amount || !vendor || !category || !cardId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  
  try {
    const expense = await prisma.expense.create({
      data: {
        amount,
        vendor,
        category,
        card: { connect: { id: cardId } },
        user: { connect: { id: session.user.id } },
      },
    });
    return NextResponse.json({ expense }, { status: 201 });
  } catch (error) {
    console.error("POST /api/expenses error:", error);
    return NextResponse.json({ error: "Failed to create expense" }, { status: 500 });
  }
}
