import { NextResponse } from 'next/server';
import transactionData from '@/data/mock/transactions.json';

export async function GET() {
  try {
    return NextResponse.json({
      data: transactionData,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch transaction data',
      },
      { status: 500 }
    );
  }
}