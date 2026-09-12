import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Arthur For Space Sciences Ltd',
  description: 'A non-profit scientific organization and a global space community for enthusiasts.',
  keywords: 'space science, astrophysics, education, research, AFSS, Arthur For Space Sciences',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0a0a0a] text-white min-h-screen">
        <LanguageProvider>
          <div className="nebula-bg" />
          <div className="star-field" />
          <NavBar />
          <main className="relative z-10">
            {children}
          </main>
          <div className="relative z-10">
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
