import type { Metadata } from "next";
import { Outfit, DM_Sans, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-body" });
const ibmPlex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-label" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "MedAI - Medical Report Automation",
  description: "Medical Report Processing & Summary Automation System",
};

import { ThemeProvider } from '@/components/common/ThemeProvider';
import { ToastProvider } from '@/components/common/ToastProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", outfit.variable, dmSans.variable, ibmPlex.variable)} suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Metropolis:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className={cn(outfit.className, "bg-mesh min-h-screen")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
