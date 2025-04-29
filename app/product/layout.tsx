import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Product | AlphaCap",
  description: "Comprehensive suite of tools designed to streamline private equity operations and enhance decision-making.",
  keywords: ["private equity", "portfolio management", "spend analytics", "risk management", "compliance"],
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 