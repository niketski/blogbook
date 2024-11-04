import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google';

const fontPoppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: "Blogbook",
  description: "Share something interesting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontPoppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
