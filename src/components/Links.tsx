import React from "react";

const Links: React.FC = () => {
  return (
    <ul
      data-aos="fade-left"
      className="absolute right-[0%] top-0 mt-3 flex w-full items-center gap-5 selection:bg-AlmostWhite selection:text-AlmostBlack lg:-right-28 lg:bottom-[100px] lg:top-auto lg:mt-0 lg:h-full lg:w-fit lg:translate-x-0 lg:flex-col lg:justify-end lg:gap-14"
    >
      {/* GitHub */}
      <li className="h-fit w-fit text-center text-xs sm:text-xs md:text-base lg:rotate-90">
        <a
          href="https://github.com/ariandto"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline"
        >
          <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
            <path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.2.8-.5v-2c-3.4.7-4.2-1.6-4.2-1.6-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.5 2.3 1 2.8.8.1-.6.4-1 .7-1.3-2.7-.3-5.6-1.4-5.6-6a4.7 4.7 0 011.3-3.3 4.3 4.3 0 01.1-3.2s1-.3 3.3 1.2a11.2 11.2 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.2.8.2 1.6.1 2.3a4.7 4.7 0 011.3 3.3c0 4.6-2.9 5.7-5.6 6 .4.3.7.9.7 1.8v2.7c0 .3.2.6.8.5A12 12 0 0012 .3" />
          </svg>
        </a>
      </li>
      {/* LinkedIn */}
      <li className="h-fit w-fit text-center text-xs sm:text-xs md:text-base lg:rotate-90">
        <a
          href="https://www.linkedin.com/in/budi-ariyanto-7a4564199/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline"
        >
          <svg className="w-5 h-5 fill-current text-blue-700" viewBox="0 0 24 24">
            <path d="M20.45 20.45h-3.6v-5.6c0-1.34-.02-3.07-1.87-3.07-1.88 0-2.17 1.46-2.17 2.96v5.7H9.21V9h3.45v1.56h.05c.48-.91 1.66-1.87 3.42-1.87 3.66 0 4.33 2.41 4.33 5.55v6.21zM5.34 7.43a2.07 2.07 0 01-2.07-2.08c0-1.15.93-2.08 2.07-2.08 1.15 0 2.08.93 2.08 2.08a2.07 2.07 0 01-2.08 2.08zm1.8 13.02H3.53V9h3.6v11.45zM22.22 0H1.78A1.77 1.77 0 000 1.77v20.45C0 23.37.63 24 1.77 24h20.45c1.14 0 1.77-.63 1.77-1.78V1.78A1.77 1.77 0 0022.23 0z" />
          </svg>
        </a>
      </li>
    </ul>
  );
};

export default Links;
