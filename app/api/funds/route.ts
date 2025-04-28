import { NextResponse } from 'next/server';
import { FundSchema } from '../../services/businessLogic';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const funds = await prisma.fund.findMany({
      include: {
        expenses: true,
        cards: true,
      },
    });

    // Transform the data to match our schema
    const transformedFunds = funds.map(fund => ({
      id: fund.id,
      name: fund.name,
      totalCapital: Number(fund.totalCapital),
      deployedCapital: Number(fund.deployedCapital),
      remainingCapital: Number(fund.remainingCapital),
      performance: Number(fund.performance),
      status: fund.status,
      createdAt: new Date(fund.createdAt),
      updatedAt: new Date(fund.updatedAt),
    }));

    // Validate the data
    const validatedFunds = transformedFunds.map(fund => FundSchema.parse(fund));

    return NextResponse.json(validatedFunds);
  } catch (error) {
    console.error('Error fetching funds:', error);
    return NextResponse.json(
      { error: 'Failed to fetch funds' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = FundSchema.parse(body);

    const fund = await prisma.fund.create({
      data: {
        name: validatedData.name,
        totalCapital: validatedData.totalCapital,
        deployedCapital: validatedData.deployedCapital,
        remainingCapital: validatedData.remainingCapital,
        performance: validatedData.performance,
        status: validatedData.status,
      },
    });

    return NextResponse.json(fund);
  } catch (error) {
    console.error('Error creating fund:', error);
    return NextResponse.json(
      { error: 'Failed to create fund' },
      { status: 500 }
    );
  }
} 