"use client";
import Image from "next/image";
import BlogSidebar from "../BlogSidebar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { dogsBlogData } from "@/Data/dogsData";
export default function DogsCareMainSection() {
  const [index, setIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const IMAGES = [
    "https://images.unsplash.com/photo-1558788353-f76d92427f16",
    "https://images.unsplash.com/photo-1560807707-8cc77767d783",
    "https://images.unsplash.com/photo-1596495577886-d920f1fb7238",
  ];

  const nextSlide = () => setIndex((prev) => (prev + 1) % IMAGES.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);

  // PAGINATION LOGIC
  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(dogsBlogData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBlogs = dogsBlogData.slice(startIndex, endIndex);

  return (
    <section className="max-w-6xl mx-auto py-10 flex flex-col lg:flex-row gap-10">
      {/* LEFT: Main Blog Area */}
      <div className="w-full lg:w-2/3">
        {/* Featured blog slider */}
        <div className="relative mb-8">
          <div className="relative w-full h-[350px] overflow-hidden rounded-md shadow">
            <button
              onClick={prevSlide}
              aria-label="Previous"
              className="absolute left-2 top-1/2 z-10 bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-md"
            >
              <FaArrowLeft />
            </button>

            <img
              src={IMAGES[index]}
              alt="Featured Dog"
              className="w-full h-full object-cover transition-all duration-500 ease-in-out"
            />

            <button
              onClick={nextSlide}
              aria-label="Next"
              className="absolute right-2 top-1/2 z-10 bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-md"
            >
              <FaArrowRight />
            </button>
          </div>

          {/* Overlay text */}
          <div className="absolute bottom-4 left-4 text-white">
            <span className="bg-yellow-500 text-xs px-2 py-1 rounded">
              Dog Care
            </span>
            <h2 className="text-xl font-semibold mt-2">
              Winter Care Tips For Dogs
            </h2>
            <p className="text-sm">By Debopriya Ghosh | October 2025</p>
          </div>
        </div>

        <div className="bg-[#018F98] block w-full text-white text-lg font-semibold px-4 py-2 rounded-md w-fit mb-5">
          Dog Care
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-3">
          {currentBlogs.map((blog, i) => (
            <div
              key={i}
              className="overflow-hidden shadow-sm bg-white rounded-md"
            >
              <div className="relative w-full h-48">
                <Image
                  src={blog.img}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-xs text-[#018F98] font-medium">
                  {blog.category}
                </p>
                <h3 className="font-semibold text-sm hover:text-[#018F98] cursor-pointer">
                  {blog.title}
                </h3>
                <p className="text-xs text-gray-600 mt-1">{blog.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm font-medium rounded transition-all ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-[#E0F7F8] text-[#018F98] hover:bg-[#C9F0F2]"
              }`}
            >
              Previous Page
            </button>

            <div className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className={`px-4 py-2 text-sm font-medium rounded transition-all ${
                currentPage >= totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-[#E0F7F8] text-[#018F98] hover:bg-[#C9F0F2]"
              }`}
            >
              Next Page
            </button>
          </div>
        )}
      </div>

      {/* RIGHT: Sidebar */}
      <div className="w-full lg:w-1/3">
        <div className="lg:sticky lg:top-24">
          <BlogSidebar />
        </div>
      </div>
    </section>
  );
}
