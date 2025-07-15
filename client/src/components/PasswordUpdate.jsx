import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router";
import { toast, Bounce } from "react-toastify";
import useStore from "../store";

const PasswordUpdate = () => {
  const { theme } = useStore();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/user/updatePassword",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Update successful", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
        transition: Bounce,
      });
      go("/signin");
    } catch (error) {
      toast.error(error.response?.data.message || "Error occurred", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
        transition: Bounce,
      });
    }
  };

  // Theme-based styles
  const bgWrapper = theme === "dark" ? "bg-base-200" : "bg-gray-100";
  const formBg = theme === "dark" ? "bg-base-100 text-base-content" : "bg-white text-gray-800";
  const labelColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const inputStyle =
    theme === "dark"
      ? "bg-neutral text-white border-gray-600 focus:ring-blue-400"
      : "border focus:ring-blue-400";

  return (
    <div data-theme="dark" className={`flex items-center justify-center h-[84vh] ${bgWrapper}`}>
      <form
        onSubmit={handleSubmit}
        className={`p-8 rounded-2xl shadow-lg w-full max-w-md ${formBg}`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Update Password</h2>

        <div className="mb-4">
          <label className={`block text-sm font-medium mb-1 ${labelColor}`}>
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${inputStyle}`}
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
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${inputStyle}`}
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
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${inputStyle}`}
            placeholder="Enter the new password"
            required
          />
        </div>

        <button
          type="submit"
          className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default PasswordUpdate;
