"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Instantiate actual ambient background audio matching the original site's sounds/ambient.mp3
    audioRef.current = new Audio("/sounds/ambient.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleSoundToggle = () => {
    if (!audioRef.current) return;

    if (soundEnabled) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        console.warn("Audio autoplay blocked by user interaction requirements.");
      });
    }
    setSoundEnabled(!soundEnabled);
  };

  const handleScrollToSection = (className: string) => {
    const el = document.querySelector(className);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full h-8 md:h-13 my-5 gap-5 md:my-10 px-5 md:px-10 flex justify-between items-center transition-opacity duration-500 opacity-100 mix-blend-difference pointer-events-auto">
      {/* LEFT: Logo & EN selector & Sound controller */}
      <div className="flex items-center text-xs md:text-base gap-4 md:gap-10">
        <Link href="/">
          <Image
            src="/logo/iso.svg"
            alt="Logo"
            width={40}
            height={40}
            className="h-8 w-auto md:h-13 cursor-pointer opacity-100 hover:opacity-50 duration-200"
            id="logo"
          />
        </Link>
        
        <div className="text-xs md:text-base font-bold">
          <div className="relative inline-block text-left">
            <button className="cursor-pointer h-8 md:h-auto flex items-center language uppercase font-bold text-white hover:opacity-50 duration-200">
              EN
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="transition-transform duration-200 ml-1 mt-0.5 rotate-180"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M128 320l128-128 128 128z"></path>
              </svg>
            </button>
          </div>
        </div>

        <button
          onClick={handleSoundToggle}
          className="text-xs md:text-base h-full md:h-auto flex items-center uppercase font-bold text-white hover:opacity-50 duration-200"
        >
          {soundEnabled ? "SOUND ON" : "SOUND OFF"}
        </button>
      </div>

      {/* RIGHT: Navigation */}
      <nav>
        <ul className="flex items-center pl-2 justify-end gap-4 md:gap-10 text-white font-bold">
          <li className="text-xs md:text-base h-8 md:h-13 flex items-center">
            <button 
              onClick={() => handleScrollToSection(".about")}
              className="cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis opacity-100 h-full md:h-auto hover:opacity-50 duration-200"
            >
              ABOUT US
            </button>
          </li>
          <li className="text-xs md:text-base h-8 md:h-13 flex items-center">
            <button 
              onClick={() => handleScrollToSection(".services-start")}
              className="cursor-pointer opacity-100 h-full md:h-auto hover:opacity-50 duration-200"
            >
              SERVICES
            </button>
          </li>
          <div className="h-8 md:h-13 text-xs md:text-base flex items-center">
            <button
              onClick={() => handleScrollToSection(".contact-section")}
              type="button"
              className="radial-button uppercase cursor-pointer"
              style={{
                "--initial-bg": "transparent",
                "--text-color": "#fff",
                "--hover-bg": "#fff",
                "--hover-text-color": "#000",
                "--border-color": "#fff",
                "--hover-border-color": "#fff",
                "--button-width": "0px",
                "--button-height": "0px"
              } as React.CSSProperties}
            >
              <span className="button-content">
                <span className="button-label">CONTACT</span>
              </span>
            </button>
          </div>
        </ul>
      </nav>
    </header>
  );
}
