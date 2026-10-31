import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth/auth-context';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ERGO — Career Intelligence by Zaprill',
  description:
    'Understand your market value, discover suitable jobs, analyse your resume, identify skill gaps, and make smarter career decisions with ERGO.',
  icons: {
    icon: '/ergo-logo.svg',
    shortcut: '/ergo-logo.svg',
    apple: '/ergo-logo-clean.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F8F9FD] text-[#12131A] font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
