// src/components/Projects.tsx
import React from "react";
import projectList from "../assets/projects.json";     // ✅ pastikan path benar
import { Code, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

/* ----------------------------- Types (optional) ---------------------------- */
interface ProjectItem {
  title: string;
  desc: string;
  images?: string[];          // array (direkomendasikan)
  image?: string;             // string (fallback)
  linkDemo?: string;
  linkCode?: string;
}

interface ProjectsProps {
  // fungsi i18n (ganti tipe sesuai lib yang kamu pakai)
  t: (key: string) => string;
}

/* -------------------------------------------------------------------------- */
const Projects: React.FC<ProjectsProps> = ({ t }) => {
  return (
    <section id="main-element" className="py-40">
      {/* Judul ---------------------------------------------------------------- */}
      <h1
        data-aos="fade-down"
        className="Kalnia custom-h1 text-center text-6xl font-bold uppercase selection:bg-AlmostBlack selection:text-AlmostWhite before:stroke-AlmostWhite md:text-8xl"
      >
        {t("project")}
      </h1>

      {/* Daftar Project ------------------------------------------------------- */}
      <div className="space-y-6">
        {projectList.map((data: ProjectItem, index: number) => {
          /* 1️⃣ Siapkan array gambar --------------------------------------- */
          const images: string[] =
            data.images && data.images.length > 0
              ? data.images
              : data.image
              ? [data.image] // fallback ke image tunggal
              : [];

          return (
            <div
              key={index}
              data-aos="fade-up"
              className="mt-16 grid items-center gap-4 rounded-xl border border-AlmostWhite/50 p-5 md:grid-cols-2"
            >
              {/* --- Kolom Gambar ------------------------------------ */}
              <div
                data-aos="fade-right"
                className={`border-AlmostWhite ${
                  index % 2 === 0 ? "md:order-last" : ""
                } cursor-pointer select-none rounded-lg space-y-2`}
              >
                {images.length === 0 && (
                  <div className="flex h-[300px] w-full items-center justify-center rounded-lg bg-AlmostBlack/20 text-sm italic">
                    {t("imageNotAvailable") || "Image not available"}
                  </div>
                )}

                {/* Tampilkan semua gambar */}
                {images.map((src, i) => (
                  <img
                    key={i}
                    src={import.meta.env.BASE_URL + src}
                    alt={`${data.title} – ${i + 1}`}
                    className="h-[300px] w-full rounded-lg object-cover object-top transition-all duration-[7s] ease-linear hover:object-bottom"
                  />
                ))}
              </div>

              {/* --- Kolom Deskripsi -------------------------------- */}
              <div data-aos="fade-left" className="space-y-6 text-center">
                <h2 className="Kalnia text-5xl font-semibold text-SecondaryColor selection:bg-SecondaryColor selection:text-AlmostBlack">
                  {data.title}
                </h2>

                <p className="font-light selection:bg-AlmostWhite selection:text-AlmostBlack">
                  {data.desc}
                </p>

                {/* Tombol Demo / Code -------------------------------- */}
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
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
