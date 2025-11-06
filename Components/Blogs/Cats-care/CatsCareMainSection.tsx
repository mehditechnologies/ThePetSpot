"use client";
import Image from "next/image";
import BlogSidebar from "../BlogSidebar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";

export default function CatsCareMainSection() {
  const [index, setIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const IMAGES = [
    "https://images.unsplash.com/photo-1574158622682-e40e69881006",
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
    "https://images.unsplash.com/photo-1601758174888-3729b23d23e3",
  ];

  const nextSlide = () => setIndex((prev) => (prev + 1) % IMAGES.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);

  const blogs = [
    {
      title: "Winter Food Guide for Cats: Keep Your Feline Warm and Well-Fed",
      img: "https://images.unsplash.com/photo-1574158622682-e40e69881006",
      category: "Cat Care",
      desc: "Help your cat stay cozy and healthy during cold weather.",
    },
    {
      title:
        "12 Winter Care Tips for Cats: Keeping Them Warm, Cozy and Comfortable",
      img: "https://images.unsplash.com/photo-1618828665341-7a5b14aeb0a2",
      category: "Cat Care",
      desc: "Everything you need to know for safe and happy winter cats.",
    },
    {
      title: "Winter Grooming for Cats: Why It Matters More Than You Think",
      img: "https://images.unsplash.com/photo-1607551735704-9d3cd0fbb94f",
      category: "Cat Care",
      desc: "Keep your feline’s coat healthy with simple winter grooming tips.",
    },
    {
      title: "Best Indoor Games for Cats During Cold Days",
      img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
      category: "Cat Lifestyle",
      desc: "Fun and engaging activities to keep your cat active indoors.",
    },
    {
      title: "How to Keep Cats Warm During Freezing Nights",
      img: "https://images.unsplash.com/photo-1618828665341-7a5b14aeb0a2",
      category: "Cat Health",
      desc: "Warm bedding ideas and safe heating tips for cat owners.",
    },
    {
      title: "Why Cats Sleep More in Winter: Expert Insights",
      img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
      category: "Cat Behavior",
      desc: "Understand your cat’s sleeping habits during the winter season.",
    },
    {
      title: "Winter Food Guide for Cats: Keep Your Feline Warm and Well-Fed",
      img: "https://images.unsplash.com/photo-1574158622682-e40e69881006",
      category: "Cat Care",
      desc: "Help your cat stay cozy and healthy during cold weather.",
    },
    {
      title:
        "12 Winter Care Tips for Cats: Keeping Them Warm, Cozy and Comfortable",
      img: "https://images.unsplash.com/photo-1618828665341-7a5b14aeb0a2",
      category: "Cat Care",
      desc: "Everything you need to know for safe and happy winter cats.",
    },
    {
      title: "Winter Grooming for Cats: Why It Matters More Than You Think",
      img: "https://images.unsplash.com/photo-1607551735704-9d3cd0fbb94f",
      category: "Cat Care",
      desc: "Keep your feline’s coat healthy with simple winter grooming tips.",
    },
    {
      title: "Best Indoor Games for Cats During Cold Days",
      img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
      category: "Cat Lifestyle",
      desc: "Fun and engaging activities to keep your cat active indoors.",
    },
    {
      title: "How to Keep Cats Warm During Freezing Nights",
      img: "https://images.unsplash.com/photo-1618828665341-7a5b14aeb0a2",
      category: "Cat Health",
      desc: "Warm bedding ideas and safe heating tips for cat owners.",
    },
    {
      title: "Winter Food Guide for Cats: Keep Your Feline Warm and Well-Fed",
      img: "https://images.unsplash.com/photo-1574158622682-e40e69881006",
      category: "Cat Care",
      desc: "Help your cat stay cozy and healthy during cold weather.",
    },
    {
      title:
        "12 Winter Care Tips for Cats: Keeping Them Warm, Cozy and Comfortable",
      img: "https://images.unsplash.com/photo-1618828665341-7a5b14aeb0a2",
      category: "Cat Care",
      desc: "Everything you need to know for safe and happy winter cats.",
    },
    {
      title: "Winter Grooming for Cats: Why It Matters More Than You Think",
      img: "https://images.unsplash.com/photo-1607551735704-9d3cd0fbb94f",
      category: "Cat Care",
      desc: "Keep your feline’s coat healthy with simple winter grooming tips.",
    },
    {
      title: "Best Indoor Games for Cats During Cold Days",
      img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
      category: "Cat Lifestyle",
      desc: "Fun and engaging activities to keep your cat active indoors.",
    },
    {
      title: "How to Keep Cats Warm During Freezing Nights",
      img: "https://images.unsplash.com/photo-1618828665341-7a5b14aeb0a2",
      category: "Cat Health",
      desc: "Warm bedding ideas and safe heating tips for cat owners.",
    },
    {
      title: "Winter Food Guide for Cats: Keep Your Feline Warm and Well-Fed",
      img: "https://images.unsplash.com/photo-1574158622682-e40e69881006",
      category: "Cat Care",
      desc: "Help your cat stay cozy and healthy during cold weather.",
    },
    {
      title:
        "12 Winter Care Tips for Cats: Keeping Them Warm, Cozy and Comfortable",
      img: "https://images.unsplash.com/photo-1618828665341-7a5b14aeb0a2",
      category: "Cat Care",
      desc: "Everything you need to know for safe and happy winter cats.",
    },
    {
      title: "Winter Grooming for Cats: Why It Matters More Than You Think",
      img: "https://images.unsplash.com/photo-1607551735704-9d3cd0fbb94f",
      category: "Cat Care",
      desc: "Keep your feline’s coat healthy with simple winter grooming tips.",
    },
    {
      title: "Best Indoor Games for Cats During Cold Days",
      img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
      category: "Cat Lifestyle",
      desc: "Fun and engaging activities to keep your cat active indoors.",
    },
    {
      title: "How to Keep Cats Warm During Freezing Nights",
      img: "https://images.unsplash.com/photo-1618828665341-7a5b14aeb0a2",
      category: "Cat Health",
      desc: "Warm bedding ideas and safe heating tips for cat owners.",
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
          <div className="relative w-full h-[350px] overflow-hidden rounded-md shadow ">
            <button
              onClick={prevSlide}
              aria-label="Previous"
              className="absolute left-2 top-1/2 z-10 bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-md"
            >
              <FaArrowLeft />
            </button>

            <img
              src={IMAGES[index]}
              alt="Featured"
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
              Cat Care
            </span>
            <h2 className="text-xl font-semibold mt-2">
              Winter Food Guide For Cats
            </h2>
            <p className="text-sm">By Debopriya Ghosh | October 2025</p>
          </div>
        </div>

        <div className="bg-[#018F98] block w-full text-white text-lg font-semibold px-4 py-2 rounded-md w-fit mb-5">
          Cat Care
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
