"use client";

import React, { ReactNode } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { ScrollStore } from "./ScrollStore";

function ScrollTracker() {
  useLenis((lenis) => {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    if (maxScroll > 0) {
      ScrollStore.progress = lenis.scroll / maxScroll;
      ScrollStore.maxScroll = maxScroll;
    }
  });
  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <ScrollTracker />
      {children}
    </ReactLenis>
  );
}
