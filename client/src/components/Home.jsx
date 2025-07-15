import React from "react";
import TypedComponent from "./TypedComponent";
import { Link } from "react-router";
import useStore from "../store";
function Home() {
  const { activeNav } = useStore();
  return (
    <div
      className={`grid lg:grid-cols-2 grid-rows-2 ${
        activeNav && "opacity-40 pointer-events-none"
      }  min-h-screen pb-10`}
    >
      <div className=" h-full ">
        <div className="  lg:w-[80%] lg:mx-auto mt-10 p-4">
          <h1 className="text-3xl text-green-600 font-black">
            Welcome to Notiq – Your Ultimate Note Management Solution !!
          </h1>
          <h3 className="lg:text-xl mt-10 italic opacity-55">
            Notiq is your all-in-one, easy-to-use platform designed to help you
            capture, organize, and manage your thoughts, tasks, and ideas in a
            way that works for you. Whether you’re a student, professional, or
            just someone who loves staying organized, QuickNotes is here to
            streamline your note-taking experience.
          </h3>
          <div className="text-red-500 font-bold  p-1 rounded-2xl mt-10">
            <TypedComponent />
          </div>
          <Link
            to="/createnote"
            className="bg-green-500 w-40 lg:w-40 cursor-pointer hover:bg-green-700 px-4 py-2 lg:px-5 lg:py-2 mt-8 rounded-2xl flex justify-center items-center gap-3 text-white font-bold"
          >
            Try Now <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </Link>
        </div>
      </div>
      <div className=" h-full">
        <img className=" m-5 mx-auto " src="home.png" />
      </div>
    </div>
  );
}

export default Home;
