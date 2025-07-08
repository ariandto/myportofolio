import React from "react";
import projectList from "../assets/projects.json"; // Pastikan path ini benar
import { Code, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Projects: React.FC<{ t: any }> = ({ t }) => {
  return (
    <section className="py-40" id="main-element">
      <h1
        data-aos="fade-down"
        className="Kalnia custom-h1 text-center text-6xl font-bold uppercase selection:bg-AlmostBlack selection:text-AlmostWhite before:stroke-AlmostWhite md:text-8xl"
      >
        {t("project")}
      </h1>
      <div className="space-y-6">
        {projectList?.map((data, index: number) => (
          <div
            data-aos="fade-up"
            className="mt-16 grid items-center gap-4 rounded-xl border border-AlmostWhite/50 p-5 md:grid-cols-2"
            key={index}
          >
            <div
              data-aos="fade-right"
              className={`border-AlmostWhite ${
                index % 2 === 0 ? "md:order-last" : "" // Menggunakan "" jika null tidak diinginkan
              } cursor-pointer select-none rounded-lg`}
            >
              <img
                src={import.meta.env.BASE_URL + data.images} // Baris ini sudah benar dengan JSON yang direvisi
                alt={data.title}
                className="h-[300px] w-full rounded-lg object-cover object-top transition-all duration-[7s] ease-linear hover:object-bottom"
              />
            </div>
            <div data-aos="fade-left" className="space-y-6 text-center">
              <h2 className="Kalnia text-5xl font-semibold text-SecondaryColor selection:bg-SecondaryColor selection:text-AlmostBlack">
                {data.title}
              </h2>
              {/* REVISI BAGIAN DESKRIPSI */}
              <p className="font-light selection:bg-AlmostWhite selection:text-AlmostBlack">
                {/* Menggunakan data.desc langsung. Jika data.desc adalah translation key, gunakan t(data.desc) */}
                {/* Saya mengasumsikan data.desc adalah teks deskripsi final */}
                {/* Jika ingin tetap menggunakan fungsi t() dan data.desc adalah key: t(data.desc) */}
                {/* Jika deskripsi mungkin panjang dan tidak perlu di-capitalize seluruhnya, hapus className "capitalize" */}
                {data.desc}
              </p>
              <div className="flex select-none items-center justify-center gap-5">
                {/* Demo Button */}
                <button
                  onClick={() =>
                    data.linkDemo
                      ? window.open(data.linkDemo, "_blank")
                      : toast.error(t("demoNotAvailable") || "Demo is not available") // Gunakan t() untuk pesan error jika ada
                  }
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-AlmostWhite/5 px-4 py-2 capitalize transition hover:bg-AlmostWhite/20"
                >
                  <ExternalLink />
                  {t("demo")}
                </button>
                {/* Code Button */}
                <button
                  onClick={() =>
                    data.linkCode
                      ? window.open(data.linkCode, "_blank")
                      : toast.error(t("codeNotAvailable") || "Code is not available") // Gunakan t() untuk pesan error jika ada
                  }
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-AlmostWhite/5 px-4 py-2 capitalize transition hover:bg-AlmostWhite/20"
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