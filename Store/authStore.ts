import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import toast from "react-hot-toast";

interface AuthUser {
  name?: string;
  userName?: string;
  // Add other user properties as needed
}

interface LoginFormData {
  email: string;
  password: string;
}

interface AuthState {
  isSigningUp: boolean;
  authUser: AuthUser | null;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  signup: (data: any) => Promise<void>;
  login: (formData: LoginFormData) => Promise<boolean>;
  logout: () => Promise<boolean>;
  checkAuth: () => Promise<void>;
}

const Base_URL = "https://pet-spot-backend.vercel.app";
const jsonHeaders = { "Content-Type": "application/json" };

export const authStore = create<AuthState>()(
  persist(
    (set) => ({
      isSigningUp: false,
      authUser: null,
      isLoggingIn: false,
      isUpdatingProfile: false,
      isCheckingAuth: true,

      // ✅ Signup
      signup: async (data: LoginFormData) => {
        set({ isSigningUp: true });
        try {
          const res = await axios.post(`${Base_URL}/api/users/register`, data, {
            withCredentials: true,
            headers: jsonHeaders,
          });
          set({ authUser: res.data.user });
          toast.success(res.data.message || "Signup successful");
        } catch (error) {
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message || "Signup failed");
          } else {
            toast.error("Signup failed");
          }
        } finally {
          set({ isSigningUp: false });
        }
      },

      // ✅ Login
      login: async (formData: LoginFormData) => {
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
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message || "Login failed");
          } else {
            toast.error("Login failed");
          }
          return false;
        } finally {
          set({ isLoggingIn: false });
        }
      },

      // ✅ Logout
      logout: async () => {
        try {
          await axios.get(`${Base_URL}/api/users/logout`);
          console.log("api Called");
          set({ authUser: null });
          toast.success("Logged out successfully");
          return true;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error("Logout error:", error);
            toast.error("Logout failed");
          } else {
            toast.error("Logout failed");
          }
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
          if (axios.isAxiosError(error)) {
            set({ authUser: null });
          }
        } finally {
          set({ isCheckingAuth: false });
        }
      },
    }),
    {
      name: "auth-storage", // persisted in localStorage
      partialize: (state: AuthState) => ({ authUser: state.authUser }), // only persist authUser
    }
  )
);
