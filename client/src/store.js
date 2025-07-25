// store.js
import { create } from "zustand";
import axiosInstance from "./api/axiosInstance";
const useStore = create((set, get) => ({
  theme: localStorage.getItem("note121-theme") || "dark",
  user: null,
  userLogin: false,
  isSignup: false,
  isLogining: false,
  isSubmitting: false,
  userLogout: true,
  Reload: false,
  activeNav: false,

  setTheme: (e) => {
    set({ theme: e });
      localStorage.setItem("note121-theme", e); 
  },
  setActiveNav: (e) => {
    set({ activeNav: e });
  },
  setUser: async () => {
    try {
      const res = await axiosInstance.get("user/");
      if (!res.data?.user) return false;

      if (JSON.stringify(res.data.user) === JSON.stringify(get().user))
        return true;

      set({ user: res.data.user });
      return true;
    } catch (e) {
      // console.log("error : ", e?.response?.data?.message || e.message);
    }
  },

  setUserData: (userData) => {
    set({ user: userData });
  },
  setSignup: (i) => {
    set({ isSignup: i });
  },
  setisLogining: (i) => {
    set({ isLogining: i });
  },
  setSubmitting: (i) => {
    set({ isSubmitting: i });
  },
  setLogin: (e) => {
    set({ userLogin: e });
  },
  setuserLogout: (e) => {
    set({ isLogouting: e });
  },
  setReload: (e) => {
    set({ Reload: e });
  },
}));

export default useStore;
