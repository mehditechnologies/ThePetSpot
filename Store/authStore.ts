import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import toast from "react-hot-toast";

const Base_URL = "https://pet-spot-backend.vercel.app";
const jsonHeaders = { "Content-Type": "application/json" };

export const authStore = create(
  persist(
    (set, get) => ({
      isSigningUp: false,
      authUser: null,
      isLoggingIn: false,
      isUpdatingProfile: false,
      isCheckingAuth: true,

      // ✅ Signup
      signup: async (data) => {
        set({ isSigningUp: true });
        try {
          const res = await axios.post(`${Base_URL}/api/users/register`, data, {
            withCredentials: true,
            headers: jsonHeaders,
          });
          set({ authUser: res.data.user });
          toast.success(res.data.message || "Signup successful");
        } catch (error) {
          toast.error(error.response?.data?.message || "Signup failed");
        } finally {
          set({ isSigningUp: false });
        }
      },

      // ✅ Login
      login: async (formData) => {
        set({ isLoggingIn: true });
        try {
          const res = await axios.post(
            `${Base_URL}/api/users/login`,
            formData,
            {
              withCredentials: true,
              headers: jsonHeaders,
            }
          );
          set({ authUser: res.data.user });
          toast.success(
            `Welcome back, ${res.data.user.name || res.data.user.userName}!`
          );
          return true;
        } catch (error) {
          toast.error(error.response?.data?.message || "Login failed");
          return false;
        } finally {
          set({ isLoggingIn: false });
        }
      },

      // ✅ Logout
      logout: async () => {
        try {
          await axios.post(`${Base_URL}/api/users/logout`, {
            withCredentials: true,
            headers: jsonHeaders,
          });
          console.log("api Called");
          set({ authUser: null });
          toast.success("Logged out successfully");
          return true;
        } catch (error) {
          console.error("Logout error:", error);
          toast.error("Logout failed");
          return false;
        }
      },

      // ✅ Check auth on page load
      checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
          const res = await axios.get(`${Base_URL}/api/users/me`, {
            withCredentials: true,
          });
          console.log("additional Api Call");
          set({ authUser: res.data.user });
        } catch (error) {
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },
    }),
    {
      name: "auth-storage", // persisted in localStorage
      partialize: (state) => ({ authUser: state.authUser }), // only persist authUser
    }
  )
);
