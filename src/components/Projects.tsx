// src/components/Projects.tsx
import React from "react";
import projectList from "../assets/projects.json";
import { Code, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

import ImageSlider from "./ImageSlider"; // ⬅️ pastikan path ini benar

interface ProjectItem {
  title: string;
  desc: string;
  images: string[] | string; // array ⬅️ untuk slider, string ⬅️ untuk 1 gambar
  linkDemo?: string;
  linkCode?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Projects: React.FC<{ t: any }> = ({ t }) => {
  return (
    <section id="main-element" className="py-40">
      {/* Judul dengan tipografi modern */}
      <h1
        data-aos="fade-down"
        className="text-center text-6xl font-black uppercase tracking-tight md:text-8xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4"
        style={{
          fontFamily: "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
          textShadow: "0 4px 20px rgba(59, 130, 246, 0.3)"
        }}
      >
        {t("project")}
      </h1>

      <div className="space-y-12 mt-20">
        {projectList.map((data: ProjectItem, index) => {
          /* Normalisasi images → selalu array */
          const imagesArr = Array.isArray(data.images)
            ? data.images
            : [data.images];

          return (
            <div
              key={index}
              data-aos="fade-up"
              className="grid items-center gap-8 rounded-2xl border border-blue-200/60 p-8 shadow-lg bg-transparent backdrop-blur-sm hover:shadow-xl transition-all duration-300 md:grid-cols-2 hover:border-blue-300/80"
            >
              {/* ---------------- GAMBAR / SLIDER ---------------- */}
              <div
  data-aos="fade-right"
  className={`w-full xl:col-span-2 xl:-mx-8 xl:px-0 cursor-pointer select-none rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${
    index % 2 === 0 ? "md:order-last" : ""
  }`}
>
  {imagesArr.length > 1 ? (
    <ImageSlider
      images={imagesArr.map((src) => import.meta.env.BASE_URL + src)}
      alt={data.title}
    />
  ) : (
    <img
      src={import.meta.env.BASE_URL + imagesArr[0]}
      alt={data.title}
      className="w-full h-auto max-h-[520px] rounded-xl object-cover object-top aspect-video transition-all duration-[7s] ease-linear hover:object-bottom"
    />
  )}
</div>


              {/* ---------------- DESKRIPSI ---------------- */}
              <div data-aos="fade-left" className="space-y-6 text-center">
                <h2 
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2 sm:mb-4 tracking-tight"
                  style={{
                    fontFamily: "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif"
                  }}
                >
                  {data.title}
                </h2>

                <p 
                  className="text-slate-600 leading-relaxed text-lg font-normal"
                  style={{
                    fontFamily: "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif"
                  }}
                >
                  {data.desc}
                </p>

                {/* ---------------- CTA BUTTONS ---------------- */}
                <div className="flex select-none justify-center gap-4 pt-4">
                  {/* Demo */}
                  <button
                    onClick={() =>
                      data.linkDemo
                        ? window.open(data.linkDemo, "_blank")
                        : toast.error(
                            t("demoNotAvailable") || "Demo is not available",
                          )
                    }
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-3 text-white font-semibold capitalize transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    style={{
                      fontFamily: "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif"
                    }}
                  >
                    <ExternalLink size={18} />
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
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 px-6 py-3 text-white font-semibold capitalize transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    style={{
                      fontFamily: "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif"
                    }}
                  >
                    <Code size={18} />
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