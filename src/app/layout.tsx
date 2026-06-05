import Preloader from "@/components/Preloader";
import ThreeScene from "@/components/ThreeScene";
import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "StitchMark - AI-Powered Flood Detection & Geospatial Intelligence",
  description: "StitchMark delivers near-real-time, pixel-level flood detection for disaster response using foundation models and evidential deep learning.",
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
          <Preloader />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
