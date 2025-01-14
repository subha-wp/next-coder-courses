import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "nextcoder - Admin",
  description: "Manage Courses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
