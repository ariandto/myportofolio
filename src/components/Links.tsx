import React from "react";

const Links: React.FC = () => {
  return (
    <ul
      data-aos="fade-left"
      className="
        hidden lg:flex lg:flex-col lg:gap-6
        lg:fixed lg:right-6 lg:bottom-6
        z-50
      "
    >
      {/* GitHub */}
      <li>
        <a
          href="https://github.com/ariandto"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .3a12 12 0 00-3.8 23.4c..." />
          </svg>
        </a>
      </li>

      {/* LinkedIn */}
      <li>
        <a
          href="https://www.linkedin.com/in/budi-ariyanto-7a4564199/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-400 transition"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.45 20.45h-3.6v-5.6..." />
          </svg>
        </a>
      </li>
    </ul>
  );
};

export default Links;
