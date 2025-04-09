import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_request: Request, { params }: { params: { cardId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const card = await prisma.card.findUniqueOrThrow({
            where: { id: params.cardId },
        });
        return NextResponse.json({ card });
    } catch (error) {
        console.error("GET /api/cards/:cardId error", error);
        return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }
}

export async function PUT(request: Request, { params }: { params: { cardId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const body = await request.json();
    try {
      const updatedCard = await prisma.card.update({
        where: { id: params.cardId },
        data: body,
      });
      return NextResponse.json({ updatedCard });
    } catch (error) {
      console.error("PUT /api/cards/:cardId error:", error);
      return NextResponse.json({ error: "Failed to update card" }, { status: 400 });
    }
  }

  export async function DELETE(request: Request, { params }: { params: { cardId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const deleteCard = await prisma.card.delete({
            where: { id: params.cardId },
        });
        return NextResponse.json({ deleteCard });
    } catch (error) {
        console.error("DELETE /api/cards/;cardId error:", error);
        return NextResponse.json({ error: "Failed to delete card" }, { status: 400 });
    }
  }