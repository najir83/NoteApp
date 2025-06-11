import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import Loading from "./Loading";
import useStore from "../store";
import { useNavigate } from "react-router";
import { toast, Bounce } from "react-toastify";

const Signup = () => {
  const {
    user,
    isSignup,
    isSubitting,
    setSignup,
    setSubmitting,
    theme,
  } = useStore();

  const go = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {}, [isSignup]);

  const handleSubmit = async (e) => {
    setSignup(true);
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "/user/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      go("/signin");
      toast.success("Signup Successful", {
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
      // console.log("Signup success:", response.data);
    } catch (error) {
      toast.error(error.response?.data.message || "Signup failed", {
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
      console.error("Signup error:", error.response?.data || error.message);
    } finally {
      setSignup(false);
    }
  };
const wrapperBg = theme === "dark" || "dark" ? "bg-base-200" : "bg-gray-100";
const formBg = theme === "dark" || "dark" ? "bg-base-100 text-base-content" : "bg-white text-gray-800";
const labelColor = theme === "dark" || "dark" ? "text-gray-300" : "text-gray-700";
const inputStyle = theme === "dark" || "dark"
  ? "bg-neutral text-white border-gray-600 focus:ring-blue-400"
  : "border focus:ring-blue-400";
const noteText = theme === "dark" || "dark" ? "text-gray-400" : "text-gray-600";

  return isSignup ? (
    <Loading />
  ) : (
    <div className={`flex items-center justify-center h-[84vh] ${wrapperBg}`}>
      <form
        onSubmit={handleSubmit}
        className={`p-8 rounded-2xl shadow-lg w-full max-w-md ${formBg}`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <div className="mb-4">
          <label className={`block text-sm font-medium mb-1 ${labelColor}`}>
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${inputStyle}`}
            placeholder="Enter your name"
            required
          />
        </div>

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
          Create Account
        </button>

        <p className={`mt-4 text-sm text-center ${noteText}`}>
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
