import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const Base_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

interface AdState {
  isPosting: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
  postAd: (formData: FormData) => Promise<boolean>;
  deleteAd: (adId: string) => Promise<boolean>;
  updateAd: (adId: string, formData: FormData) => Promise<boolean>;
  getUserAds: () => Promise<any[]>;
}

export const useAdStore = create<AdState>((set, get) => ({
  isPosting: false,
  isDeleting: false,
  isUpdating: false,

  postAd: async (formData: FormData) => {
    set({ isPosting: true });
    try {
      const res = await axios.post(`${Base_URL}/api/ads`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(res.data.message || "Ad posted successfully");
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to post ad");
      } else {
        toast.error("Failed to post ad");
      }
      return false;
    } finally {
      set({ isPosting: false });
    }
  },

  deleteAd: async (adId) => {
    set({ isDeleting: true });
    try {
      const res = await axios.delete(`${Base_URL}/api/ads/${adId}`, {
        withCredentials: true,
      });
      toast.success(res.data.message || "Ad deleted successfully");
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to delete ad");
      } else {
        toast.error("Failed to delete ad");
      }
      return false;
    } finally {
      set({ isDeleting: false });
    }
  },

  updateAd: async (adId, formData) => {
    set({ isUpdating: true });
    try {
      const res = await axios.patch(`${Base_URL}/api/ads/${adId}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(res.data.message || "Ad updated successfully");
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to update ad");
      } else {
        toast.error("Failed to update ad");
      }
      return false;
    } finally {
      set({ isUpdating: false });
    }
  },

  getUserAds: async () => {
    try {
      const res = await axios.get(`${Base_URL}/api/ads/my-ads`, {
        withCredentials: true,
      });
      
      // Map backend field names to frontend field names
      const mappedAds = res.data.ads.map((ad: any) => ({
        ...ad,
        title: ad.name || ad.title, 
        location: ad.city || ad.location, // Backend uses 'city', frontend expects 'location'
        category: ad.type || ad.category, 
        // Ensure all optional fields exist
        breed: ad.breed || '',
        age: ad.age?.toString() || '',
        gender: ad.gender || '',
        weight: ad.weight?.toString() || '',
        height: ad.height?.toString() || '',
        maxLife: ad.maxLife?.toString() || '',
        contactNumber: ad.contactNumber || '',
        vaccinated: ad.vaccinated || false,
        kcpRegistered: ad.kcpRegistered || false,
        suitableFor: Array.isArray(ad.suitableFor) ? ad.suitableFor.join(', ') : (ad.suitableFor || ''),
        isApproved: ad.isApproved || 'pending',
      }));
      
      return mappedAds || [];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to fetch ads");
      } else {
        toast.error("Failed to fetch ads");
      }
      return [];
    }
  },
}));
