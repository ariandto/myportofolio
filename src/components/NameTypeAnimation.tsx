import React from "react";
import { TypeAnimation } from "react-type-animation";

const NameTypeAnimation: React.FC = () => {
  return (
    <TypeAnimation
      sequence={["Budi", 2000, "Ariyanto", 2000]}
      speed={40}
      repeat={Infinity}
    />
  );
};

export default NameTypeAnimation;
