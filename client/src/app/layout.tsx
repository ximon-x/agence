import { Toaster } from "@/components/ui/toaster";
import configs from "@/lib/configs";
import { ChainProvider } from "@/lib/hooks/providers/chain-provider";
import { NearProvider } from "@/lib/hooks/providers/near-provider";
import { ThemeProvider } from "@/lib/hooks/providers/theme-provider";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

export const metadata: Metadata = {
  title: "Agence",
  description: "Where Agencies meet their next Ace.",
};

const geistSans = localFont({
  src: "../lib/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../lib/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ChainProvider>
            <NearProvider network={configs.network}>{children}</NearProvider>
          </ChainProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
