// src/components/Projects.tsx
import React, { useEffect, useRef, useState } from "react";
import projectList from "../assets/projects.json";
import { Code, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

/* -------------------------------------------------------------------------- */
/* 1. ImageSlider – menampilkan gambar dengan auto-slide dan kontrol manual   */
/* -------------------------------------------------------------------------- */
interface ImageSliderProps {
  images: string[];
  alt: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, alt }) => {
  const [idx, setIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const delay = 4000; // 4 detik untuk lebih nyaman
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const next = () => setIdx((i) => (i + 1) % images.length);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const startTimer = () => {
    if (isPlaying && images.length > 1) {
      resetTimer();
      timeoutRef.current = setTimeout(next, delay);
    }
  };

  useEffect(() => {
    startTimer();
    return () => resetTimer();
  }, [idx, images.length, isPlaying]);

  const handleMouseEnter = () => {
    setIsPlaying(false);
    resetTimer();
  };

  const handleMouseLeave = () => {
    setIsPlaying(true);
  };

  const handleManualNext = () => {
    resetTimer();
    next();
  };

  const handleManualPrev = () => {
    resetTimer();
    prev();
  };

  const goToSlide = (index: number) => {
    resetTimer();
    setIdx(index);
  };

  // Jika hanya ada 1 gambar, tampilkan tanpa slider
  if (images.length === 1) {
    return (
      <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
        <img
          src={import.meta.env.BASE_URL + images[0]}
          alt={alt}
          className="h-full w-full object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative h-[300px] w-full overflow-hidden rounded-lg"
    >
      {/* Rail gambar */}
      <div
        className="flex h-full w-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={import.meta.env.BASE_URL + src}
            alt={`${alt} – ${i + 1}`}
            className="h-full w-full flex-shrink-0 object-cover object-top"
          />
        ))}
      </div>

      {/* Tombol navigasi kiri */}
      <button
        onClick={handleManualPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-AlmostBlack/60 p-2 text-AlmostWhite opacity-0 transition-opacity hover:bg-AlmostBlack/80 group-hover:opacity-100"
        aria-label="Previous image"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Tombol navigasi kanan */}
      <button
        onClick={handleManualNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-AlmostBlack/60 p-2 text-AlmostWhite opacity-0 transition-opacity hover:bg-AlmostBlack/80 group-hover:opacity-100"
        aria-label="Next image"
      >
        <ChevronRight size={20} />
      </button>

      {/* Bullet indicator */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === idx 
                ? "bg-AlmostWhite w-6" 
                : "bg-AlmostWhite/40 hover:bg-AlmostWhite/60"
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-AlmostBlack/20">
        <div
          className={`h-full bg-SecondaryColor transition-all duration-300 ${
            isPlaying ? 'animate-pulse' : ''
          }`}
          style={{ width: `${((idx + 1) / images.length) * 100}%` }}
        />
      </div>

      {/* Image counter */}
      <div className="absolute top-3 right-3 rounded-full bg-AlmostBlack/60 px-3 py-1 text-sm text-AlmostWhite">
        {idx + 1} / {images.length}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. Projects – menampilkan seluruh project                                  */
/* -------------------------------------------------------------------------- */
interface ProjectItem {
  title: string;
  desc: string;
  images: string[];
  linkDemo?: string;
  linkCode?: string;
}

interface ProjectsProps {
  t: (key: string) => string;
}

const Projects: React.FC<ProjectsProps> = ({ t }) => {
  return (
    <section id="main-element" className="py-40">
      <h1
        data-aos="fade-down"
        className="Kalnia custom-h1 text-center text-6xl font-bold uppercase selection:bg-AlmostBlack selection:text-AlmostWhite before:stroke-AlmostWhite md:text-8xl"
      >
        {t("project")}
      </h1>

      <div className="space-y-6">
        {projectList.map((data: ProjectItem, index: number) => (
          <div
            key={index}
            data-aos="fade-up"
            className="mt-16 grid items-center gap-4 rounded-xl border border-AlmostWhite/50 p-5 md:grid-cols-2"
          >
            {/* Kolom gambar – di kanan/kiri bergantian */}
            <div
              data-aos="fade-right"
              className={`${
                index % 2 === 0 ? "md:order-last" : ""
              } cursor-pointer select-none`}
            >
              {data.images && data.images.length > 0 ? (
                <ImageSlider images={data.images} alt={data.title} />
              ) : (
                <div className="flex h-[300px] items-center justify-center rounded-lg bg-AlmostBlack/20 text-sm italic">
                  {t("imageNotAvailable") || "Image not available"}
                </div>
              )}
            </div>

            {/* Kolom deskripsi */}
            <div data-aos="fade-left" className="space-y-6 text-center">
              <h2 className="Kalnia text-5xl font-semibold text-SecondaryColor selection:bg-SecondaryColor selection:text-AlmostBlack">
                {data.title}
              </h2>

              <p className="font-light selection:bg-AlmostWhite selection:text-AlmostBlack">
                {data.desc}
              </p>

              {/* Tombol */}
              <div className="flex select-none items-center justify-center gap-5">
                {/* Demo */}
                <button
                  onClick={() =>
                    data.linkDemo
                      ? window.open(data.linkDemo, "_blank")
                      : toast.error(
                          t("demoNotAvailable") || "Demo is not available",
                        )
                  }
                  className="flex items-center gap-2 rounded-xl bg-AlmostWhite/5 px-4 py-2 capitalize transition hover:bg-AlmostWhite/20"
                >
                  <ExternalLink />
                  {t("demo")}
                </button>

                {/* Code */}
                <button
                  onClick={() =>
                    data.linkCode
                      ? window.open(data.linkCode, "_blank")
                      : toast.error(
                          t("codeNotAvailable") || "Code is not available",
                        )
                  }
                  className="flex items-center gap-2 rounded-xl bg-AlmostWhite/5 px-4 py-2 capitalize transition hover:bg-AlmostWhite/20"
                >
                  <Code />
                  {t("code")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;