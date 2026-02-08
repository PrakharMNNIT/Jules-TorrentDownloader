import { TopBar } from "@/components/Nav/TopBar";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import type { Metadata } from "next";
import { Fira_Code, Fira_Sans } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: '--font-fira-code',
});

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fira-sans',
});

export const metadata: Metadata = {
  title: "Velocity Kanban",
  description: "Local-first motorsport-inspired productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(firaCode.variable, firaSans.variable, "antialiased bg-vk-bg text-vk-text overflow-hidden")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TopBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
