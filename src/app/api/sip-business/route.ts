import { NextResponse } from 'next/server';
import sipBusinessData from '@/data/mock/sip-business.json';

export async function GET() {
  try {
    return NextResponse.json({
      data: sipBusinessData,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch SIP business data',
      },
      { status: 500 }
    );
  }
}