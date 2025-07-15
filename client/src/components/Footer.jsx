import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full  h-[8vh] flex flex-row pl-4 pr-4 justify-between bottom-0 fixed items-center flex-col bg-amber-100 samplebg">
       <div className="flex items-center gap-1 text-sm md:text-base">
        Code By
        <span className="ml-1 flex items-center">
          <span className="text-2xl text-[#7AE2CF]">&lt;</span>
          Najir
          <span className="text-2xl text-[#7AE2CF]">/&gt;</span>
        </span>
      </div>

      <div className="flex gap-4 text-white">
        <a
          href="https://github.com/najir83/NoteApp"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300  fott transition"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/sk-najir-0b0177285/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-300 text-white font-black fott transition"
        >
          <FaLinkedin size={24} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
