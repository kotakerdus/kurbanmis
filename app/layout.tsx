import NavBar from '@/components/nav-bar/nav-bar';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

import './globals.css';

export const metadata = {
  title: 'Kurban MIS 1447H',
  description: "Applikasi Kurban Masjid Imam Syafi'i",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className='flex h-screen flex-col-reverse sm:flex-row'>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
