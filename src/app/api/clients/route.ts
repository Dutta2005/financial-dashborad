import { NextResponse } from 'next/server';
import clientData from '@/data/mock/clients.json';

export async function GET() {
  try {
    return NextResponse.json({
      data: clientData,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch client data',
      },
      { status: 500 }
    );
  }
}