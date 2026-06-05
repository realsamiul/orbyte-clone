"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scroll while loading
    document.body.style.overflow = "hidden";

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 10) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // Fade out preloader
        gsap.to(".preloader-overlay", {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            (document.querySelector(".preloader-overlay") as HTMLElement).style.display = "none";
            document.body.style.overflow = "auto";
            
            // Trigger the intro animation for the main text
            gsap.fromTo(
              ".intro-reveal",
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: "power3.out" }
            );
          }
        });
      }
      setProgress(currentProgress);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="preloader-overlay fixed top-0 left-0 w-[100vw] h-[100svh] bg-[#090909] text-white flex justify-center items-center z-[9999] tracking-[0.1em] opacity-100">
      <div className="grid place-items-center grid-rows-[1fr_auto_1fr] h-[56svh] w-[56svh] relative z-10 text-center">
        <div className="text-[0.75rem] opacity-50 leading-[1.2]">{progress}</div>
        <div className="flex flex-col items-center gap-4">
          <img src="/logo/logo.svg" alt="Logo" className="h-[52px]" />
          <h1 className="text-sm md:text-base font-bold tracking-widest uppercase">STITCHMARK</h1>
        </div>
        <div className="text-[0.75rem] opacity-50 leading-[1.2]">{progress}</div>
      </div>
    </div>
  );
}
