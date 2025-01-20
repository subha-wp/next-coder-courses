import { Inter } from "next/font/google";
import { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider";
import { MobileNav } from "@/components/MobileNav";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "nextcoder - Transform Your Workforce with Enterprise Learning Solutions",
  description:
    "nextcoder offers world-class corporate training and development solutions. Empower your organization with our expert-led online courses and personalized learning experiences.",
  keywords:
    "corporate training, enterprise learning, professional development, online courses, workforce transformation",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nextcoder.co.in",
    siteName: "nextcoder",
    images: [
      {
        url: "https://nextcoder.co.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "nextcoder - Enterprise Learning Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@nextcoder",
    creator: "@nextcoder",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/auth/login");
  }
  return (
    <div
      className={`${inter.className} min-h-screen bg-background text-foreground`}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <main>{children}</main>
        <MobileNav />
      </ThemeProvider>
    </div>
  );
}
