import React from "react";
import projectList from "../assets/projects.json";
import { Code, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import ImageSlider from "./ImageSlider";

interface ProjectItem {
  title: string;
  desc: string;
  images: string[] | string;
  linkDemo?: string;
  linkCode?: string;
}

const Projects: React.FC<{ t: any }> = ({ t }) => {
  const imagesWithBase = (img: string | string[]) =>
    (Array.isArray(img) ? img : [img]).map((src) => import.meta.env.BASE_URL + src);

  return (
    <section id="main-element" className="py-40">
      <h1
        data-aos="fade-down"
        className="text-center text-6xl font-black uppercase tracking-tight md:text-8xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4"
        style={{
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          textShadow: "0 4px 20px rgba(59, 130, 246, 0.3)",
        }}
      >
        {t("project")}
      </h1>

      <div className="mt-20 grid gap-12 xl:grid-cols-2">
        {projectList.map((data: ProjectItem, index) => {
          const images = imagesWithBase(data.images);

          // Layout logic: item ke-3 (index 2) ditaruh di baris baru kolom kiri
          const isThirdItem = index === 2;
          const wrapperClass = `grid items-center gap-8 rounded-2xl border border-cyan-500/30 p-8 shadow-lg bg-white/5 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:border-cyan-400/40 ${
            isThirdItem ? "xl:col-span-1 xl:col-start-1" : ""
          }`;

          return (
            <div key={index} data-aos="fade-up" className={wrapperClass}>
              {/* ---------------- GAMBAR / SLIDER ---------------- */}
              <div
                data-aos="fade-right"
                className={`w-full cursor-pointer select-none rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${
                  index % 2 === 0 ? "md:order-last" : ""
                }`}
              >
                {images.length > 1 ? (
                  <ImageSlider images={images} alt={data.title} />
                ) : (
                  <img
                    src={images[0]}
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
                    fontFamily: "'Inter', 'Segoe UI', sans-serif",
                  }}
                >
                  {data.title}
                </h2>

                <p
                  className="text-slate-300 leading-relaxed text-lg font-normal"
                  style={{
                    fontFamily: "'Inter', 'Segoe UI', sans-serif",
                  }}
                >
                  {data.desc}
                </p>

                <div className="flex justify-center gap-4 pt-4">
                  <button
                    onClick={() =>
                      data.linkDemo
                        ? window.open(data.linkDemo, "_blank")
                        : toast.error(t("demoNotAvailable") || "Demo is not available")
                    }
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-3 text-white font-semibold capitalize transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <ExternalLink size={18} />
                    {t("demo")}
                  </button>

                  <button
                    onClick={() =>
                      data.linkCode
                        ? window.open(data.linkCode, "_blank")
                        : toast.error(t("codeNotAvailable") || "Code is not available")
                    }
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 px-6 py-3 text-white font-semibold capitalize transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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
