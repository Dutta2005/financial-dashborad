import { NextRequest, NextResponse } from 'next/server';
import jsPDF from 'jspdf';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { dashboardData, type = 'data' } = body;

    if (type === 'data') {
      // Generate PDF from data
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      let currentY = margin;

      // Add header
      pdf.setFontSize(24);
      pdf.setTextColor(220, 38, 38);
      pdf.text('Financial Dashboard Report', margin, currentY);
      currentY += 15;

      // Add date
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      const currentDate = new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      pdf.text(`Generated on: ${currentDate}`, margin, currentY);
      currentY += 20;

      // Add AUM data
      if (dashboardData.aum) {
        pdf.setFontSize(16);
        pdf.setTextColor(0, 0, 0);
        pdf.text('AUM (Assets Under Management)', margin, currentY);
        currentY += 10;

        pdf.setFontSize(12);
        pdf.text(`Current Value: ${dashboardData.aum.current.toLocaleString()} ${dashboardData.aum.unit}`, margin, currentY);
        currentY += 8;
        pdf.text(`Month-over-Month Change: ${dashboardData.aum.momChange}%`, margin, currentY);
        currentY += 8;
        pdf.text(`Trend: ${dashboardData.aum.trend}`, margin, currentY);
        currentY += 15;
      }

      // Add SIP data
      if (dashboardData.sip) {
        pdf.setFontSize(16);
        pdf.setTextColor(0, 0, 0);
        pdf.text('SIP (Systematic Investment Plan)', margin, currentY);
        currentY += 10;

        pdf.setFontSize(12);
        pdf.text(`Current Value: ${dashboardData.sip.current.toLocaleString()} ${dashboardData.sip.unit}`, margin, currentY);
        currentY += 8;
        pdf.text(`Month-over-Month Change: ${dashboardData.sip.momChange}%`, margin, currentY);
        currentY += 8;
        pdf.text(`Trend: ${dashboardData.sip.trend}`, margin, currentY);
        currentY += 15;
      }

      // Add transaction stats
      if (dashboardData.transactions) {
        pdf.setFontSize(16);
        pdf.setTextColor(0, 0, 0);
        pdf.text('Transaction Statistics', margin, currentY);
        currentY += 10;

        const transactions = dashboardData.transactions;
        pdf.setFontSize(12);
        pdf.text(`Purchases: ${transactions.purchases.count} (${transactions.purchases.amount} INR)`, margin, currentY);
        currentY += 8;
        pdf.text(`Redemptions: ${transactions.redemptions.count} (${transactions.redemptions.amount} INR)`, margin, currentY);
        currentY += 8;
        pdf.text(`Rejected Transactions: ${transactions.rejectedTransactions.count} (${transactions.rejectedTransactions.amount} INR)`, margin, currentY);
        currentY += 8;
        pdf.text(`SIP Rejections: ${transactions.sipRejections.count} (${transactions.sipRejections.amount} INR)`, margin, currentY);
        currentY += 8;
        pdf.text(`New SIP: ${transactions.newSip.count} (${transactions.newSip.amount} INR)`, margin, currentY);
        currentY += 15;
      }

      // Add client data
      if (dashboardData.clients) {
        pdf.setFontSize(16);
        pdf.setTextColor(0, 0, 0);
        pdf.text('Client Distribution', margin, currentY);
        currentY += 10;

        const clients = dashboardData.clients;
        pdf.setFontSize(12);
        pdf.text(`Online: ${clients.online}`, margin, currentY);
        currentY += 8;
        pdf.text(`New: ${clients.new}`, margin, currentY);
        currentY += 8;
        pdf.text(`Active: ${clients.active}`, margin, currentY);
        currentY += 8;
        pdf.text(`Inactive: ${clients.inactive}`, margin, currentY);
        currentY += 8;
        pdf.text(`Total: ${clients.total}`, margin, currentY);
      }

      // Generate PDF buffer
      const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));

      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="financial-dashboard-${new Date().toISOString().split('T')[0]}.pdf"`,
        },
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid PDF type' },
      { status: 400 }
    );
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}