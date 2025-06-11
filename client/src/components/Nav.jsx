import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useStore from "../store";
import axiosInstance from "../api/axiosInstance";
import { toast, Bounce } from "react-toastify";
const Nav = () => {
  const { setLogin, setuserLogout, Reload, setReload } = useStore();
  const navLinkClass = ({ isActive }) =>
    `hover:text-gray-700 ${
      isActive ? "text-red-500 font-bold" : "text-gray-500"
    }`;
  const logout = async () => {
    setReload(1);
    try {
      const res = await axiosInstance.post("/user/logout");
      setLogin(false);
      setuserLogout(1);
      toast.success("Logout Successful", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      // console.log(res.data)
    } catch (e) {
      toast.error("Logout unsuccessful", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setReload(0);
    }
  };
  // console.log(navLinkClass);
  const [icon, setIcon] = useState("fa-solid fa-angle-up");

  const changeIcon = () => {
    if (icon == "fa-solid fa-angle-up") {
      setIcon("fa-solid fa-angle-down");
    } else {
      setIcon("fa-solid fa-angle-up");
    }
  };
  const { theme, user } = useStore();
  return (
    <div
      data-theme={theme}
      className="w-full  h-[8vh] flex justify-between pl-4 pr-4 items-center bg-amber-100 samplebg"
    >
      <Link to="/" className="font-bold text-xl">
        <span className="text-2xl text-green-400">&lt;</span> Notiq{" "}
        <span className="text-2xl text-green-400">/&gt;</span>
      </Link>
      <ul className="flex space-x-3 items-center">
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
        <NavLink
          to="/signup"
          className={` ${navLinkClass} ${user ? "hidden" : ""}`}
        >
          SignUp
        </NavLink>
        <NavLink
          to="/signin"
          className={` ${navLinkClass} ${user ? "hidden" : ""}`}
        >
          Login
        </NavLink>
        <NavLink to="/settings" className={navLinkClass}>
          Settings
        </NavLink>
        <button
          onClick={logout}
          className={` ${!user ? "hidden" : ""} hover:font-bold px-2 py-1 bg-amber-700 rounded-2xl cursor-pointer hover:bg-amber-800 text-indigo-300`}
        >
          logout
        </button>
        <li className="flex flex-col items-center justify-center ">
          <img
            className="w-10 h-10 rounded-full"
            src="defaultPic.jpg"
            alt="default"
          />
          <div
           
            className={`${
              user ? "" : "hidden"
            } w-20 p-1 flex flex-col gap-2 items-center cursor-pointer`}
          >
            <p>
              {user?.name}{" "}
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
