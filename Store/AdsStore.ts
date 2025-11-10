import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const Base_URL = "https://pet-spot-backend.vercel.app";

interface AdData {
  price: number;
  name: string;
  description: string;
  city: string;
  contactNumber: string;
  type: string;
  breed: string;
  images: string[];
  age: number;
  gender: string;
  weight: number;
  height: number;
  maxLife: number;
  vaccinated: boolean;
  kcpRegistered: boolean;
  suitableFor: string[];
  isAvailable: boolean;
}

interface AdState {
  isPosting: boolean;
  postAd: (data: AdData) => Promise<void>;
}

const jsonHeaders = {
  "Content-Type": "application/json",
};

export const useAdStore = create<AdState>((set) => ({
  isPosting: false,

  postAd: async (data) => {
    set({ isPosting: true });
    try {
      const res = await axios.post(`${Base_URL}/api/ads`, data, {
        withCredentials: true,
        // headers: jsonHeaders,
      });
      toast.success(res.data.message || "Ad posted successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to post ad");
      } else {
        toast.error("Failed to post ad");
      }
    } finally {
      set({ isPosting: false });
    }
  },
}));
