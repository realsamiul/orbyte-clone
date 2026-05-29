"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const revealElements = gsap.utils.toArray<HTMLElement>(".reveal-target");
      
      revealElements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="scroll-container pt-32 pb-0">
      
      <div className="animated-main min-h-[60vh] flex flex-col justify-center">
        <main className="relative w-full px-5 md:px-10 py-4 md:py-9 text-white z-10">
          <div className="flex flex-col overflow-hidden reveal-target">
            <h2 className="text-xs md:text-base mb-3 md:mb-7 font-bold tracking-widest uppercase">MAIN</h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-black leading-tight">
              WE CREATE<br />DIGITAL EXPERIENCES.
            </h1>
          </div>
        </main>
      </div>

      <div className="animated-step">
        <section className="relative h-[60svh] w-full text-white z-10 flex items-end justify-center pb-20 reveal-target">
          <div className="transform text-center flex flex-col items-center">
            <div className="arrow mb-4 animate-bounce">
              <img src="/icons/arrow.svg" alt="ArrowDown" className="w-6 h-6 invert" />
            </div>
            <p className="text-xs md:text-sm tracking-[0.2em] opacity-80 uppercase font-bold">SCROLL TO EXPLORE</p>
          </div>
        </section>
      </div>

      <div className="animated-about">
        <section className="relative min-h-[100svh] w-full px-5 md:px-10 py-20 text-white z-10 flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
            <div className="reveal-target">
              <h2 className="text-xs md:text-base mb-3 md:mb-7 font-bold tracking-widest uppercase">ABOUT US</h2>
              <h1 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-black leading-tight mb-10">
                SOFTWARE DESIGN<br />& DEVELOPMENT STUDIO.
              </h1>
              <p className="text-xs md:text-sm opacity-60 uppercase font-bold tracking-widest leading-relaxed">
                Founded in<br />Buenos Aires, Argentina.
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-6 text-sm md:text-base xl:text-lg opacity-80 max-w-lg font-medium leading-relaxed reveal-target">
              <p>
                ORBYTE is a software design and development studio focused on building high-impact digital products and scalable systems. We approach design as a dynamic system, which evolves alongside the product, the business, and its users.
              </p>
              <p>
                We specialize in helping organizations grow with robust digital solutions tailored to current needs and with a long-term vision. Our focus is on creating user experiences that scale and perform over time.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="animated-services">
        <section className="relative min-h-[150svh] w-full px-5 md:px-10 py-20 text-white z-10 flex flex-col justify-center gap-20 md:gap-32">
          
          <div className="w-full flex justify-end reveal-target">
            <div className="flex flex-col md:flex-row gap-5 md:gap-10 w-full md:w-3/4 lg:w-2/3">
              <div className="w-full md:w-1/2">
                <h2 className="text-xs md:text-base mb-3 md:mb-7 font-bold tracking-widest uppercase">SERVICES</h2>
                <h3 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-black leading-tight">
                  HIGH-IMPACT<br />USER EXPERIENCES.
                </h3>
              </div>
              <div className="flex flex-col justify-end w-full md:w-1/2 text-sm md:text-base opacity-80 mt-2 md:mt-0 font-medium leading-relaxed">
                <p>
                  We design conversion-driven interfaces that seamlessly evolve with your brand. By blending visual storytelling with intuitive usability, we transform digital touchpoints into engaging journeys that capture and retain user attention.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-start reveal-target">
            <div className="flex flex-col md:flex-row gap-5 md:gap-10 w-full md:w-3/4 lg:w-2/3">
              <div className="w-full md:w-1/2">
                <h2 className="text-xs md:text-base mb-3 md:mb-7 font-bold tracking-widest uppercase opacity-0 hidden md:block">SERVICES</h2>
                <h3 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-black leading-tight">
                  IMMERSIVE<br />3D ENVIRONMENTS.
                </h3>
              </div>
              <div className="flex flex-col justify-end w-full md:w-1/2 text-sm md:text-base opacity-80 mt-2 md:mt-0 font-medium leading-relaxed">
                <p>
                  We create highly detailed three-dimensional visuals. We use 3D as an expressive tool that can enhance an interface, tell a story, or transform an idea into an immersive visual environment.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end reveal-target">
            <div className="flex flex-col md:flex-row gap-5 md:gap-10 w-full md:w-3/4 lg:w-2/3">
              <div className="w-full md:w-1/2">
                <h2 className="text-xs md:text-base mb-3 md:mb-7 font-bold tracking-widest uppercase opacity-0 hidden md:block">SERVICES</h2>
                <h3 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-black leading-tight">
                  INTELLIGENT<br />SOFTWARE SOLUTIONS.
                </h3>
              </div>
              <div className="flex flex-col justify-end w-full md:w-1/2 text-sm md:text-base opacity-80 mt-2 md:mt-0 font-medium leading-relaxed">
                <p>
                  We engineer robust digital architectures, from custom internal systems to automated workflows. Every solution is built with a focus on logic, security, and long-term scalability to ensure your technology supports your business growth.
                </p>
              </div>
            </div>
          </div>

        </section>
      </div>

      <div className="animated-phrase">
        <section className="relative h-[80svh] md:h-[100svh] w-full px-5 md:px-10 py-20 text-white z-10 flex items-center justify-center text-center reveal-target">
          <h2 className="text-2xl sm:text-4xl md:text-5xl 2xl:text-6xl w-[100%] md:w-[80%] leading-tight font-black uppercase">
            A DYNAMIC ENTITY, CREATED TO ADAPT, RESONATE, AND STAND OVER TIME WITH INTEGRITY.
          </h2>
        </section>
      </div>

      <div className="relative w-full z-10 pointer-events-auto bg-white rounded-t-3xl md:rounded-t-[3rem] text-black pb-10">
        <footer className="w-full relative pointer-events-auto">
          <div className="h-full pb-5 pt-10 px-5 md:px-10 md:pb-10 md:pt-14 overflow-hidden">
            
            <div className="block md:flex items-center gap-10 reveal-target">
              <div className="flex flex-col w-full md:w-1/2">
                <h3 className="text-xs md:text-base mb-3 md:mb-7 font-bold tracking-widest uppercase">CONTACT</h3>
                <h2 className="text-3xl md:text-4xl xl:text-5xl font-black uppercase">SEND US YOUR QUERY.</h2>
              </div>
              <div className="flex flex-col mt-5 md:mt-0 w-full md:w-1/2 text-xs md:text-sm xl:text-base leading-relaxed font-medium">
                <p>If you are looking for a team to support you in the development of your project, don’t hesitate to contact us.</p>
                <p className="hidden md:flex mt-4">We are available to carry out your project.</p>
              </div>
            </div>

            <form className="block md:flex items-center justify-center gap-10 mt-10 md:mt-14 reveal-target" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col text-xs md:text-base w-full md:w-1/2 gap-4 md:gap-5">
                <input type="text" placeholder="Full Name" required className="px-3 md:px-5 h-12 md:h-14 border-b border-black/20 bg-transparent outline-none focus:border-black transition-colors" />
                <input type="email" placeholder="Email Address" required className="px-3 md:px-5 h-12 md:h-14 border-b border-black/20 bg-transparent outline-none focus:border-black transition-colors" />
                <input type="text" placeholder="Company Name" className="px-3 md:px-5 h-12 md:h-14 border-b border-black/20 bg-transparent outline-none focus:border-black transition-colors" />
              </div>
              <div className="flex flex-col text-xs md:text-base w-full md:w-1/2 pt-6 md:pt-0 gap-5">
                <textarea placeholder="Message" required className="px-3 py-3 md:px-5 md:py-4 h-24 md:h-32 rounded-2xl border border-black/20 bg-transparent outline-none focus:border-black transition-colors resize-none"></textarea>
                <div className="flex items-center uppercase justify-between mt-2">
                  <button type="submit" className="radial-button uppercase font-bold text-sm px-8 py-3 bg-black text-white hover:bg-white hover:text-black border-black border">
                    SUBMIT
                  </button>
                  <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="font-bold text-xs md:text-sm hover:opacity-50 transition-opacity">
                    BACK TO TOP
                  </button>
                </div>
              </div>
            </form>

          </div>

          <section className="text-xs md:text-base relative block md:flex justify-between items-center px-5 md:px-10 h-auto md:h-10 mt-10 md:mt-20 w-full z-10 gap-5 overflow-hidden font-bold reveal-target">
            <div className="flex flex-wrap gap-5 justify-center md:justify-start uppercase">
              <a className="opacity-100 hover:opacity-50 duration-200" href="mailto:info@orbyte.studio">INFO@ORBYTE.STUDIO</a>
              <a className="opacity-100 hover:opacity-50 duration-200" href="https://www.instagram.com/orbyte.studio/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
              <a className="opacity-100 hover:opacity-50 duration-200" href="https://www.linkedin.com/company/orbyte-studio/" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
            </div>
            <div className="flex flex-wrap gap-5 justify-center md:justify-end text-center md:text-right mt-5 md:mt-0">
              <Link className="opacity-100 hover:opacity-50 duration-200 truncate" href="/privacy">PRIVACY POLICY</Link>
              <p className="truncate">ORBYTE STUDIO. ALL RIGHTS RESERVED.</p>
            </div>
          </section>
        </footer>
      </div>

    </div>
  );
}

