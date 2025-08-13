import { NextResponse } from 'next/server';
import sipData from '@/data/mock/sip.json';

export async function GET() {
  try {
    return NextResponse.json({
      data: sipData,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch SIP data',
      },
      { status: 500 }
    );
  }
}