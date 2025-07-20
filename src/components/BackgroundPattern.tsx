const BackgroundPattern = () => {
  return (
    <>
      {/* SVG Hexagon Pattern */}
      <svg
        className="absolute inset-0 h-full w-full"
        style={{ zIndex: 0 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hexagon"
            width="36"
            height="41.57"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(1)"
          >
            <polygon
              points="18,0 36,10.39 36,31.18 18,41.57 0,31.18 0,10.39"
              fill="white"
              opacity="0.02"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagon)" />
      </svg>

      {/* Gradasi overlay agar tetap smooth */}
      <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black to-transparent z-10" />
    </>
  );
};

export default BackgroundPattern;
