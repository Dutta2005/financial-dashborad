import { NextResponse } from 'next/server';
import misData from '@/data/mock/mis.json';

export async function GET() {
  try {
    return NextResponse.json({
      data: misData,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch MIS data',
      },
      { status: 500 }
    );
  }
}