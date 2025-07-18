import React from "react";

const Links: React.FC = () => {
  return (
    <ul className="flex items-center gap-4 text-white">
      {/* GitHub */}
      <li>
        <a
          href="https://github.com/ariandto"
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-gray-300"
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
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
          className="transition hover:text-blue-400"
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.45 20.45h-3.6v-5.6..." />
          </svg>
        </a>
      </li>
    </ul>
  );
};

export default Links;
