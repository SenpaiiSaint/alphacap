import { NextResponse } from 'next/server';
import { CardSchema } from '../../services/businessLogic';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const cards = await prisma.card.findMany({
      include: {
        fund: true,
        transactions: true,
      },
    });

    // Transform the data to match our schema
    const transformedCards = cards.map(card => ({
      id: card.id,
      fundId: card.fundId,
      cardNumber: card.cardNumber,
      cardHolder: card.cardHolder,
      limit: Number(card.limit),
      balance: Number(card.balance),
      status: card.status,
      type: card.type,
      createdAt: new Date(card.createdAt),
      updatedAt: new Date(card.updatedAt),
    }));

    // Validate the data
    const validatedCards = transformedCards.map(card => CardSchema.parse(card));

    return NextResponse.json(validatedCards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cards' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = CardSchema.parse(body);

    const card = await prisma.card.create({
      data: {
        fundId: validatedData.fundId,
        cardNumber: validatedData.cardNumber,
        cardHolder: validatedData.cardHolder,
        limit: validatedData.limit,
        balance: validatedData.balance,
        status: validatedData.status,
        type: validatedData.type,
      },
    });

    return NextResponse.json(card);
  } catch (error) {
    console.error('Error creating card:', error);
    return NextResponse.json(
      { error: 'Failed to create card' },
      { status: 500 }
    );
  }
} 