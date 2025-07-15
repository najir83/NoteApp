import React from "react";
import useStore from "../store";
const Settings = () => {
  const { theme, setTheme,activeNav } = useStore();
  return (
    <div
      className={`w-full  h-[84vh] ${
        activeNav && "opacity-40 pointer-events-none"
      } `}
    >
      <div className="container mx-auto flex justify-center  pt-10 gap-10 ">
        <p className="text-lg font-bold">Select Theme : </p>
        <button
          onClick={() => setTheme("light")}
          className={`${
            theme === "light" ? "bg-green-400" : "bg-amber-100 samplebg"
          } px-4 py-1 hover:font-semibold cursor-pointer rounded-2xl`}
        >
          Light
        </button>

        <button
          onClick={() => setTheme("dark")}
          className={`${
            theme === "dark" ? "bg-green-400" : "bg-amber-100 samplebg"
          } px-4 py-1 hover:font-semibold cursor-pointer rounded-2xl`}
        >
          Dark
        </button>
        <button
          onClick={() => setTheme("black")}
          className={`${
            theme === "black" ? "bg-green-400" : "bg-amber-100 samplebg"
          } px-4 py-1 hover:font-semibold cursor-pointer rounded-2xl`}
        >
          Black
        </button>
      </div>
    </div>
  );
};

export default Settings;
