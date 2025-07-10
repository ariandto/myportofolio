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
      {/* Judul */}
      <h1
        data-aos="fade-down"
        className="Kalnia custom-h1 text-center text-6xl font-bold uppercase selection:bg-AlmostBlack selection:text-AlmostWhite before:stroke-AlmostWhite md:text-8xl"
      >
        {t("project")}
      </h1>

      <div className="space-y-6">
        {projectList.map((data: ProjectItem, index) => {
          /* Normalisasi images → selalu array */
          const imagesArr = Array.isArray(data.images)
            ? data.images
            : [data.images];

          return (
            <div
              key={index}
              data-aos="fade-up"
              className="mt-16 grid items-center gap-4 rounded-xl border border-AlmostWhite/50 p-5 md:grid-cols-2"
            >
              {/* ---------------- GAMBAR / SLIDER ---------------- */}
              <div
                data-aos="fade-right"
                className={`cursor-pointer select-none rounded-lg ${
                  index % 2 === 0 ? "md:order-last" : ""
                }`}
              >
                {/* 👉 Jika >1 gambar pakai slider, else <img> */}
                {imagesArr.length > 1 ? (
                  <ImageSlider
                    images={imagesArr.map(
                      (src) => import.meta.env.BASE_URL + src,
                    )}
                    alt={data.title}
                  />
                ) : (
                  <img
                    src={import.meta.env.BASE_URL + imagesArr[0]}
                    alt={data.title}
                    className="h-[300px] w-[115%] rounded-lg object-cover object-top transition-all duration-[7s] ease-linear hover:object-bottom"
                  />
                )}
              </div>

              {/* ---------------- DESKRIPSI ---------------- */}
              <div data-aos="fade-left" className="space-y-6 text-center">
                <h2 className="Kalnia text-5xl font-semibold text-SecondaryColor selection:bg-SecondaryColor selection:text-AlmostBlack">
                  {data.title}
                </h2>

                <p className="font-light selection:bg-AlmostWhite selection:text-AlmostBlack">
                  {data.desc}
                </p>

                {/* ---------------- CTA BUTTONS ---------------- */}
                <div className="flex select-none justify-center gap-5">
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
