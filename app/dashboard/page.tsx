"use client";
import { useState, useEffect } from 'react';
import { authStore } from "@/Store/authStore";
import { useRouter } from 'next/navigation';
import { toast } from '@/utils/toast';

interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthStore {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  signup: (data: any) => Promise<void>;
  login: (formData: any) => Promise<boolean>;
  logout: () => Promise<boolean>;
  checkAuth: () => Promise<void>;
}

interface Ad {
  _id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  location: string;
  images: string[];
}

interface AdFormData {
  title: string;
  description: string;
  price: string;
  category: string;
  location: string;
  breed: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  maxLife: string;
  contactNumber: string;
  vaccinated: boolean;
  kcpRegistered: boolean;
  suitableFor: string;
  images: File[];
}

export default function Dashboard() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const store = authStore() as AuthStore;
  const { authUser, isCheckingAuth, checkAuth } = store;
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [formData, setFormData] = useState<AdFormData>({
    title: '',
    description: '',
    price: '',
    category: '',
    location: '',
    breed: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    maxLife: '',
    contactNumber: '',
    vaccinated: false,
    kcpRegistered: false,
    suitableFor: '',
    images: []
  });

  // Check authentication on mount
  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
    };
    verifyAuth();
  }, [checkAuth]);

  // Fetch user's ads after auth check
  useEffect(() => {
    if (isCheckingAuth) return; // Still checking auth

    if (!authUser) {
      router.push('/login');
      return;
    }

    fetchUserAds();
  }, [authUser, isCheckingAuth, router]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, []);

  const fetchUserAds = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/ads/my-ads`, {
        credentials: 'include'
      });
      const data = await response.json();
      if (response.ok) {
        setAds(data.ads);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to fetch ads",
          variant: "error"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch ads",
        variant: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'images') {
        value.forEach((file: File) => {
          formDataToSend.append('images', file);
        });
      } else if (key === 'vaccinated' || key === 'kcpRegistered') {
        formDataToSend.append(key, value.toString());
      } else {
        formDataToSend.append(key, value as string);
      }
    });

    try {
      const response = await fetch(`http://localhost:8000/api/ads`, {
        method: 'POST',
        credentials: 'include',
        body: formDataToSend,
      });
      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: "Ad created successfully",
        });
        setShowModal(false);
        setFormData({
          title: '',
          description: '',
          price: '',
          category: '',
          location: '',
          breed: '',
          age: '',
          gender: '',
          weight: '',
          height: '',
          maxLife: '',
          contactNumber: '',
          vaccinated: false,
          kcpRegistered: false,
          suitableFor: '',
          images: []
        });
        setImagePreviews([]);
        fetchUserAds(); // Refresh the ads list
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to create ad",
          variant: "error"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create ad",
        variant: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        images: files
      }));
      
      // Create preview URLs
      const previews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImagePreviews(prev => {
      // Revoke the object URL to prevent memory leaks
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  if (isCheckingAuth || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#FFAC0D] border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {authUser?.name}! 👋
            </h1>
            <p className="text-gray-600">Manage your pet advertisements</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FFAC0D] to-[#FF8C00] hover:from-[#e69b0b] hover:to-[#e67e00] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Create New Ad
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-orange-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100">
                <svg className="w-6 h-6 text-[#FFAC0D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Ads</p>
                <p className="text-2xl font-bold text-gray-900">{ads.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-6 border border-green-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Ads</p>
                <p className="text-2xl font-bold text-gray-900">{ads.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-6 border border-blue-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{ads.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <div 
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-100 px-8 py-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Create New Advertisement</h2>
                    <p className="text-gray-600 mt-1">Fill in the details to post your pet ad</p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                        Pet Name *
                      </label>
                      <input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFAC0D] focus:border-transparent transition-all duration-200"
                        placeholder="e.g., Golden Retriever Puppy"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFAC0D] focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select a category</option>
                        <option value="dog">🐕 Dog</option>
                        <option value="cat">🐱 Cat</option>
                        <option value="small-pet">🐹 Small Pet</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="breed" className="block text-sm font-semibold text-gray-700 mb-2">
                        Breed *
                      </label>
                      <input
                        id="breed"
                        name="breed"
                        type="text"
                        value={formData.breed}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFAC0D] focus:border-transparent transition-all duration-200"
                        placeholder="e.g., Golden Retriever"
                      />
                    </div>

                    <div>
                      <label htmlFor="gender" className="block text-sm font-semibold text-gray-700 mb-2">
                        Gender *
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFAC0D] focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFAC0D] focus:border-transparent transition-all duration-200"
                    placeholder="Describe your pet's personality, health status, and any special requirements..."
                  />
                </div>

                {/* Physical Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Physical Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <label htmlFor="age" className="block text-sm font-semibold text-gray-700 mb-2">
                        Age (months) *
                      </label>
                      <input
                        id="age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                        min="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFAC0D] focus:border-transparent transition-all duration-200"
                        placeholder="Age in months"
                      />
                    </div>

                    <div>
                      <label htmlFor="weight" className="block text-sm font-semibold text-gray-700 mb-2">
                        Weight (kg) *
                      </label>
                      <input
                        id="weight"
                        name="weight"
                        type="number"
                        value={formData.weight}
                        onChange={handleInputChange}
                        required
                        min="0.1"
                        step="0.1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFAC0D] focus:border-transparent transition-all duration-200"
                        placeholder="Weight in kg"
                      />
                    </div>

                    <div>
                      <label htmlFor="height" className="block text-sm font-semibold text-gray-700 mb-2">
                        Height (cm) *
                      </label>
                      <input
                        id="height"
                        name="height"
                        type="number"
                        value={formData.height}
                        onChange={handleInputChange}
                        required
                        min="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFAC0D] focus:border-transparent transition-all duration-200"
                        placeholder="Height in cm"
                      />
                    </div>

                    <div>
                      <label htmlFor="maxLife" className="block text-sm font-semibold text-gray-700 mb-2">
                        Life Expectancy (years) *
                      </label>
                      <input
                        id="maxLife"
                        name="maxLife"
                        type="number"
                        value={formData.maxLife}
                        onChange={handleInputChange}
                        required
                        min="1"
                        max="30"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFAC0D] focus:border-transparent transition-all duration-200"
                        placeholder="Expected lifespan"
                      />
                    </div>
                  </div>
                </div>

                {/* Location and Contact */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Location & Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                        Location *
                      </label>
                      <input
                        id="location"
                        name="location"
                        type="text"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFAC0D] focus:border-transparent transition-all duration-200"
                        placeholder="City, State"
                      />
                    </div>

                    <div>
                      <label htmlFor="contactNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                        Contact Number *
                      </label>
                      <input
                        id="contactNumber"
                        name="contactNumber"
                        type="tel"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFAC0D] focus:border-transparent transition-all duration-200"
                        placeholder="Your contact number"
                      />
                    </div>
                  </div>
                </div>

                {/* Price and Additional Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Additional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                        Price (₹) *
                      </label>
                      <input
                        id="price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFAC0D] focus:border-transparent transition-all duration-200"
                        placeholder="Enter price"
                      />
                    </div>

                    <div>
                      <label htmlFor="suitableFor" className="block text-sm font-semibold text-gray-700 mb-2">
                        Suitable For
                      </label>
                      <input
                        id="suitableFor"
                        name="suitableFor"
                        type="text"
                        value={formData.suitableFor}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFAC0D] focus:border-transparent transition-all duration-200"
                        placeholder="e.g., Kids, Apartments, First-time owners (comma separated)"
                      />
                    </div>
                  </div>

                  {/* Health Status */}
                  <div className="mt-6">
                    <h4 className="text-md font-semibold text-gray-700 mb-3">Health Status</h4>
                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="vaccinated"
                          checked={formData.vaccinated}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-[#FFAC0D] bg-gray-100 border-gray-300 rounded focus:ring-[#FFAC0D] focus:ring-2"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700">Vaccinated</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="kcpRegistered"
                          checked={formData.kcpRegistered}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-[#FFAC0D] bg-gray-100 border-gray-300 rounded focus:ring-[#FFAC0D] focus:ring-2"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700">KCP Registered</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="images" className="block text-sm font-semibold text-gray-700 mb-2">
                    Pet Images *
                  </label>
                  
                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="mb-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        {imagePreviews.length} image{imagePreviews.length !== 1 ? 's' : ''} selected
                      </p>
                    </div>
                  )}
                  
                  <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-[#FFAC0D] transition-colors duration-200">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="images" className="relative cursor-pointer bg-white rounded-md font-medium text-[#FFAC0D] hover:text-[#e69b0b] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#FFAC0D]">
                          <span>{imagePreviews.length > 0 ? 'Add more photos' : 'Upload photos'}</span>
                          <input
                            id="images"
                            name="images"
                            type="file"
                            onChange={handleFileChange}
                            multiple
                            accept="image/*"
                            required={imagePreviews.length === 0}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#FFAC0D] to-[#FF8C00] hover:from-[#e69b0b] hover:to-[#e67e00] disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100 transition-all duration-200 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Ad...
                      </>
                    ) : (
                      'Create Advertisement'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Ads Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Advertisements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ads.map((ad: any, index) => (
              <div 
                key={ad._id} 
                className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  {ad.images && ad.images.length > 0 ? (
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={ad.images[0]}
                        alt={ad.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="bg-[#FFAC0D] text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {ad.category ? ad.category.charAt(0).toUpperCase() + ad.category.slice(1) : 'Pet'}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{ad.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{ad.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-[#FFAC0D] font-bold text-xl">
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                      ₹{Number(ad.price).toLocaleString()}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {ad.location}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gradient-to-r from-[#FFAC0D] to-[#FF8C00] hover:from-[#e69b0b] hover:to-[#e67e00] text-white py-2 px-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105">
                      Edit
                    </button>
                    <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {ads.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto w-32 h-32 bg-gradient-to-br from-[#FFAC0D] to-[#FF8C00] rounded-full flex items-center justify-center mb-8">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No advertisements yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start by creating your first pet advertisement. Share your furry friends with the community!
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FFAC0D] to-[#FF8C00] hover:from-[#e69b0b] hover:to-[#e67e00] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Create Your First Ad
            </button>
          </div>
        )}
      </div>
    </div>
  );
}