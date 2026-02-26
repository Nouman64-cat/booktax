import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import { ToastProvider } from '@/components/ui/Toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TaxKB Portal — Knowledge Base Ingestion',
  description:
    'Upload documents, generate embeddings, and manage your tax knowledge base with TaxKB Portal.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <ToastProvider>
          <div className="app-layout">
            <Sidebar />
            <div className="app-layout__content">{children}</div>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
