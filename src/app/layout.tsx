import ThreeScene from "@/components/ThreeScene";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "ORBYTE - Software Design & Development Studio",
  description: "ORBYTE is an independent software design and development studio focused on building scalable digital systems and high-impact web platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-white selection:text-black">
        <ThreeScene />
          <SmoothScroll>
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
