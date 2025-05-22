import type { Metadata } from "next";
import '@/app/globals.css';
import { Poppins } from 'next/font/google';
import Header from "@/components/header";
import Footer from "@/components/footer";

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
        className={`${fontPoppins.variable} antialiased text-[#353935]`}
      >
        <Header/>
        <main className="pt-[77px]">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
