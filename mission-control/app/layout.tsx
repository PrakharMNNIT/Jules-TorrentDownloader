import type { Metadata } from "next";
import { Space_Grotesk, Noto_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700']
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: '--font-noto-sans',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: "Mission Control // Operation Ironclad",
  description: "Advanced Distributed System Architecture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(
        spaceGrotesk.variable,
        notoSans.variable,
        "bg-background-dark text-white font-display overflow-x-hidden antialiased selection:bg-primary selection:text-white"
      )}>
        {children}
      </body>
    </html>
  );
}
