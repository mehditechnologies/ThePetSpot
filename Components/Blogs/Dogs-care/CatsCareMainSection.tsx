"use client";
import Image from "next/image";
import BlogSidebar from "../BlogSidebar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";

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

  const blogs = [
    {
      title: "Winter Care for Dogs: Keep Your Pup Warm and Healthy",
      img: "https://images.unsplash.com/photo-1619983081563-430f63602796",
      category: "Dog Care",
      desc: "Learn how to protect your dog from the cold and ensure their comfort during winter.",
    },
    {
      title:
        "Essential Winter Foods for Dogs: Nutrition Tips for the Cold Season",
      img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
      category: "Dog Health",
      desc: "Discover nutritious winter foods to keep your dog energetic and healthy.",
    },
    {
      title: "Dog Grooming in Winter: Avoid Common Mistakes",
      img: "https://images.unsplash.com/photo-1601758123927-1965c88c9b92",
      category: "Dog Grooming",
      desc: "Find out how to manage your dog's coat during winter for comfort and hygiene.",
    },
    {
      title: "Indoor Games for Dogs: Keep Them Active When It’s Cold Outside",
      img: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
      category: "Dog Lifestyle",
      desc: "Fun and safe ways to keep your dog entertained indoors during freezing days.",
    },
    {
      title: "Dog Behavior Changes in Winter: What to Watch For",
      img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
      category: "Dog Behavior",
      desc: "Understand why dogs may act differently in colder months and how to help them adjust.",
    },
    {
      title: "How to Protect Your Dog’s Paws from Ice and Snow",
      img: "https://images.unsplash.com/photo-1601758062853-0a84b1f3d6f3",
      category: "Dog Health",
      desc: "Tips to protect your dog’s paws from harsh winter conditions and frostbite.",
    },
    {
      title: "Winter Jackets for Dogs: Do They Really Need One?",
      img: "https://images.unsplash.com/photo-1619983081563-430f63602796",
      category: "Dog Lifestyle",
      desc: "Find out when your dog might benefit from extra layers and how to pick the right one.",
    },
    {
      title: "Bathing Dogs in Cold Weather: Dos and Don’ts",
      img: "https://images.unsplash.com/photo-1601758174902-76f5c03b5b1e",
      category: "Dog Grooming",
      desc: "Learn the right way to bathe your dog safely in winter without making them sick.",
    },
    {
      title: "Understanding Your Dog’s Winter Sleep Patterns",
      img: "https://images.unsplash.com/photo-1560807707-8cc77767d783",
      category: "Dog Behavior",
      desc: "Dogs tend to sleep more in winter — here’s why and how to ensure healthy rest.",
    },
    {
      title: "Winter Exercise Tips for Dogs: Keep Them Fit and Safe",
      img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d",
      category: "Dog Fitness",
      desc: "Cold weather shouldn’t stop playtime — here’s how to keep walks fun and safe.",
    },
    {
      title: "Common Winter Illnesses in Dogs and How to Prevent Them",
      img: "https://images.unsplash.com/photo-1601758174888-3729b23d23e3",
      category: "Dog Health",
      desc: "Recognize early signs of seasonal sickness and keep your dog healthy year-round.",
    },
    {
      title: "Homemade Dog Treats: Cozy Winter Recipes",
      img: "https://images.unsplash.com/photo-1557976608-6d16d7a6d5b4",
      category: "Dog Food",
      desc: "Warm, homemade treats to make your furry friend’s winter even more special.",
    },
  ];

  // PAGINATION LOGIC
  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBlogs = blogs.slice(startIndex, endIndex);

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
