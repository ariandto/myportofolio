import { useEffect, useCallback } from "react"; // Hapus 'React' karena tidak lagi diperlukan secara eksplisit sejak React 17+
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import axios from "axios";

// Komponen-komponen
import BackgroundPattern from "./components/BackgroundPattern";
import NameTypeAnimation from "./components/NameTypeAnimation";
import SkillList from "./components/SkillList";
import Links from "./components/Links";
import ChangeLanguage from "./components/ChangeLanguage";
import Footer from "./components/Footer";
import Projects from "./components/Projects";

// Daftarkan plugin GSAP sekali di level modul
gsap.registerPlugin(ScrollTrigger);

// Konstanta untuk URL API dan bahasa bisa membantu maintenance
const VISITOR_TRACKER_API_URL = "https://portfoliobackend-mv27ok25f-ridloghifarys-projects.vercel.app/api/track";
const LANGUAGES = {
  ENGLISH: "en",
  INDONESIAN: "id",
};

const App: React.FC = () => {
  const { t, i18n } = useTranslation();

  // Animasi GSAP untuk loading screen
  useGSAP(() => {
    gsap.from(".line", {
      scrollTrigger: {
        trigger: ".loading-screen", // Pertimbangkan untuk menggunakan ref jika elemen ini hanya ada di komponen ini
        scrub: true,
        pin: true,
        start: "top top",
        end: "+=100%",
      },
      scaleX: 0,
      transformOrigin: "left center",
      ease: "none",
    });
  }, []); // Tambahkan array dependensi kosong jika animasi tidak bergantung pada props/state lain

  // Fungsi untuk mengganti bahasa
  // Gunakan useCallback agar fungsi ini tidak dibuat ulang di setiap render kecuali dependensinya berubah
  // const handleChangeLanguage = useCallback(() => {
  //   const nextLanguage =
  //     i18n.language === LANGUAGES.ENGLISH
  //       ? LANGUAGES.INDONESIAN
  //       : LANGUAGES.ENGLISH;
  //   i18n.changeLanguage(nextLanguage);
  // }, [i18n]); // i18n adalah dependensi di sini

  // Efek untuk melacak pengunjung
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        await axios.get(VISITOR_TRACKER_API_URL);
        // Mungkin tambahkan logging sukses jika perlu di development
        // console.log("Visitor tracked successfully.");
      } catch (error) {
        // Menampilkan error yang lebih spesifik bisa membantu debugging
        if (axios.isAxiosError(error)) {
          console.error(
            "Error tracking visitor (AxiosError):",
            error.response?.data || error.message,
          );
        } else {
          console.error("Error tracking visitor (Unknown Error):", error);
        }
      }
    };

    trackVisitor();
  }, []); // Array dependensi kosong berarti ini hanya berjalan sekali saat komponen dimuat

  return (
    <main className="overflow-hidden bg-AlmostBlack text-AlmostWhite">
      <BackgroundPattern />
      {/* <ChangeLanguage handleChangeLanguage={handleChangeLanguage} currentLanguage={i18n.language} /> */}

      {/* Kontainer utama untuk konten */}
      <div className="mx-auto max-w-4xl px-4 lg:px-0 2xl:max-w-6xl">
        {/* Bagian Hero */}
        <section className="relative flex min-h-screen select-none flex-col items-start justify-center pt-20 md:items-start md:py-2 md:pt-0">
          {/* Judul besar dengan efek scramble (diasumsikan dari NameTypeAnimation atau AOS) */}
          <h1
            id="scramble" // Pastikan ID ini unik jika diperlukan untuk styling/scripting global
            data-aos="fade-down" // AOS untuk animasi
            data-aos-delay="100"
            className="Kalnia select-none text-7xl font-bold selection:bg-AlmostWhite selection:text-AlmostBlack md:text-9xl 2xl:text-[11rem]"
          >
            <span className="text-6xl">{t("greeting")}</span>
            <br />
            <NameTypeAnimation />
          </h1>

          {/* Bio dan Daftar Keahlian */}
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <p
              data-aos="fade-down"
              data-aos-delay="200"
              className="text-xs leading-7 selection:bg-AlmostWhite selection:text-AlmostBlack sm:text-sm md:text-base 2xl:text-lg"
            >
              {t("bio")}
            </p>
            <SkillList />
          </div>

          <Links />
        </section>

        {/* Elemen untuk animasi loading line GSAP */}
        <div className="loading-screen" aria-hidden="true"> {/* aria-hidden karena ini elemen visual murni */}
          <div className="line" />
        </div>

        {/* Bagian Proyek */}
        <Projects t={t} /> {/* Melewatkan fungsi 't' untuk translasi di dalam Projects */}
      </div>

      <Footer />
    </main>
  );
};

export default App;