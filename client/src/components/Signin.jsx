import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import useStore from "../store";
import Loading from "./Loading";
import { toast, Bounce } from "react-toastify";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const {
    setUserData,
    isLogining,
    isSubmitting,
    setisLogining,
    setLogin,
    theme,
  } = useStore();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLogining(true);
    try {
      const response = await axiosInstance.post("/user/signin", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setLogin(1);
      // console.log(response);
      toast.success("Login Successful", {
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
    } catch (error) {
      toast.error(error.response?.data.message || "Login failed", {
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
      console.error("Login error:", error.response?.data);
    } finally {
      setisLogining(false);
    }
  };

const bgWrapper = theme !== "dark" || "dark" ? "bg-base-200" : "bg-gray-100";
const formBg = theme === "dark" || "dark" ? "bg-base-100 text-base-content" : "bg-white text-gray-800";
const labelColor = theme === "dark" || "dark" ? "text-gray-300" : "text-gray-700";
const inputStyle =
  theme === "dark" || "dark"
    ? "bg-neutral text-white border-gray-600 focus:ring-blue-400"
    : "border focus:ring-blue-400";


  return isLogining ? (
    <Loading />
  ) : (
    <div data-theme="dark" className={`flex items-center justify-center h-[84vh] ${bgWrapper}`}>
      <form
        onSubmit={handleSubmit}
        className={`p-8 rounded-2xl shadow-lg w-full max-w-md ${formBg}`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className={`block text-sm font-medium mb-1 ${labelColor}`}>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${inputStyle}`}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <label className={`block text-sm font-medium mb-1 ${labelColor}`}>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${inputStyle}`}
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className={`mt-4 text-sm text-center ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          Forget password?{" "}
          <a href="/Passwordupdate" className="text-blue-500 hover:underline">
            UpdatePassword
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signin;
