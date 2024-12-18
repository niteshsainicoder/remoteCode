
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./Component/nav";
import { AppWrapper } from "@/Context/context";
import { ThemeWrapper } from "@/Context/themecontext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeRun",
  description: "platform where you can run code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`  ${inter.className} remove-scrollbar    `}>

        <AppWrapper>
          <ThemeWrapper>
           <div className="w-full min-h-screen select-none caret-inherit  flex flex-col"> 
            <Nav />
            {children}

            </div>
          </ThemeWrapper>
        </AppWrapper></body>
    </html>
  );
}
