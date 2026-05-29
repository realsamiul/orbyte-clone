"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [soundEnabled, setSoundEnabled] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full h-8 md:h-13 my-5 gap-5 md:my-10 px-5 md:px-10 flex justify-between transition-opacity duration-500 opacity-100">
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
        <div className="text-xs md:text-base nb">
          <div className="relative inline-block text-left">
            <button className="cursor-pointer h-8 md:h-auto flex items-center language uppercase font-bold">
              EN
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="transition-transform duration-200 ml-1"
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
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="text-xs md:text-base hidden h-full md:h-auto items-center -translate-x-1 nb sm:flex uppercase font-bold"
        >
          {soundEnabled ? "SOUND ON" : "SOUND OFF"}
        </button>
      </div>

      <nav>
        <ul className="flex items-center pl-2 justify-end gap-4 md:gap-10">
          <li className="text-xs md:text-base h-8 md:h-13 flex items-center">
            <button className="cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis opacity-100 h-full md:h-auto hover:opacity-50 nb duration-200 font-bold">
              ABOUT US
            </button>
          </li>
          <li className="text-xs md:text-base h-8 md:h-13 flex items-center">
            <button className="cursor-pointer opacity-100 h-full md:h-auto hover:opacity-50 nb duration-200 font-bold">
              SERVICES
            </button>
          </li>
          <div className="h-8 md:h-13 text-xs md:text-base flex items-center">
            <button
              type="button"
              className="radial-button uppercase font-bold px-4 py-2 text-xs md:text-sm"
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
