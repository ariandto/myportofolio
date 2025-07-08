// src/components/ImageSlider.tsx
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface ImageSliderProps {
  images: string[];
  alt: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, alt }) => {
  const [idx, setIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const delay = 4000; // 4 detik auto-slide
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const next = () => {
    setIdx((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    resetTimeout();
    if (isPlaying) {
      timeoutRef.current = setTimeout(() => {
        next();
      }, delay);
    }

    return () => resetTimeout();
  }, [idx, isPlaying]);

  return (
    <div className="relative overflow-hidden rounded-lg group">
      <img
        src={images[idx]}
        alt={`${alt} - Slide ${idx + 1}`}
        className="h-[300px] w-full object-cover transition-opacity duration-500"
      />

      {/* Tombol kontrol manual */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-opacity opacity-0 group-hover:opacity-100"
        aria-label="Previous"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={next}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-opacity opacity-0 group-hover:opacity-100"
        aria-label="Next"
      >
        <ChevronRight />
      </button>

      {/* Tombol pause/play */}
      <button
        onClick={() => setIsPlaying((prev) => !prev)}
        className="absolute bottom-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>

      {/* Indikator bulat di bawah */}
      <div className="absolute bottom-2 left-2 flex gap-1">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full ${
              i === idx ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
