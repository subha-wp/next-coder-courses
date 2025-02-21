/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { Toaster } from "sonner";
import { GoogleAnalytics } from "@next/third-parties/google";
import { headers } from "next/headers";
import { Suspense } from "react";
import { FacebookPixelEvents } from "../components/pixel-events";
import { ThemeProvider } from "@/providers/theme-provider";

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
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAdminRoute = pathname.startsWith("/admin-dashboard");
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {!isAdminRoute && (
            <>
              <GoogleAnalytics gaId="G-RTZBFNTLVT" />
              <Suspense fallback={null}>
                <FacebookPixelEvents />
              </Suspense>
            </>
          )}
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
