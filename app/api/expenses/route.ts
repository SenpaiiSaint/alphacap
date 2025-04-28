import { NextResponse } from 'next/server';
import { ExpenseSchema } from '../../services/businessLogic';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const expenses = await prisma.expense.findMany({
      include: {
        fund: true,
      },
    });

    // Transform the data to match our schema
    const transformedExpenses = expenses.map(expense => ({
      id: expense.id,
      fundId: expense.fundId,
      amount: Number(expense.amount),
      category: expense.category,
      description: expense.description,
      status: expense.status,
      date: new Date(expense.date),
      attachments: expense.attachments || [],
    }));

    // Validate the data
    const validatedExpenses = transformedExpenses.map(expense => ExpenseSchema.parse(expense));

    return NextResponse.json(validatedExpenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch expenses' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = ExpenseSchema.parse(body);

    const expense = await prisma.expense.create({
      data: {
        fundId: validatedData.fundId,
        amount: validatedData.amount,
        category: validatedData.category,
        description: validatedData.description,
        status: validatedData.status,
        date: validatedData.date,
        attachments: validatedData.attachments,
      },
    });

    return NextResponse.json(expense);
  } catch (error) {
    console.error('Error creating expense:', error);
    return NextResponse.json(
      { error: 'Failed to create expense' },
      { status: 500 }
    );
  }
} 