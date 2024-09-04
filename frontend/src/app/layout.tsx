import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getGlobalData } from "@/data/loaders";
import { Header } from "@/components/custom/Header";
import { Footer } from "@/components/custom/Footer";
import { getGlobalMetadata } from "@/data/loaders";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGlobalMetadata();
  const metadata = data.data[0];
  return {
    title: metadata?.title,
    description: metadata.description,
  };
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await getGlobalData();
  const { header } = globalData.data[0];
  const { footer } = globalData.data[0];
  return (
    <html lang="en">
      <body className="{inter.className}">
        <Header data={header} />
        <div>{children}</div>
        <Footer data={footer} />
      </body>
    </html>
  );
}
