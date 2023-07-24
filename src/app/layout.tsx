import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marwa`s Paraphraser",
  description:
    "This paraphpraser is built only for Marwa Karkhy. If you are not Marwa Karkhy, please leave this page immediately.",
  keywords: "paraphraser, paraphrase, marwa, karkhy, marwa karkhy, paraphrasing tool",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
