import type { Metadata } from "next";
import "@/app/globals.css";
import '@/app/admin.css';
import 'react-quill-new/dist/quill.snow.css';
import { Poppins } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";

// components
import AdminContainer from "@/components/admin/admin-container";

const fontPoppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: "Blogbook Admin",
  description: "Manage your blogs.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="admin">
      <body
        className={`${fontPoppins.variable} antialiased bg-white`}
      >
        <AdminContainer>
          {children}
        </AdminContainer>
        <Toaster/>
        <div id="modal-root" />
      </body>
    </html>
  );
}
