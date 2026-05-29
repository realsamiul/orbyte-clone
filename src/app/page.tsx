"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Custom cursor movement listener with touch fallback
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    setIsTouchDevice(!finePointer);

    if (!finePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer") ||
        target.id === "logo"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // GSAP scroll trigger choreography with robust lifecycle cleanups
  useEffect(() => {
    const ctx = gsap.context(() => {
      const revealContainers = gsap.utils.toArray<HTMLElement>(".reveal-container");
      
      revealContainers.forEach((container) => {
        const textElements = container.querySelectorAll(".reveal-text");
        
        gsap.fromTo(
          textElements,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            stagger: 0.12,
            ease: "power4.out", // Upgrade to ultra-premium Fast-Out deceleration curve
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Liquid Radial Button Hover Tracking: Calculates entry vector and translates the background expand bubble
  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--x", `${x}px`);
    e.currentTarget.style.setProperty("--y", `${y}px`);
  };

  return (
    <div ref={containerRef} className="scroll-container">
      {/* Custom Premium Hover Cursor */}
      {!isTouchDevice && (
        <>
          <div
            className="custom-cursor"
            style={{ 
              left: `${mousePos.x}px`, 
              top: `${mousePos.y}px`,
              width: isHovered ? "14px" : "8px",
              height: isHovered ? "14px" : "8px",
            }}
          />
          <div
            className="custom-cursor-ring"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
              width: isHovered ? "60px" : "40px",
              height: isHovered ? "60px" : "40px",
              borderColor: isHovered ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.4)",
              backgroundColor: isHovered ? "rgba(255, 255, 255, 0.05)" : "transparent"
            }}
          />
        </>
      )}

      {/* SECTION 1: HERO */}
      <div className="animated-main">
        <main className="relative w-full px-5 md:px-10 py-4 md:py-9 text-white z-10">
          <div className="flex flex-col overflow-hidden">
            <h2 className="text-xs md:text-base font-bold tracking-widest uppercase intro-reveal opacity-0 mb-3 md:mb-7">MAIN</h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-black leading-none intro-reveal opacity-0">
              WE CREATE<br />DIGITAL EXPERIENCES.
            </h1>
          </div>
        </main>
      </div>

      {/* SECTION 2: SCROLL TO EXPLORE */}
      <div className="animated-step">
        <section className="relative h-[100svh] w-full text-white z-10">
          <div className="absolute bottom-9 left-1/2 -translate-x-1/2 transform text-center flex flex-col items-center">
            <div className="arrow mb-4 animate-bounce">
              <Image src="/icons/arrow.svg" alt="ArrowDown" width={24} height={24} className="invert" />
            </div>
            <p className="text-xs md:text-sm tracking-[0.2em] opacity-80 uppercase font-bold">SCROLL TO EXPLORE</p>
          </div>
        </section>
      </div>

      {/* SECTION 3: ABOUT US */}
      <div className="animated-text about">
        <section className="relative h-[100svh] w-full text-white z-10 reveal-container">
          <div className="absolute top-18 md:top-33 left-5 right-5 md:left-10 md:right-10">
            <h3 className="text-xs md:text-base mb-3 md:mb-7 reveal-text font-bold">ABOUT US</h3>
            <h2 className="text-2xl md:text-4xl 2xl:text-5xl reveal-text font-black leading-tight">
              SOFTWARE DESIGN<br />&amp; DEVELOPMENT STUDIO.
            </h2>
            
            {/* Editorial Circle Toggle Buttons */}
            <div className="hidden md:flex w-fit justify-start gap-4 mt-6 arrowRounded reveal-text">
              <button
                onMouseMove={handleButtonMouseMove}
                type="button"
                className="radial-button uppercase"
                style={{
                  width: "52px",
                  "--initial-bg": "transparent",
                  "--text-color": "#fff",
                  "--hover-bg": "#fff",
                  "--hover-text-color": "#000",
                  "--border-color": "#fff",
                  "--hover-border-color": "#fff",
                  "--button-width": "0px",
                  "--button-height": "0px",
                } as React.CSSProperties}
              >
                <span className="button-content">
                  <span className="button-icon">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M752.145 0c8.685 0 17.572 3.434 24.237 10.099 13.33 13.33 13.33 35.143 0 48.473L320.126 515.03l449.591 449.591c13.33 13.33 13.33 35.144 0 48.474-13.33 13.33-35.142 13.33-48.472 0L247.418 539.268c-13.33-13.33-13.33-35.144 0-48.474L727.91 10.1C734.575 3.435 743.46.002 752.146.002z"></path>
                    </svg>
                  </span>
                </span>
              </button>
              <button
                onMouseMove={handleButtonMouseMove}
                type="button"
                className="radial-button uppercase"
                style={{
                  width: "52px",
                  "--initial-bg": "transparent",
                  "--text-color": "#fff",
                  "--hover-bg": "#fff",
                  "--hover-text-color": "#000",
                  "--border-color": "#fff",
                  "--hover-border-color": "#fff",
                  "--button-width": "0px",
                  "--button-height": "0px",
                } as React.CSSProperties}
              >
                <span className="button-content">
                  <span className="button-icon">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M271.653 1023.192c-8.685 0-17.573-3.432-24.238-10.097-13.33-13.33-13.33-35.144 0-48.474L703.67 508.163 254.08 58.573c-13.33-13.331-13.33-35.145 0-48.475 13.33-13.33 35.143-13.33 48.473 0L776.38 483.925c13.33 13.33 13.33 35.143 0 48.473l-480.492 480.694c-6.665 6.665-15.551 10.099-24.236 10.099z"></path>
                    </svg>
                  </span>
                </span>
              </button>
            </div>
          </div>

          <div className="absolute bottom-5 md:bottom-9 left-5 right-5 md:left-auto pr-5 md:pr-10 w-auto md:w-1/2 text-white text-xs md:text-sm 2xl:text-base leading-relaxed reveal-text font-medium">
            ORBYTE is a software design and development studio focused on
            building high-impact digital products and scalable systems. We
            approach design as a dynamic system, which evolves alongside the
            product, the business, and its users.<br /><br />We specialize in
            helping organizations grow with robust digital solutions tailored to
            current needs and with a long-term vision. Our focus is on creating
            user experiences that scale and perform over time.
          </div>

          <div className="absolute bottom-9 left-10 w-1/3 hidden md:block text-white reveal-text">
            <p className="text-base font-bold">Founded in<br />Buenos Aires, Argentina.</p>
          </div>

          <div className="absolute top-33 right-10 w-1/3 hidden md:block text-white text-right reveal-text">
            <p className="text-base font-bold">
              <a
                href="https://www.awwwards.com/sites/orbyte-studio"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                Honorable Mention<br />AWWWARDS.
              </a>
            </p>
          </div>
        </section>
      </div>

      {/* SECTION 4: CLICK TO VIEW PORTFOLIO */}
      <div className="animated-step awwwards">
        <section className="relative h-[100svh] w-full text-white z-10">
          <div className="absolute bottom-[56%] md:bottom-[60%] left-1/2 -translate-x-1/2 transform text-center flex flex-col items-center">
            <p className="text-xs md:text-sm tracking-[0.2em] font-bold opacity-80 block md:hidden xl:block hide-when-short mb-4">
              CLICK TO VIEW PORTFOLIO
            </p>
            <div className="arrow">
              <Image src="/icons/arrow.svg" alt="ArrowDown" width={32} height={32} className="invert" />
            </div>
          </div>
          <div className="absolute top-[56%] md:top-[60%] left-1/2 transform -translate-x-1/2 text-center flex flex-col items-center">
            <div className="arrow rotate-180">
              <Image src="/icons/arrow.svg" alt="ArrowUp" width={32} height={32} className="invert" />
            </div>
          </div>
        </section>
      </div>

      <div className="services-start" />

      {/* SECTION 5: SERVICES 1 - HIGH-IMPACT UX */}
      <div className="animated-text">
        <section className="relative h-[100svh] w-full text-white z-10 reveal-container">
          <div className="absolute overflow-hidden top-18 bottom-auto md:top-auto left-5 right-5 md:left-10 md:right-10 w-auto md:w-1/2 md:bottom-9">
            <h3 className="text-xs md:text-base mb-3 md:mb-7 reveal-text font-bold">SERVICES</h3>
            <h2 className="text-2xl md:text-4xl 2xl:text-5xl reveal-text font-black leading-tight">
              HIGH-IMPACT<br />USER EXPERIENCES.
            </h2>
          </div>

          <div className="absolute bottom-5 md:bottom-9 left-5 right-5 md:left-auto md:right-10 w-auto md:w-1/3 text-white text-xs md:text-sm 2xl:text-base reveal-text font-medium leading-relaxed">
            <div className="flex gap-2 md:gap-4 items-end justify-between mb-4">
              <div className="flex w-23 md:w-30 justify-start gap-2 md:gap-4 arrowRounded">
                <button
                  onMouseMove={handleButtonMouseMove}
                  type="button"
                  className="radial-button uppercase"
                  style={{
                    width: "100%",
                    "--initial-bg": "transparent",
                    "--text-color": "#fff",
                    "--hover-bg": "#fff",
                    "--hover-text-color": "#000",
                    "--border-color": "#fff",
                    "--hover-border-color": "#fff",
                    "--button-width": "0px",
                    "--button-height": "0px",
                  } as React.CSSProperties}
                >
                  <span className="button-content">
                    <span className="button-icon">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M752.145 0c8.685 0 17.572 3.434 24.237 10.099 13.33 13.33 13.33 35.143 0 48.473L320.126 515.03l449.591 449.591c13.33 13.33 13.33 35.144 0 48.474-13.33 13.33-35.142 13.33-48.472 0L247.418 539.268c-13.33-13.33-13.33-35.144 0-48.474L727.91 10.1C734.575 3.435 743.46.002 752.146.002z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button
                  onMouseMove={handleButtonMouseMove}
                  type="button"
                  className="radial-button uppercase"
                  style={{
                    width: "100%",
                    "--initial-bg": "transparent",
                    "--text-color": "#fff",
                    "--hover-bg": "#fff",
                    "--hover-text-color": "#000",
                    "--border-color": "#fff",
                    "--hover-border-color": "#fff",
                    "--button-width": "0px",
                    "--button-height": "0px",
                  } as React.CSSProperties}
                >
                  <span className="button-content">
                    <span className="button-icon">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M271.653 1023.192c-8.685 0-17.573-3.432-24.238-10.097-13.33-13.33-13.33-35.144 0-48.474L703.67 508.163 254.08 58.573c-13.33-13.331-13.33-35.145 0-48.475 13.33-13.33 35.143-13.33 48.473 0L776.38 483.925c13.33 13.33 13.33 35.143 0 48.473l-480.492 480.694c-6.665 6.665-15.551 10.099-24.236 10.099z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
              
              {/* Hashtag elements */}
              <div className="flex max-h-6 overflow-hidden flex-wrap gap-2 md:gap-4 mb-1 opacity-50 uppercase text-xs md:text-sm font-bold tracking-widest">
                <span>#SaaS</span><span>#Web</span><span>#App</span><span>#UI/UX</span>
              </div>
            </div>
            
            <p>
              We design conversion-driven interfaces that seamlessly
              evolve with your brand. By blending visual storytelling with
              intuitive usability, we transform digital touchpoints into
              engaging journeys that capture and retain user attention.
            </p>
          </div>
        </section>
      </div>

      {/* SECTION 6: SERVICES 2 - IMMERSIVE 3D */}
      <div className="animated-text">
        <section className="relative h-[100svh] w-full text-white z-10 reveal-container">
          <div className="absolute overflow-hidden top-18 bottom-auto md:top-auto left-5 right-5 md:left-10 md:right-10 w-auto md:w-1/2 md:bottom-9">
            <h3 className="text-xs md:text-base mb-3 md:mb-7 reveal-text font-bold">SERVICES</h3>
            <h2 className="text-2xl md:text-4xl 2xl:text-5xl reveal-text font-black leading-tight">
              IMMERSIVE<br />3D ENVIRONMENTS.
            </h2>
          </div>

          <div className="absolute bottom-5 md:bottom-9 left-5 right-5 md:left-auto md:right-10 w-auto md:w-1/3 text-white text-xs md:text-sm 2xl:text-base reveal-text font-medium leading-relaxed">
            <div className="flex gap-2 md:gap-4 items-end justify-between mb-4">
              <div className="flex w-23 md:w-30 justify-start gap-2 md:gap-4 arrowRounded">
                <button
                  onMouseMove={handleButtonMouseMove}
                  type="button"
                  className="radial-button uppercase"
                  style={{
                    width: "100%",
                    "--initial-bg": "transparent",
                    "--text-color": "#fff",
                    "--hover-bg": "#fff",
                    "--hover-text-color": "#000",
                    "--border-color": "#fff",
                    "--hover-border-color": "#fff",
                    "--button-width": "0px",
                    "--button-height": "0px",
                  } as React.CSSProperties}
                >
                  <span className="button-content">
                    <span className="button-icon">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M752.145 0c8.685 0 17.572 3.434 24.237 10.099 13.33 13.33 13.33 35.143 0 48.473L320.126 515.03l449.591 449.591c13.33 13.33 13.33 35.144 0 48.474-13.33 13.33-35.142 13.33-48.472 0L247.418 539.268c-13.33-13.33-13.33-35.144 0-48.474L727.91 10.1C734.575 3.435 743.46.002 752.146.002z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button
                  onMouseMove={handleButtonMouseMove}
                  type="button"
                  className="radial-button uppercase"
                  style={{
                    width: "100%",
                    "--initial-bg": "transparent",
                    "--text-color": "#fff",
                    "--hover-bg": "#fff",
                    "--hover-text-color": "#000",
                    "--border-color": "#fff",
                    "--hover-border-color": "#fff",
                    "--button-width": "0px",
                    "--button-height": "0px",
                  } as React.CSSProperties}
                >
                  <span className="button-content">
                    <span className="button-icon">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M271.653 1023.192c-8.685 0-17.573-3.432-24.238-10.097-13.33-13.33-13.33-35.144 0-48.474L703.67 508.163 254.08 58.573c-13.33-13.331-13.33-35.145 0-48.475 13.33-13.33 35.143-13.33 48.473 0L776.38 483.925c13.33 13.33 13.33 35.143 0 48.473l-480.492 480.694c-6.665 6.665-15.551 10.099-24.236 10.099z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
              
              <div className="flex max-h-6 overflow-hidden flex-wrap gap-2 md:gap-4 mb-1 opacity-50 uppercase text-xs md:text-sm font-bold tracking-widest">
                <span>#Realtime</span><span>#WebGL</span><span>#Render</span>
              </div>
            </div>
            
            <p>
              We create highly detailed three-dimensional visuals. We
              use 3D as an expressive tool that can enhance an interface, tell a
              story, or transform an idea into an immersive visual environment.
            </p>
          </div>
        </section>
      </div>

      {/* SECTION 7: SERVICES 3 - INTELLIGENT SOFTWARE */}
      <div className="animated-text">
        <section className="relative h-[100svh] w-full text-white z-10 reveal-container">
          <div className="absolute overflow-hidden top-18 bottom-auto md:top-auto left-5 right-5 md:left-10 md:right-10 w-auto md:w-1/2 md:bottom-9">
            <h3 className="text-xs md:text-base mb-3 md:mb-7 reveal-text font-bold">SERVICES</h3>
            <h2 className="text-2xl md:text-4xl 2xl:text-5xl reveal-text font-black leading-tight">
              INTELLIGENT<br />SOFTWARE SOLUTIONS.
            </h2>
          </div>

          <div className="absolute bottom-5 md:bottom-9 left-5 right-5 md:left-auto md:right-10 w-auto md:w-1/3 text-white text-xs md:text-sm 2xl:text-base reveal-text font-medium leading-relaxed">
            <div className="flex gap-2 md:gap-4 items-end justify-between mb-4">
              <div className="flex w-23 md:w-30 justify-start gap-2 md:gap-4 arrowRounded">
                <button
                  onMouseMove={handleButtonMouseMove}
                  type="button"
                  className="radial-button uppercase"
                  style={{
                    width: "100%",
                    "--initial-bg": "transparent",
                    "--text-color": "#fff",
                    "--hover-bg": "#fff",
                    "--hover-text-color": "#000",
                    "--border-color": "#fff",
                    "--hover-border-color": "#fff",
                    "--button-width": "0px",
                    "--button-height": "0px",
                  } as React.CSSProperties}
                >
                  <span className="button-content">
                    <span className="button-icon">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M752.145 0c8.685 0 17.572 3.434 24.237 10.099 13.33 13.33 13.33 35.143 0 48.473L320.126 515.03l449.591 449.591c13.33 13.33 13.33 35.144 0 48.474-13.33 13.33-35.142 13.33-48.472 0L247.418 539.268c-13.33-13.33-13.33-35.144 0-48.474L727.91 10.1C734.575 3.435 743.46.002 752.146.002z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button
                  onMouseMove={handleButtonMouseMove}
                  type="button"
                  className="radial-button uppercase"
                  style={{
                    width: "100%",
                    "--initial-bg": "transparent",
                    "--text-color": "#fff",
                    "--hover-bg": "#fff",
                    "--hover-text-color": "#000",
                    "--border-color": "#fff",
                    "--hover-border-color": "#fff",
                    "--button-width": "0px",
                    "--button-height": "0px",
                  } as React.CSSProperties}
                >
                  <span className="button-content">
                    <span className="button-icon">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M271.653 1023.192c-8.685 0-17.573-3.432-24.238-10.097-13.33-13.33-13.33-35.144 0-48.474L703.67 508.163 254.08 58.573c-13.33-13.331-13.33-35.145 0-48.475 13.33-13.33 35.143-13.33 48.473 0L776.38 483.925c13.33 13.33 13.33 35.143 0 48.473l-480.492 480.694c-6.665 6.665-15.551 10.099-24.236 10.099z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
              
              <div className="flex max-h-6 overflow-hidden flex-wrap gap-2 md:gap-4 mb-1 opacity-50 uppercase text-xs md:text-sm font-bold tracking-widest">
                <span>#CRM</span><span>#API</span><span>#Data</span><span>#AI</span>
              </div>
            </div>
            
            <p>
              We engineer robust digital architectures, from custom
              internal systems to automated workflows. Every solution is built
              with a focus on logic, security, and long-term scalability to
              ensure your technology supports your business growth.
            </p>
          </div>
        </section>
      </div>

      {/* SECTION 8: EDITORIAL PHRASE */}
      <div className="animated-text">
        <section className="h-[100svh] w-full flex items-center justify-center text-white z-10 reveal-container">
          <div className="px-5 md:px-10 text-center">
            <h2 className="footerText reveal-text leading-tight">
              A DYNAMIC ENTITY, CREATED TO ADAPT, RESONATE, AND STAND OVER TIME WITH INTEGRITY.
            </h2>
          </div>
        </section>
      </div>

      {/* SECTION 9: SOCIAL FOOTER LINKS */}
      <div className="animated-main">
        <section className="text-xs md:text-base relative block md:flex justify-between items-center px-5 md:px-10 h-auto md:h-10 my-5 md:my-5 w-full z-10 gap-5 overflow-hidden reveal-container">
          <div className="flex gap-5 justify-center uppercase reveal-text font-bold">
            <a className="opacity-100 hover:opacity-50 duration-200" href="mailto:info@orbyte.studio">INFO@ORBYTE.STUDIO</a>
            <a className="opacity-100 hover:opacity-50 duration-200" href="https://www.instagram.com/orbyte.studio/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
            <a className="opacity-100 hover:opacity-50 duration-200" href="https://www.linkedin.com/company/orbyte-studio/" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
          </div>
          <div className="flex gap-5 mt-4 md:mt-0 justify-center text-center md:text-right reveal-text font-bold">
            <Link className="opacity-100 hover:opacity-50 duration-200 truncate" href="/privacy">PRIVACY POLICY</Link>
            <p className="truncate">ORBYTE STUDIO. ALL RIGHTS RESERVED.</p>
          </div>
        </section>
      </div>

      {/* SECTION 10: WHITE OVERLAPPING CONTACT FORM */}
      <div className="animated-form contact-section">
        <footer className="relative w-full z-10 pointer-events-auto bg-white rounded-t-3xl md:rounded-t-[3rem] text-[#090909] pb-10">
          <div className="h-full pb-5 pt-10 px-5 md:px-10 md:pb-10 md:pt-14 overflow-hidden reveal-container">
            
            <div className="block md:flex items-center gap-10">
              <div className="flex flex-col w-full md:w-1/2">
                <div className="overflow-hidden mb-3 md:mb-7">
                  <h3 className="text-xs md:text-base font-bold tracking-widest uppercase reveal-text text-black">CONTACT</h3>
                </div>
                <div className="overflow-hidden">
                  <h2 className="text-3xl md:text-4xl xl:text-5xl font-black uppercase reveal-text text-black leading-tight">SEND US YOUR QUERY.</h2>
                </div>
              </div>
              <div className="flex flex-col mt-5 md:mt-0 w-full md:w-1/2 text-xs md:text-sm xl:text-base leading-relaxed font-medium text-black">
                <div className="overflow-hidden">
                  <p className="reveal-text">If you are looking for a team to support you in the development of your project, don’t hesitate to contact us.</p>
                </div>
                <div className="overflow-hidden hidden md:flex mt-4">
                  <p className="reveal-text font-bold">We are available to carry out your project.</p>
                </div>
              </div>
            </div>

            <form className="block md:flex items-center justify-center gap-10 mt-10 md:mt-14" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col text-xs md:text-base w-full md:w-1/2 gap-4 md:gap-5 overflow-hidden">
                <input type="text" placeholder="Full Name" required className="inputData px-3 md:px-5 h-12 md:h-14 reveal-text" />
                <input type="email" placeholder="Email Address" required className="inputData px-3 md:px-5 h-12 md:h-14 reveal-text" />
                <input type="text" placeholder="Company Name" className="inputData px-3 md:px-5 h-12 md:h-14 reveal-text" />
              </div>
              <div className="flex flex-col text-xs md:text-base w-full md:w-1/2 pt-6 md:pt-0 gap-5 overflow-hidden">
                <textarea placeholder="Message" required className="inputData px-3 py-3 md:px-5 md:py-4 h-24 md:h-32 border border-black/20 rounded-2xl outline-none focus:border-black transition-colors resize-none reveal-text"></textarea>
                <div className="flex items-center uppercase justify-between mt-2 reveal-text">
                  <button 
                    onMouseMove={handleButtonMouseMove}
                    type="submit" 
                    className="radial-button uppercase font-bold text-sm px-8 py-3 cursor-pointer"
                    style={{
                      "--initial-bg": "#000",
                      "--text-color": "#fff",
                      "--hover-bg": "#fff",
                      "--hover-text-color": "#000",
                      "--border-color": "#000",
                      "--hover-border-color": "#000",
                    } as React.CSSProperties}
                  >
                    <span>SUBMIT</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
                    className="font-bold text-xs md:text-sm hover:opacity-50 transition-opacity text-black uppercase cursor-pointer"
                  >
                    BACK TO TOP
                  </button>
                </div>
              </div>
            </form>

          </div>
        </footer>
      </div>

    </div>
  );
}
