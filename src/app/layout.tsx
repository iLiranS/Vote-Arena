import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
// import Sidebar from "@/components/Sidebar/Sidebar";
import { Outfit } from 'next/font/google'
import { ThemeProvider } from "next-themes";
import Footer from "@/components/Footer/Footer";
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'


const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Vote Arena - Home",
  description: "Free Platform to Create,Explore and Share Polls, Tournaments and Tier lists!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={`antialiased w-screen min-h-[100dvh]  ${outfit.className}  justify-between flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >


          <Header />

          <div className="flex mt-12 w-full h-full relative overflow-visible">
            {/* <Sidebar /> */}
            <main className="relative w-full h-full overflow-scroll ">
              {children}
            </main>
          </div>

          <Footer />

        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
