import React from "react";
import { Link } from "react-router-dom";

const Links: React.FC = () => {
  return (
    <ul
      data-aos="fade-left"
      className="absolute right-0 top-0 mt-3 flex w-full flex-col items-center gap-5 py-4 z-10 selection:bg-AlmostWhite selection:text-AlmostBlack lg:-right-28 lg:bottom-[100px] lg:top-auto lg:mt-0 lg:h-full lg:w-fit lg:translate-x-0 lg:flex-col lg:justify-end lg:gap-14"
    >
      <li className="h-fit w-fit text-center text-xs hover:underline sm:text-xs md:text-base lg:rotate-90">
        <Link to={"https://github.com/ariandto/"} target="_blank">
          Github
        </Link>
      </li>
      <li className="h-fit w-fit text-center text-xs hover:underline sm:text-xs md:text-base lg:rotate-90">
        <Link
          to={"https://www.linkedin.com/in/budi-ariyanto-7a4564199/"}
          target="_blank"
        >
          LinkedIn
        </Link>
      </li>
    </ul>
  );
};

export default Links;
