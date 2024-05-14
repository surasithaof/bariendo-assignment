import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import NextAuthProvider from "@/lib/context/NextAuthProvider";
import { getServerSession } from "next-auth";
import { Toaster } from "@/components/ui/toaster";
import { authOptions } from "@/lib/auth/authOptions";
import NextTopLoader from "nextjs-toploader";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Bariendo assignment",
  description: "Bariendo assignment project, to create a doctor's appointment.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <NextAuthProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader
              color="#E11D48"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={false}
              easing="ease-in"
              speed={200}
              shadow="0 0 10px #E11D48,0 0 5px #E11D48"
            />
            {children}
          </ThemeProvider>
        </NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
