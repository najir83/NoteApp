import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useStore from "../store";
import axiosInstance from "../api/axiosInstance";
import { toast, Bounce } from "react-toastify";
const Nav = () => {
  const {
    setLogin,
    setuserLogout,
    Reload,
    setReload,
    setActiveNav,
    activeNav,
  } = useStore();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showNav, setShowNav] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [768]);

  // console.log(isMobile);
  const navLinkClass = ({ isActive }) =>
    ` ${
      isActive
        ? "text-red-500 font-bold "
        : "text-gray-500 navButton hover:font-bold hover:text-gray-700 "
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
      className="w-full  h-[10vh] flex justify-between px-4 lg:pl-14 lg:pr-14 items-center bg-amber-100 samplebg "
    >
      <Link to="/" className="font-bold text-xl">
        <span className="text-2xl text-green-400">&lt;</span> Notiq{" "}
        <span className="text-2xl text-green-400">/&gt;</span>
      </Link>
      {!isMobile && (
        <div className="flex justify-around text-lg   space-x-10">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/createnote" className={navLinkClass}>
            Notes
          </NavLink>
          <NavLink to="/settings" className={navLinkClass}>
            Settings
          </NavLink>
         
        
        </div>
      )}

      <ul className="flex space-x-3 items-center">
        {!isMobile && <> <NavLink
            to="/signup"
            className={`font-bold hover:font-black bg-gray-900 p-4 py-3 cursor-pointer ${user ? "hidden" : ""}`}
          >
            SignUp
          </NavLink>
          <NavLink
            to="/signin"
            className={` font-bold hover:font-black bg-gray-900 p-4 py-3  cursor-pointer  ${user ? "hidden" : ""}`}
          >
            Login
          </NavLink>

           {user && <button
            onClick={logout}
            className={` ${
              !user ? "hidden" : ""
              }font-bold hover:font-black bg-gray-900 px-6  cursor-pointer py-3  navv`}
              >
            logout
          </button>
}
          </>}
        <li className="flex items-center justify-center gap-2 ">
          <div className="flex flex-col  items-center justify-center text-sm">
          
          <img
            className="w-10 h-10 rounded-full"
            src="defaultPic.jpg"
            alt="default"
            />
          <div
            className={`${
              user ? "" : "hidden"
            } w-full p-2 flex flex-col gap-2 items-center cursor-pointer `}
            >
            <p>{user?.name} </p>
          </div>
            </div>

          {isMobile && (
            <button
              onClick={() => {
                setActiveNav(!activeNav);
                setShowNav(!showNav);
              }}
              className={`fa-solid text-lg  fa-angle-${
                showNav ? "down" : "up"
              }`}
            ></button>
          )}
        </li>
      </ul>
      {isMobile && showNav && (
        <div onClick={()=>{
           setActiveNav(!activeNav);
          setShowNav(!showNav)}} className="flex flex-col w-70 h-75 rounded-b-xl right-3 p-4 items-center top-16 bg-slate-200 z-10  absolute gap-6  mobNav ">
          <div
            className={`${
              user ? "" : "hidden"
            } w-full p-2 flex flex-col gap-2 items-center cursor-pointer border-b-1`}
          >
            <p>{user?.name} </p>
          </div>
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/createnote" className={navLinkClass}>
            Notes
          </NavLink>
          <NavLink to="/settings" className={navLinkClass}>
            Settings
          </NavLink>
         <NavLink
            to="/signup"
            className={`font-bold w-30 text-center hover:font-black bg-gray-900 p-4 py-3 ${user ? "hidden" : ""}`}
          >
            SignUp
          </NavLink>
          <NavLink
            to="/signin"
            className={` font-bold w-30 text-center hover:font-black bg-gray-900 p-4 py-3   ${user ? "hidden" : ""}`}
          >
            Login
          </NavLink>
          <button
            onClick={logout}
            className={` ${
              !user ? "hidden" : ""
            } hover:font-bold px-8 py-2  bg-amber-700 rounded-2xl cursor-pointer  hover:bg-amber-800 text-white`}
          >
            logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Nav;
