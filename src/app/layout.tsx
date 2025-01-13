import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "LearnHub - Transform Your Workforce with Enterprise Learning Solutions",
  description:
    "LearnHub offers world-class corporate training and development solutions. Empower your organization with our expert-led online courses and personalized learning experiences.",
  keywords:
    "corporate training, enterprise learning, professional development, online courses, workforce transformation",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://learnhub.com",
    siteName: "LearnHub",
    images: [
      {
        url: "https://learnhub.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LearnHub - Enterprise Learning Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@learnhub",
    creator: "@learnhub",
  },
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
