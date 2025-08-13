import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AumData, SipData, TransactionStats, ClientData, SipBusinessData, MisData } from '@/types/dashboard';
import { formatCurrency, formatPercentage, formatNumber } from './utils';

interface DashboardData {
  aum: AumData | null;
  sip: SipData | null;
  transactions: TransactionStats | null;
  clients: ClientData | null;
  sipBusiness: SipBusinessData[] | null;
  mis: MisData[] | null;
}

export class PDFGenerator {
  private pdf: jsPDF;
  private pageWidth: number;
  private pageHeight: number;
  private margin: number;
  private currentY: number;

  constructor() {
    this.pdf = new jsPDF('p', 'mm', 'a4');
    this.pageWidth = this.pdf.internal.pageSize.getWidth();
    this.pageHeight = this.pdf.internal.pageSize.getHeight();
    this.margin = 20;
    this.currentY = this.margin;
  }

  private addHeader() {
    // Add logo/title
    this.pdf.setFontSize(24);
    this.pdf.setTextColor(220, 38, 38); // Red color
    this.pdf.text('Financial Dashboard', this.margin, this.currentY);
    
    this.currentY += 15;
    
    // Add date
    this.pdf.setFontSize(12);
    this.pdf.setTextColor(100, 100, 100);
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    this.pdf.text(`Generated on: ${currentDate}`, this.margin, this.currentY);
    
    this.currentY += 20;
  }

  private addMetricCards(data: DashboardData) {
    this.pdf.setFontSize(16);
    this.pdf.setTextColor(0, 0, 0);
    this.pdf.text('Key Metrics', this.margin, this.currentY);
    this.currentY += 10;

    // AUM Card
    if (data.aum) {
      this.addMetricCard('AUM', data.aum.current, data.aum.unit, data.aum.momChange, data.aum.trend);
    }

    // SIP Card
    if (data.sip) {
      this.addMetricCard('SIP', data.sip.current, data.sip.unit, data.sip.momChange, data.sip.trend);
    }

    this.currentY += 15;
  }

  private addMetricCard(title: string, value: number, unit: string, change: number, trend: 'up' | 'down') {
    const cardHeight = 25;
    const cardWidth = 80;
    
    // Draw card background
    this.pdf.setFillColor(249, 250, 251);
    this.pdf.rect(this.margin, this.currentY, cardWidth, cardHeight, 'F');
    
    // Draw border
    this.pdf.setDrawColor(229, 231, 235);
    this.pdf.rect(this.margin, this.currentY, cardWidth, cardHeight);
    
    // Add title
    this.pdf.setFontSize(10);
    this.pdf.setTextColor(107, 114, 128);
    this.pdf.text('Current', this.margin + 5, this.currentY + 8);
    
    // Add value
    this.pdf.setFontSize(14);
    this.pdf.setTextColor(0, 0, 0);
    const formattedValue = formatCurrency(value);
    this.pdf.text(`${title} ${formattedValue}`, this.margin + 5, this.currentY + 15);
    
    // Add change
    this.pdf.setFontSize(10);
    const changeColor = trend === 'up' ? [34, 197, 94] : [239, 68, 68];
    this.pdf.setTextColor(changeColor[0], changeColor[1], changeColor[2]);
    const changeText = `${trend === 'up' ? '↗' : '↘'} ${formatPercentage(change)} MoM`;
    this.pdf.text(changeText, this.margin + 5, this.currentY + 22);
    
    this.currentY += cardHeight + 5;
  }

  private addTransactionStats(data: DashboardData) {
    if (!data.transactions) return;

    this.pdf.setFontSize(16);
    this.pdf.setTextColor(0, 0, 0);
    this.pdf.text('Transaction Statistics', this.margin, this.currentY);
    this.currentY += 10;

    const stats = [
      { title: 'Purchases', count: data.transactions.purchases.count, amount: data.transactions.purchases.amount },
      { title: 'Redemptions', count: data.transactions.redemptions.count, amount: data.transactions.redemptions.amount },
      { title: 'Rejected Transactions', count: data.transactions.rejectedTransactions.count, amount: data.transactions.rejectedTransactions.amount },
      { title: 'SIP Rejections', count: data.transactions.sipRejections.count, amount: data.transactions.sipRejections.amount },
      { title: 'New SIP', count: data.transactions.newSip.count, amount: data.transactions.newSip.amount },
    ];

    stats.forEach((stat, index) => {
      const x = this.margin + (index % 3) * 60;
      const y = this.currentY + Math.floor(index / 3) * 20;
      
      this.pdf.setFontSize(12);
      this.pdf.setTextColor(0, 0, 0);
      this.pdf.text(formatNumber(stat.count), x, y);
      
      this.pdf.setFontSize(8);
      this.pdf.setTextColor(107, 114, 128);
      this.pdf.text(stat.title, x, y + 5);
      this.pdf.text(`${stat.amount.toFixed(2)} INR`, x, y + 10);
    });

    this.currentY += 50;
  }

  private addClientData(data: DashboardData) {
    if (!data.clients) return;

    this.pdf.setFontSize(16);
    this.pdf.setTextColor(0, 0, 0);
    this.pdf.text('Client Distribution', this.margin, this.currentY);
    this.currentY += 10;

    const clientStats = [
      { label: 'Online', value: data.clients.online, color: [245, 158, 11] },
      { label: 'New', value: data.clients.new, color: [16, 185, 129] },
      { label: 'Active', value: data.clients.active, color: [239, 68, 68] },
      { label: 'Inactive', value: data.clients.inactive, color: [107, 114, 128] },
    ];

    clientStats.forEach((stat, index) => {
      const x = this.margin + (index % 2) * 80;
      const y = this.currentY + Math.floor(index / 2) * 15;
      
      // Draw colored circle
      this.pdf.setFillColor(stat.color[0], stat.color[1], stat.color[2]);
      this.pdf.circle(x + 3, y - 2, 2, 'F');
      
      // Add text
      this.pdf.setFontSize(12);
      this.pdf.setTextColor(0, 0, 0);
      this.pdf.text(`${stat.label}: ${formatNumber(stat.value)}`, x + 8, y);
    });

    this.currentY += 40;
  }

  private addSipBusinessData(data: DashboardData) {
    if (!data.sipBusiness || data.sipBusiness.length === 0) return;

    this.pdf.setFontSize(16);
    this.pdf.setTextColor(0, 0, 0);
    this.pdf.text('SIP Business Data', this.margin, this.currentY);
    this.currentY += 10;

    // Create a simple table
    const tableData = data.sipBusiness.map(item => [
      item.month,
      item.barValue.toFixed(1),
      item.lineValue.toString()
    ]);

    this.addTable(['Month', 'Bar Value', 'Line Value'], tableData);
    this.currentY += 10;
  }

  private addTable(headers: string[], data: string[][]) {
    const colWidth = (this.pageWidth - 2 * this.margin) / headers.length;
    const rowHeight = 8;

    // Draw headers
    this.pdf.setFillColor(243, 244, 246);
    this.pdf.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, rowHeight, 'F');
    
    this.pdf.setFontSize(10);
    this.pdf.setTextColor(0, 0, 0);
    headers.forEach((header, index) => {
      this.pdf.text(header, this.margin + index * colWidth + 2, this.currentY + 5);
    });

    this.currentY += rowHeight;

    // Draw data rows
    data.forEach((row, rowIndex) => {
      if (rowIndex % 2 === 0) {
        this.pdf.setFillColor(249, 250, 251);
        this.pdf.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, rowHeight, 'F');
      }

      this.pdf.setFontSize(9);
      this.pdf.setTextColor(0, 0, 0);
      row.forEach((cell, cellIndex) => {
        this.pdf.text(cell, this.margin + cellIndex * colWidth + 2, this.currentY + 5);
      });

      this.currentY += rowHeight;
    });
  }

  private addFooter() {
    const footerY = this.pageHeight - 15;
    this.pdf.setFontSize(8);
    this.pdf.setTextColor(107, 114, 128);
    this.pdf.text('Generated by Financial Dashboard System', this.margin, footerY);
    
    const pageText = `Page 1 of 1`;
    const pageTextWidth = this.pdf.getTextWidth(pageText);
    this.pdf.text(pageText, this.pageWidth - this.margin - pageTextWidth, footerY);
  }

  public async generatePDF(data: DashboardData): Promise<void> {
    this.addHeader();
    this.addMetricCards(data);
    this.addTransactionStats(data);
    this.addClientData(data);
    this.addSipBusinessData(data);
    this.addFooter();

    // Save the PDF
    const fileName = `financial-dashboard-${new Date().toISOString().split('T')[0]}.pdf`;
    this.pdf.save(fileName);
  }

  public async generateFromHTML(elementId: string): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }

    try {
      // Create a temporary clone to fix color issues
      const clonedElement = element.cloneNode(true) as HTMLElement;
      clonedElement.style.position = 'absolute';
      clonedElement.style.left = '-9999px';
      clonedElement.style.top = '0';
      document.body.appendChild(clonedElement);

      // Fix any oklch colors by converting to hex
      this.fixColorIssues(clonedElement);

      const canvas = await html2canvas(clonedElement, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: clonedElement.scrollWidth,
        height: clonedElement.scrollHeight,
        logging: false,
        onclone: (clonedDoc) => {
          // Additional color fixes in the cloned document
          this.fixColorIssues(clonedDoc.body);
        },
      });

      // Remove the temporary clone
      document.body.removeChild(clonedElement);

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = this.pageWidth - 2 * this.margin;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add header
      this.addHeader();

      // Add the screenshot
      if (imgHeight > this.pageHeight - this.currentY - this.margin) {
        // If image is too tall, scale it down
        const scaledHeight = this.pageHeight - this.currentY - this.margin;
        const scaledWidth = (canvas.width * scaledHeight) / canvas.height;
        this.pdf.addImage(imgData, 'PNG', this.margin, this.currentY, scaledWidth, scaledHeight);
      } else {
        this.pdf.addImage(imgData, 'PNG', this.margin, this.currentY, imgWidth, imgHeight);
      }

      // Save the PDF
      const fileName = `financial-dashboard-screenshot-${new Date().toISOString().split('T')[0]}.pdf`;
      this.pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF from HTML:', error);
      throw error;
    }
  }

  private fixColorIssues(element: HTMLElement | Document): void {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_ELEMENT,
      null
    );

    const colorMap: { [key: string]: string } = {
      'oklch(0.6518 0.1875 27.4)': '#dc2626', // red-600
      'oklch(0.7206 0.1686 142.5)': '#16a34a', // green-600
      'oklch(0.8471 0.1987 83.87)': '#eab308', // yellow-500
      'oklch(0.7018 0.1619 231.6)': '#3b82f6', // blue-500
      'oklch(0.5756 0.2618 5.456)': '#ef4444', // red-500
      'oklch(0.7176 0.1686 142.5)': '#10b981', // emerald-500
      'oklch(0.5471 0.1370 264.5)': '#6b7280', // gray-500
    };

    let node: Node | null;
    while (node = walker.nextNode()) {
      const el = node as HTMLElement;
      if (el.style) {
        // Fix background colors
        if (el.style.backgroundColor && el.style.backgroundColor.includes('oklch')) {
          const replacement = colorMap[el.style.backgroundColor];
          if (replacement) {
            el.style.backgroundColor = replacement;
          } else {
            // Fallback to a safe color
            el.style.backgroundColor = '#ffffff';
          }
        }

        // Fix text colors
        if (el.style.color && el.style.color.includes('oklch')) {
          const replacement = colorMap[el.style.color];
          if (replacement) {
            el.style.color = replacement;
          } else {
            // Fallback to a safe color
            el.style.color = '#000000';
          }
        }

        // Fix border colors
        if (el.style.borderColor && el.style.borderColor.includes('oklch')) {
          const replacement = colorMap[el.style.borderColor];
          if (replacement) {
            el.style.borderColor = replacement;
          } else {
            // Fallback to a safe color
            el.style.borderColor = '#e5e7eb';
          }
        }
      }

      // Also check computed styles and classes
      if (el.classList) {
        const computedStyle = window.getComputedStyle(el);
        
        // Create inline styles from computed styles to override problematic classes
        if (computedStyle.backgroundColor && computedStyle.backgroundColor.includes('oklch')) {
          el.style.backgroundColor = '#ffffff';
        }
        if (computedStyle.color && computedStyle.color.includes('oklch')) {
          el.style.color = '#000000';
        }
        if (computedStyle.borderColor && computedStyle.borderColor.includes('oklch')) {
          el.style.borderColor = '#e5e7eb';
        }
      }
    }
  }
}