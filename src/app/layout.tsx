import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster";
import { SettingsProvider } from '@/contexts/SettingsContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI-Enhanced FarMart',
  description: 'AI-Enhanced agricultural platform for farmers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Noto+Sans+Bengali:wght@100..900&family=Noto+Sans+Devanagari:wght@100..900&family=Noto+Sans+Gujarati:wght@100..900&family=Noto+Sans+Gurmukhi:wght@100..900&family=Noto+Sans+Kannada:wght@100..900&family=Noto+Sans+Malayalam:wght@100..900&family=Noto+Sans+Oriya:wght@100..900&family=Noto+Sans+Tamil:wght@100..900&family=Noto+Sans+Telugu:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <SettingsProvider>
          {children}
          <Toaster />
        </SettingsProvider>
      </body>
    </html>
  );
}
