import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Actua",
  description: " Spending Tool for Private Equity Firms",
  icons: {
    icon: '/file.ico'
  }
};

export default function RootLayout({ children}: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}