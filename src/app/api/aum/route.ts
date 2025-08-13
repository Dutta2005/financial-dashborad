import { NextResponse } from 'next/server';
import aumData from '@/data/mock/aum.json';

export async function GET() {
  try {
    return NextResponse.json({
      data: aumData,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch AUM data',
      },
      { status: 500 }
    );
  }
}