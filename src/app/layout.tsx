import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full bg-slate-300 h-16 flex justify-evenly items-center " >
          <div className="w-6/12 h-fit text-center  ">
            <p className="font-extrabold antialiased text-xl shadow-slate-500 ">
              <span className="text-3xl font-extrabold">
                &#8475;
              </span>
              emote
              <span className="text-2xl font-extrabold">
                &#264;
              </span>
              ode
            </p>
          </div>
          <div className="w-6/12 h-fit  text-right flex justify-evenly gap-7 ">
            <p>Signup</p>
            <p> login</p>
          </div>
        </div>
        {children}</body>
    </html>
  );
}