import type { Metadata } from "next";
import "@/app/globals.css";
import '@/app/admin.css';
import { Poppins } from 'next/font/google';

// components
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin-sidebar";

const fontPoppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: "Blogbook Admin",
  description: "Manage your blogs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="admin">
      <body
        className={`${fontPoppins.variable} antialiased bg-white`}
      >
        <SidebarProvider>
          <aside>
            <AdminSidebar/>
          </aside>
          <main>
            <SidebarTrigger/>
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
