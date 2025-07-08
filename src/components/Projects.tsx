// src/components/Projects.tsx
import React, { useEffect, useRef, useState } from "react";
import projectList from "../assets/projects.json";
import { Code, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

/* -------------------------------------------------------------------------- */
/* 1. ImageSlider – menampilkan 1 gambar & auto-slide tiap 3 detik            */
/* -------------------------------------------------------------------------- */
interface ImageSliderProps {
  images: string[];
  alt: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, alt }) => {
  const [idx, setIdx] = useState(0);
  const delay = 3000;
  type Timeout = ReturnType<typeof setTimeout>; // <-- tambahkan
  const timeoutRef = useRef<Timeout | null>(null); // <-- diperbaiki

  const next = () => setIdx((i) => (i + 1) % images.length);

  useEffect(() => {
    // set timer baru
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(next, delay);

    // 🛠️ cleanup harus meng-clear timer & tidak mengembalikan apa-apa
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null; // opsi: reset ke null
      }
    };
  }, [idx, images.length]);

  const pause = () => timeoutRef.current && clearTimeout(timeoutRef.current);

  return (
    <div
      onMouseEnter={pause}
      onMouseLeave={() => (timeoutRef.current = setTimeout(next, delay))}
      className="relative h-[300px] w-full overflow-hidden rounded-lg"
    >
      {/* Rail */}
      <div
        className="flex h-full w-full transition-transform duration-500 ease-in-out"
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

      {/* Bullet indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-2 w-2 rounded-full ${
                i === idx ? "bg-AlmostWhite" : "bg-AlmostWhite/40"
              }`}
            />
          ))}
        </div>
      )}
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
