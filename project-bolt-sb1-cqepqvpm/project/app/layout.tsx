import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import { LanguageProvider } from '@/components/language-provider';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Arthur For Space Sciences Ltd | Global Space Community',
  description:
    'A non-profit scientific institution and a global space community for enthusiasts. UK-registered Private Limited Company by Guarantee.',
  openGraph: {
    title: 'Arthur For Space Sciences Ltd',
    description:
      'A non-profit scientific institution and a global space community for enthusiasts.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arthur For Space Sciences Ltd',
    description:
      'A non-profit scientific institution and a global space community for enthusiasts.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} dark`}>
      <body className={`${inter.className} bg-space-black text-starlight antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
