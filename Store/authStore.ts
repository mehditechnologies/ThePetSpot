import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import toast from "react-hot-toast";

const Base_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

const jsonHeaders = { "Content-Type": "application/json" };

export const authStore = create(
  persist(
    (set) => ({
      isSigningUp: false,
      authUser: null,
      isLoggingIn: false,
      isUpdatingProfile: false,
      isCheckingAuth: true,
      isForgotPassword: false,
      isResetPassword: false,

      // ✅ Signup
      signup: async (data: any) => {
        set({ isSigningUp: true });
        try {
          const res = await axios.post(`${Base_URL}/api/users/register`, data, {
            withCredentials: true,
            headers: jsonHeaders,
          });
          set({ authUser: res.data.user });
          toast.success(res.data.message || "Signup successful");
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Signup failed");
        } finally {
          set({ isSigningUp: false });
        }
      },

      // ✅ Login
      login: async (formData: any) => {
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
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Login failed");
          return false;
        } finally {
          set({ isLoggingIn: false });
        }
      },

      // ✅ Logout
      logout: async () => {
        try {
          await axios.get(`${Base_URL}/api/users/logout`, {
            withCredentials: true,
          });
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
          // console.log("additional Api Call");
          set({ authUser: res.data.user });
        } catch (error) {
          if (axios.isAxiosError(error)) {
            set({ authUser: null });
          }
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      // ✅ Update user profile
      updateUser: async (formData: FormData) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axios.patch(`${Base_URL}/api/users/profile`, formData, {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          set({ authUser: res.data.user });
          toast.success(res.data.message || "Profile updated successfully");
          return true;
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Profile update failed");
          return false;
        } finally {
          set({ isUpdatingProfile: false });
        }
      },

      // ✅ Change password
      changePassword: async (data: { oldPassword: string; newPassword: string }) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axios.patch(`${Base_URL}/api/users/change-password`, data, {
            withCredentials: true,
            headers: jsonHeaders,
          });
          toast.success(res.data.message || "Password changed successfully");
          return true;
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Password change failed");
          return false;
        } finally {
          set({ isUpdatingProfile: false });
        }
      },

      // ✅ Forgot password
      forgotPassword: async (email: string) => {
        set({ isForgotPassword: true });
        try {
          const res = await axios.post(`${Base_URL}/api/users/forgot-password`, { email }, {
            headers: jsonHeaders,
          });
          toast.success(res.data.message || "OTP sent to your email");
          return true;
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Failed to send OTP");
          return false;
        } finally {
          set({ isForgotPassword: false });
        }
      },

      // ✅ Reset password
      resetPassword: async (data: { otp: string; newPassword: string }) => {
        set({ isResetPassword: true });
        try {
          const res = await axios.post(`${Base_URL}/api/users/reset-password`, data, {
            headers: jsonHeaders,
          });
          toast.success(res.data.message || "Password reset successful");
          return true;
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Password reset failed");
          return false;
        } finally {
          set({ isResetPassword: false });
        }
      },
    }),
    {
      name: "auth-storage", // persisted in localStorage
      partialize: (state: any) => ({ authUser: state.authUser }), // only persist authUser
    }
  )
);
