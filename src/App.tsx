import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Components
import BackgroundPattern from "./components/BackgroundPattern";
import NameTypeAnimation from "./components/NameTypeAnimation";
import SkillList from "./components/SkillList";
import Links from "./components/Links";
import Footer from "./components/Footer";
import Projects from "./components/Projects";
import DownloadCV from "./components/DownloadCV";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Enhanced GSAP animations with modern effects
  useGSAP(() => {
    // Loading screen animation
    const tl = gsap.timeline();

    tl.from(".loading-screen", {
      duration: 2,
      opacity: 0,
      ease: "power2.inOut",
    }).to(".loading-screen", {
      duration: 1,
      opacity: 0,
      delay: 0.5,
      onComplete: () => setIsLoading(false),
    });

    // Parallax effect for hero section
    gsap.from(".hero-bg", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      y: -100,
      opacity: 0.5,
    });

    // Stagger animation for skill items
    gsap.from(".skill-item", {
      scrollTrigger: {
        trigger: ".skills-container",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)",
    });

    // Projects reveal animation
    gsap.from(".project-card", {
      scrollTrigger: {
        trigger: ".projects-section",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out",
    });
  }, []);

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX - 10,
          y: e.clientY - 10,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Custom Cursor - Desktop Only */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-50 hidden h-5 w-5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-80 mix-blend-difference lg:block"
        style={{
          transform: `translate(${mousePosition.x - 10}px, ${mousePosition.y - 10}px)`,
        }}
      />

      {/* Loading Screen */}
      {isLoading && (
        <div className="loading-screen fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="relative">
            <div className="h-20 w-20 animate-spin rounded-full border-4 border-transparent border-r-purple-500 border-t-cyan-400"></div>
            <div className="animate-reverse absolute inset-0 m-auto h-16 w-16 animate-spin rounded-full border-4 border-transparent border-l-cyan-500 border-t-purple-400"></div>
          </div>
        </div>
      )}

      <main className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
        {/* Background Elements */}
        <div className="hero-bg absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
        <BackgroundPattern />

        {/* Floating orbs - Responsive */}
        <div className="fixed left-4 top-10 h-16 w-16 animate-pulse rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-xl sm:left-10 sm:top-20 sm:h-32 sm:w-32"></div>
        <div className="fixed bottom-10 right-4 h-20 w-20 animate-pulse rounded-full bg-gradient-to-r from-purple-400/20 to-pink-500/20 blur-xl delay-1000 sm:bottom-20 sm:right-10 sm:h-40 sm:w-40"></div>
        
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="hero-section relative flex min-h-screen select-none flex-col items-start justify-center px-6 pt-16 sm:px-8 sm:pt-20 md:pt-0 lg:px-16 xl:px-24"
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <h1
              id="scramble"
              data-aos="fade-down"
              data-aos-delay="100"
              className="Kalnia select-none bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-4xl font-black leading-tight text-transparent sm:text-6xl md:text-8xl 2xl:text-[10rem]"
              style={{
                filter: "drop-shadow(0 0 30px rgba(139, 92, 246, 0.3))",
              }}
            >
              <span className="mb-2 block text-lg font-light text-gray-300 sm:mb-4 sm:text-2xl md:text-4xl">
                Hello, I'm
              </span>
              <NameTypeAnimation />
            </h1>

            {/* Enhanced Bio and Skills Grid - Better proportions */}
            <div className="mt-8 grid gap-8 sm:mt-12 lg:mt-16 lg:grid-cols-3 xl:gap-12">
              {/* Bio Section - Takes 2/3 on desktop */}
              <div className="space-y-6 lg:col-span-2">
                <p
                  data-aos="fade-right"
                  data-aos-delay="200"
                  className="rounded-xl border border-white/10 bg-white/5 p-6 text-base leading-relaxed text-gray-300 backdrop-blur-sm sm:rounded-2xl sm:p-8 lg:text-lg xl:text-xl"
                >
                  Passionate full-stack developer crafting digital experiences
                  that blend innovation with functionality. I transform ideas
                  into elegant, user-centric solutions that make a difference.
                </p>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-4 sm:gap-6">
                  <div
                    className="flex gap-4"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <Links />
                  </div>
                  <DownloadCV />
                </div>
              </div>

              {/* Skills Section - Takes 1/3 on desktop */}
              <div className="skills-container space-y-6">
                <SkillList />
              </div>
            </div>
          </div>
        </section>

        {/* Transition Element */}
        <div className="h-20 bg-gradient-to-b from-transparent to-slate-900/50 sm:h-32"></div>

        {/* Projects Section - Remove container wrapper */}
        <section className="projects-section py-16 sm:py-20 lg:py-24">
          <div className="mb-12 px-6 text-center sm:mb-16 lg:mb-20 lg:px-16 xl:px-24">
            <h2 className="mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl xl:text-6xl">
              Featured Projects
            </h2>
            <p className="mx-auto max-w-3xl text-base text-gray-400 sm:text-lg lg:text-xl">
              Discover my latest work and creative solutions
            </p>
          </div>
          
          {/* Projects component without container wrapper */}
          <div className="px-6 lg:px-16 xl:px-24">
            <Projects t={() => {}} />
          </div>
        </section>

        {/* Enhanced Footer - Better spacing */}
        <div className="mt-20 sm:mt-28 lg:mt-32">
          <Footer />
        </div>

        {/* Scroll indicator - Desktop only */}
        <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 transform flex-col items-center space-y-2 lg:flex xl:right-8">
          <div className="h-16 w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent"></div>
          <div className="h-8 w-2 rounded-full border border-cyan-400/50">
            <div className="mx-auto mt-1 h-2 w-1 animate-bounce rounded-full bg-cyan-400"></div>
          </div>
          <div className="h-16 w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent"></div>
        </div>
      </main>
    </>
  );
};

export default App;