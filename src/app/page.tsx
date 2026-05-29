export default function Home() {
  return (
    <div className="scroll-container pt-32">
      {/* SECTION 1: HERO */}
      <div className="animated-main min-h-[50vh] flex flex-col justify-center">
        <main className="relative w-full px-5 md:px-10 py-4 md:py-9 text-white z-10">
          <div className="flex flex-col overflow-hidden">
            <h2 className="text-xs md:text-base mb-3 md:mb-7 font-bold tracking-widest uppercase">MAIN</h2>
            <h1 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-black leading-tight">
              WE CREATE<br />DIGITAL EXPERIENCES.
            </h1>
          </div>
        </main>
      </div>

      {/* SECTION 2: SCROLL TO EXPLORE */}
      <div className="animated-step">
        <section className="relative h-[80svh] w-full text-white z-10 flex items-end justify-center pb-20">
          <div className="transform text-center flex flex-col items-center">
            <div className="arrow mb-4 animate-bounce">
              <img src="/icons/arrow.svg" alt="ArrowDown" className="w-6 h-6 invert" />
            </div>
            <p className="text-sm tracking-[0.2em] opacity-80 uppercase">SCROLL TO EXPLORE</p>
          </div>
        </section>
      </div>

      {/* SECTION 3: ABOUT */}
      <div className="animated-about">
        <section className="relative min-h-screen w-full px-5 md:px-10 py-20 text-white z-10 flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
            <div>
              <h2 className="text-xs md:text-base mb-3 md:mb-7 font-bold tracking-widest uppercase">ABOUT US</h2>
              <h1 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-black leading-tight mb-10">
                SOFTWARE DESIGN<br />& DEVELOPMENT STUDIO.
              </h1>
              <p className="text-sm opacity-60 uppercase tracking-widest">
                Founded in<br />Buenos Aires, Argentina.
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-6 text-sm md:text-base opacity-80 max-w-lg">
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

      {/* MORE SECTIONS TO BE ADDED (SERVICES, CONTACT, FOOTER) */}
      <div className="h-[100vh]"></div>
    </div>
  );
}
