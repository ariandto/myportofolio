import React from "react";

const DownloadCV: React.FC = () => {
  return (
    <div className="flex items-center gap-4 text-white mb-6 ml-4">
      {/* Title */}
      {/* <p className="mb-2 text-sm font-semibold text-white/80 tracking-wide">
        Download My CV
      </p> */}

      {/* Download Button */}
      <a
        href="/cv-budi-ariyanto.pdf" // Ganti dengan URL CV kamu
        download
        className="inline-block rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
      >
        📄 Download CV (PDF)
      </a>
    </div>
  );
};

export default DownloadCV;
