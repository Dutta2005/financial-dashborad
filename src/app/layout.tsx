import type { Metadata } from 'next';
import './globals.css';
import './pdf-safe.css';
import Header from '@/components/layout/Header';
import Navigation from '@/components/dashboard/Navigation';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

export const metadata: Metadata = {
  title: 'Financial Dashboard',
  description: 'A comprehensive financial dashboard for wealth management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <ErrorBoundary>
          <div className="flex flex-col min-h-screen">
            <Header />
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}