import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";

// Components
import BackgroundPattern from "./components/BackgroundPattern";
import NameTypeAnimation from "./components/NameTypeAnimation";
import SkillList from "./components/SkillList";
import Links from "./components/Links";
import Footer from "./components/Footer";
import Projects from "./components/Projects";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const VISITOR_TRACKER_API_URL = "https://portfoliobackend-mv27ok25f-ridloghifarys-projects.vercel.app/api/track";

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
      ease: "power2.inOut"
    })
    .to(".loading-screen", {
      duration: 1,
      opacity: 0,
      delay: 0.5,
      onComplete: () => setIsLoading(false)
    });

    // Parallax effect for hero section
    gsap.from(".hero-bg", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1
      },
      y: -100,
      opacity: 0.5
    });

    // Stagger animation for skill items
    gsap.from(".skill-item", {
      scrollTrigger: {
        trigger: ".skills-container",
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)"
    });

    // Projects reveal animation
    gsap.from(".project-card", {
      scrollTrigger: {
        trigger: ".projects-section",
        start: "top 70%",
        toggleActions: "play none none reverse"
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out"
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
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Visitor tracking with enhanced error handling
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        await axios.get(VISITOR_TRACKER_API_URL, {
          timeout: 5000,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Visitor tracking failed:", error.response?.data || error.message);
        } else {
          console.error("Unexpected error during visitor tracking:", error);
        }
      }
    };

    const timer = setTimeout(trackVisitor, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Custom Cursor - Desktop Only */}
      <div 
        ref={cursorRef}
        className="fixed w-5 h-5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference opacity-80 hidden lg:block"
        style={{ 
          transform: `translate(${mousePosition.x - 10}px, ${mousePosition.y - 10}px)` 
        }}
      />

      {/* Loading Screen */}
      {isLoading && (
        <div className="loading-screen fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-transparent border-t-cyan-400 border-r-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 m-auto border-4 border-transparent border-t-purple-400 border-l-cyan-500 rounded-full animate-spin animate-reverse"></div>
          </div>
        </div>
      )}

      <main className="overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white relative">
        {/* Background Elements */}
        <div className="hero-bg absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
        <BackgroundPattern />
        
        {/* Floating orbs - Responsive */}
        <div className="fixed top-10 sm:top-20 left-4 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="fixed bottom-10 sm:bottom-20 right-4 sm:right-10 w-20 h-20 sm:w-40 sm:h-40 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 2xl:max-w-7xl relative z-10">
          {/* Hero Section */}
          <section 
            ref={heroRef}
            className="hero-section relative flex min-h-screen select-none flex-col items-start justify-center pt-16 sm:pt-20 md:pt-0 px-2 sm:px-0"
          >
            {/* Glassmorphism card - Mobile optimized */}
            <div className="absolute inset-2 sm:inset-0 bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl"></div>
            
            <div className="relative z-10 w-full p-4 sm:p-6 lg:p-8">
              <h1
                id="scramble"
                data-aos="fade-down"
                data-aos-delay="100"
                className="Kalnia select-none text-4xl sm:text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent md:text-8xl 2xl:text-[10rem] leading-tight"
                style={{ 
                  filter: "drop-shadow(0 0 30px rgba(139, 92, 246, 0.3))" 
                }}
              >
                <span className="block text-lg sm:text-2xl md:text-4xl font-light text-gray-300 mb-2 sm:mb-4">
                  Hello, I'm
                </span>
                <NameTypeAnimation />
              </h1>

              {/* Enhanced Bio and Skills Grid - Mobile First */}
              <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 md:grid-cols-2 lg:gap-16">
                <div className="space-y-4 sm:space-y-6">
                  <p
                    data-aos="fade-right"
                    data-aos-delay="200"
                    className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300 backdrop-blur-sm bg-white/5 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10"
                  >
                    Passionate full-stack developer crafting digital experiences 
                    that blend innovation with functionality. I transform ideas 
                    into elegant, user-centric solutions.
                  </p>
                  
                  {/* Status indicator - Mobile optimized */}
                  <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <span className="text-green-400 font-medium">Available for projects</span>
                  </div>
                </div>

                <div className="skills-container mt-6 md:mt-0">
                  <SkillList />
                </div>
              </div>

              {/* Enhanced Links Section - Mobile spacing */}
              <div className="mt-8 sm:mt-12 lg:mt-16" data-aos="fade-up" data-aos-delay="400">
                <Links />
              </div>
            </div>
          </section>

          {/* Transition Element */}
          <div className="h-32 bg-gradient-to-b from-transparent to-slate-900/50"></div>

          {/* Projects Section - Mobile optimized */}
          <section className="projects-section py-10 sm:py-16 lg:py-20">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2 sm:mb-4">
                Featured Project
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto px-2">
                Discover my latest work and creative solutions
              </p>
            </div>
            <Projects t={() => {}} />
          </section>
        </div>

        {/* Enhanced Footer - Mobile spacing */}
        <div className="mt-16 sm:mt-24 lg:mt-32">
          <Footer />
        </div>

        {/* Scroll indicator - Desktop only */}
        <div className="fixed right-4 sm:right-8 top-1/2 transform -translate-y-1/2 hidden lg:flex flex-col items-center space-y-2 z-40">
          <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"></div>
          <div className="w-2 h-6 sm:h-8 border border-cyan-400/50 rounded-full">
            <div className="w-1 h-1.5 sm:h-2 bg-cyan-400 rounded-full mx-auto mt-1 animate-bounce"></div>
          </div>
          <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"></div>
        </div>
      </main>
    </>
  );
};

export default App;