import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import StatusBar from '@/components/layout/StatusBar';

export const metadata: Metadata = {
  title: 'HyperScaleAWC — Implementation Automation Platform',
  description: 'Autonomous Work Completion for CX1 Implementations',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-hs-bg text-hs-text antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 ml-64 flex flex-col min-h-screen overflow-x-hidden">
            <Header />
            <main className="flex-1 overflow-auto">
              {children}
            </main>
            <StatusBar />
          </div>
        </div>
      </body>
    </html>
  );
}
