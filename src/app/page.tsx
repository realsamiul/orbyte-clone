"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
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

  // GSAP scroll trigger choreography
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
            ease: "power4.out",
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
            <h2 className="text-xs md:text-base font-bold tracking-widest uppercase intro-reveal opacity-0 mb-3 md:mb-7">AI-POWERED DISASTER RESPONSE</h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-black leading-none intro-reveal opacity-0">
              STITCHMARK
            </h1>
            <p className="text-sm md:text-base mt-4 md:mt-6 max-w-2xl intro-reveal opacity-0 font-medium">Real-time flood detection powered by geospatial AI</p>
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

      {/* SECTION 3: THE PROBLEM */}
      <div className="animated-text about">
        <section className="relative h-[100svh] w-full text-white z-10 reveal-container">
          <div className="absolute top-18 md:top-33 left-5 right-5 md:left-10 md:right-10">
            <h3 className="text-xs md:text-base mb-3 md:mb-7 reveal-text font-bold">THE CHALLENGE</h3>
            <h2 className="text-2xl md:text-4xl 2xl:text-5xl reveal-text font-black leading-tight">
              FLOODS DEMAND<br />INSTANT INTELLIGENCE.
            </h2>
            
          </div>

          <div className="absolute bottom-5 md:bottom-9 left-5 right-5 md:left-auto pr-5 md:pr-10 w-auto md:w-1/2 text-white text-xs md:text-sm 2xl:text-base leading-relaxed reveal-text font-medium">
            Bangladesh suffers catastrophic monsoon floods annually—displacing millions, destroying crops, and causing billions in damages. Existing systems rely on manual satellite interpretation, cloud-prone optical imagery, or delayed outputs. None provide near-real-time, pixel-level flood maps with quantified certainty.<br /><br />
            <strong>StitchMark changes this.</strong> An end-to-end automated pipeline delivering actionable flood intelligence within minutes of satellite overpass.
          </div>

          <div className="absolute bottom-9 left-10 w-1/3 hidden md:block text-white reveal-text">
            <p className="text-base font-bold">Powered by AI<br />Made for Good.</p>
          </div>
        </section>
      </div>

      {/* SECTION 4: SCROLL TRANSITION */}
      <div className="animated-step">
        <section className="relative h-[100svh] w-full text-white z-10">
          <div className="absolute bottom-[56%] md:bottom-[60%] left-1/2 -translate-x-1/2 transform text-center flex flex-col items-center">
            <p className="text-xs md:text-sm tracking-[0.2em] font-bold opacity-80 block md:hidden xl:block hide-when-short mb-4">
              SCROLL FOR TECHNICAL DEEP DIVE
            </p>
            <div className="arrow">
              <Image src="/icons/arrow.svg" alt="ArrowDown" width={32} height={32} className="invert" />
            </div>
          </div>
        </section>
      </div>

      <div className="services-start" />

      {/* SECTION 5: ARCHITECTURE */}
      <div className="animated-text" style={{ backgroundColor: "#0a0a0a" }}>
        <section className="relative h-[100svh] w-full text-white z-10 reveal-container bg-[#0a0a0a]">
          <div className="absolute overflow-hidden top-18 bottom-auto md:top-auto left-5 right-5 md:left-10 md:right-10 w-auto md:w-1/2 md:bottom-9">
            <h3 className="text-xs md:text-base mb-3 md:mb-7 reveal-text font-bold">ARCHITECTURE</h3>
            <h2 className="text-2xl md:text-4xl 2xl:text-5xl reveal-text font-black leading-tight">
              END-TO-END<br />AUTOMATED PIPELINE.
            </h2>
          </div>

          <div className="absolute bottom-5 md:bottom-9 left-5 right-5 md:left-auto md:right-10 w-auto md:w-1/3 text-white text-xs md:text-sm 2xl:text-base reveal-text font-medium leading-relaxed">
            <p>
              <strong>Ingests:</strong> Sentinel‑1 SAR + Sentinel‑2 optical via Google Earth Engine<br/>
              <strong>Segments:</strong> Floods at ≤10m resolution using fine-tuned Prithvi‑100M<br/>
              <strong>Quantifies:</strong> Prediction confidence via Evidential Deep Learning<br/>
              <strong>Delivers:</strong> Interactive maps to responders within minutes
            </p>
          </div>
        </section>
      </div>

      {/* SECTION 6: FOUNDATION MODELS */}
      <div className="animated-text" style={{ backgroundColor: "#ffffff" }}>
        <section className="relative h-[100svh] w-full text-[#090909] z-10 reveal-container bg-white">
          <div className="absolute overflow-hidden top-18 bottom-auto md:top-auto left-5 right-5 md:left-10 md:right-10 w-auto md:w-1/2 md:bottom-9">
            <h3 className="text-xs md:text-base mb-3 md:mb-7 reveal-text font-bold text-[#090909]">CORE TECHNOLOGY</h3>
            <h2 className="text-2xl md:text-4xl 2xl:text-5xl reveal-text font-black leading-tight text-[#090909]">
              GEOSPATIAL<br />FOUNDATION MODELS.
            </h2>
          </div>

          <div className="absolute bottom-5 md:bottom-9 left-5 right-5 md:left-auto md:right-10 w-auto md:w-1/3 text-[#090909] text-xs md:text-sm 2xl:text-base reveal-text font-medium leading-relaxed">
            <p>
              Fine-tuned <strong>Prithvi‑100M</strong> (NASA/IBM) pre-trained on global satellite data. Ingests Sentinel‑2 RGB, NIR, SWIR alongside SAR VV/VH ratios and topographic features. 10× less labeled data needed versus custom CNNs. Already proven on geospatial change detection tasks.
            </p>
          </div>
        </section>
      </div>

      {/* SECTION 7: UNCERTAINTY QUANTIFICATION */}
      <div className="animated-text" style={{ backgroundColor: "#0a0a0a" }}>
        <section className="relative h-[100svh] w-full text-white z-10 reveal-container bg-[#0a0a0a]">
          <div className="absolute overflow-hidden top-18 bottom-auto md:top-auto left-5 right-5 md:left-10 md:right-10 w-auto md:w-1/2 md:bottom-9">
            <h3 className="text-xs md:text-base mb-3 md:mb-7 reveal-text font-bold">CONFIDENCE SCORES</h3>
            <h2 className="text-2xl md:text-4xl 2xl:text-5xl reveal-text font-black leading-tight">
              EVIDENTIAL<br />DEEP LEARNING.
            </h2>
          </div>

          <div className="absolute bottom-5 md:bottom-9 left-5 right-5 md:left-auto md:right-10 w-auto md:w-1/3 text-white text-xs md:text-sm 2xl:text-base reveal-text font-medium leading-relaxed">
            <p>
              Standard softmax produces overconfident predictions in ambiguous regions (urban water vs. shadow). We deploy a <strong>Dirichlet distribution head</strong> that jointly predicts flood probability and calibrated uncertainty—both aleatoric (data noise) and epistemic (model ignorance).<br/><br/>
              <strong>Result: ECE &lt; 0.03</strong> calibration certified against expert annotators.
            </p>
          </div>
        </section>
      </div>

      {/* SECTION 8: ALL-WEATHER SENSING */}
      <div className="animated-text" style={{ backgroundColor: "#ffffff" }}>
        <section className="relative h-[100svh] w-full text-[#090909] z-10 reveal-container bg-white">
          <div className="absolute overflow-hidden top-18 bottom-auto md:top-auto left-5 right-5 md:left-10 md:right-10 w-auto md:w-1/2 md:bottom-9">
            <h3 className="text-xs md:text-base mb-3 md:mb-7 reveal-text font-bold text-[#090909]">CRITICAL ADVANTAGE</h3>
            <h2 className="text-2xl md:text-4xl 2xl:text-5xl reveal-text font-black leading-tight text-[#090909]">
              ALL-WEATHER<br />SENSING.
            </h2>
          </div>

          <div className="absolute bottom-5 md:bottom-9 left-5 right-5 md:left-auto md:right-10 w-auto md:w-1/3 text-[#090909] text-xs md:text-sm 2xl:text-base reveal-text font-medium leading-relaxed">
            <p>
              <strong>Sentinel‑1 SAR</strong> operates through cloud cover. Optical systems fail when clouds obscure the scene—precisely when floods are most dangerous. StitchMark eliminates this single point of failure. Near-real-time, all-weather intelligence for life-critical decisions.
            </p>
          </div>
        </section>
      </div>

      {/* SECTION 9: VALIDATED RESULTS */}
      <div className="animated-text" style={{ backgroundColor: "#0a0a0a" }}>
        <section className="relative h-[100svh] w-full text-white z-10 reveal-container bg-[#0a0a0a]">
          <div className="absolute overflow-hidden top-18 bottom-auto md:top-auto left-5 right-5 md:left-10 md:right-10 w-auto md:w-1/2 md:bottom-9">
            <h3 className="text-xs md:text-base mb-3 md:mb-7 reveal-text font-bold">PROVEN PERFORMANCE</h3>
            <h2 className="text-2xl md:text-4xl 2xl:text-5xl reveal-text font-black leading-tight">
              BENCHMARK<br />RESULTS.
            </h2>
          </div>

          <div className="absolute bottom-5 md:bottom-9 left-5 right-5 md:left-auto md:right-10 w-auto md:w-1/3 text-white text-xs md:text-sm 2xl:text-base reveal-text font-medium leading-relaxed">
            <div className="space-y-3">
              <p><strong>Baseline U-Net (thresholding):</strong> Dice 0.781</p>
              <p><strong>Prithvi‑100M fine-tuned:</strong> Dice 0.830</p>
              <p><strong>Target (full pipeline):</strong> &gt; Dice 0.85</p>
              <p className="pt-4 text-xs opacity-75">Uncertainty maps correctly flag challenging regions where annotator agreement is also lower—validating epistemic uncertainty is meaningful, not decorative.</p>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 10: COST & SUSTAINABILITY */}
      <div className="animated-text" style={{ backgroundColor: "#ffffff" }}>
        <section className="relative h-[100svh] w-full text-[#090909] z-10 reveal-container bg-white">
          <div className="absolute overflow-hidden top-18 bottom-auto md:top-auto left-5 right-5 md:left-10 md:right-10 w-auto md:w-1/2 md:bottom-9">
            <h3 className="text-xs md:text-base mb-3 md:mb-7 reveal-text font-bold text-[#090909]">EFFICIENCY</h3>
            <h2 className="text-2xl md:text-4xl 2xl:text-5xl reveal-text font-black leading-tight text-[#090909]">
              LEAN INFRASTRUCTURE.<br />INFINITE IMPACT.
            </h2>
          </div>

          <div className="absolute bottom-5 md:bottom-9 left-5 right-5 md:left-auto md:right-10 w-auto md:w-1/3 text-[#090909] text-xs md:text-sm 2xl:text-base reveal-text font-medium leading-relaxed">
            <p>
              <strong>4-month pilot:</strong> $1,628 (fully funded by Google Cloud credits)<br/>
              <strong>Ongoing operation:</strong> &lt;$500/month—fundable via humanitarian grants<br/>
              <strong>Zero lock-in:</strong> Apache 2.0 open-source, ready for handover to government agencies
            </p>
          </div>
        </section>
      </div>

      {/* SECTION 11: EDITORIAL STATEMENT */}
      <div className="animated-text">
        <section className="h-[100svh] w-full flex items-center justify-center text-white z-10 reveal-container">
          <div className="px-5 md:px-10 text-center">
            <h2 className="footerText reveal-text leading-tight">
              WHERE CUTTING-EDGE AI MEETS HUMANITARIAN IMPERATIVE. DELIVERING LIFE-SAVING INTELLIGENCE WITHIN MINUTES.
            </h2>
          </div>
        </section>
      </div>

      {/* SECTION 12: SOCIAL FOOTER LINKS */}
      <div className="animated-main">
        <section className="text-xs md:text-base relative block md:flex justify-between items-center px-5 md:px-10 h-auto md:h-10 my-5 md:my-5 w-full z-10 gap-5 overflow-hidden reveal-container">
          <div className="flex gap-5 justify-center uppercase reveal-text font-bold">
            <a className="opacity-100 hover:opacity-50 duration-200" href="mailto:info@stitchmark.ai">INFO@STITCHMARK.AI</a>
            <a className="opacity-100 hover:opacity-50 duration-200" href="https://github.com/stitchmark" target="_blank" rel="noopener noreferrer">GITHUB</a>
            <a className="opacity-100 hover:opacity-50 duration-200" href="https://linkedin.com/company/stitchmark" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
          </div>
          <div className="flex gap-5 mt-4 md:mt-0 justify-center text-center md:text-right reveal-text font-bold">
            <p className="truncate">STITCHMARK. OPEN SOURCE. DESIGNED FOR HANDOVER.</p>
          </div>
        </section>
      </div>

      {/* SECTION 13: WHITE CONTACT SECTION */}
      <div className="animated-form contact-section">
        <footer className="relative w-full z-10 pointer-events-auto bg-white rounded-t-3xl md:rounded-t-[3rem] text-[#090909] pb-10">
          <div className="h-full pb-5 pt-10 px-5 md:px-10 md:pb-10 md:pt-14 overflow-hidden reveal-container">
            
            <div className="block md:flex items-center gap-10">
              <div className="flex flex-col w-full md:w-1/2">
                <div className="overflow-hidden mb-3 md:mb-7">
                  <h3 className="text-xs md:text-base font-bold tracking-widest uppercase reveal-text text-black">INTERESTED?</h3>
                </div>
                <div className="overflow-hidden">
                  <h2 className="text-3xl md:text-4xl xl:text-5xl font-black uppercase reveal-text text-black leading-tight">GET INVOLVED.</h2>
                </div>
              </div>
              <div className="flex flex-col mt-5 md:mt-0 w-full md:w-1/2 text-xs md:text-sm xl:text-base leading-relaxed font-medium text-black">
                <div className="overflow-hidden">
                  <p className="reveal-text">StitchMark is open-source and designed for handover to disaster management agencies. Government partners, researchers, and humanitarian organizations can contribute or deploy today.</p>
                </div>
              </div>
            </div>

            <form className="block md:flex items-center justify-center gap-10 mt-10 md:mt-14" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col text-xs md:text-base w-full md:w-1/2 gap-4 md:gap-5 overflow-hidden">
                <input type="text" placeholder="Full Name" required className="inputData px-3 md:px-5 h-12 md:h-14 reveal-text" />
                <input type="email" placeholder="Email Address" required className="inputData px-3 md:px-5 h-12 md:h-14 reveal-text" />
                <input type="text" placeholder="Organization" className="inputData px-3 md:px-5 h-12 md:h-14 reveal-text" />
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
                    <span>SEND</span>
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

            <div className="mt-8 md:mt-12 pt-8 border-t border-black/10 text-center">
              <p className="text-xs md:text-sm text-black/70 mb-2">Have questions? Reach out directly:</p>
              <a href="mailto:sam@stitchmark.space" className="text-sm md:text-base font-semibold text-black hover:opacity-60 transition-opacity">sam@stitchmark.space</a>
            </div>

          </div>
        </footer>
      </div>

    </div>
  );
}
