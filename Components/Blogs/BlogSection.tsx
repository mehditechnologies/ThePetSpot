"use client";
import Image from "next/image";
import BlogSidebar from "./BlogSidebar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";

export default function BlogSection() {
  const [index, setIndex] = useState(0);

  const images = [
    "/customers/dog1.webp",
    "/customers/dog2.webp",
    "/customers/dog4.webp",
  ];

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  const blogs = [
    {
      title: "Winter Grooming Guide for Dogs",
      img: "https://images.unsplash.com/photo-1601758123927-196ed1a50d8b",
      category: "Dog Care",
      desc: "How often should you bathe your dog in cold weather?",
    },
    {
      title: "Common Winter Illnesses in Dogs",
      img: "https://images.unsplash.com/photo-1558944351-cd33b869ad5b",
      category: "Dog Care",
      desc: "Symptoms & prevention tips every pet parent should know.",
    },
    {
      title: "Winter Care Tips for Cats",
      img: "https://images.unsplash.com/photo-1574158622682-e40e69881006",
      category: "Cat Care",
      desc: "Keep your feline warm, cozy, and comfortable this winter.",
    },
    {
      title: "Alleviate Dog Cruelty Problems",
      img: "https://images.unsplash.com/photo-1619983081563-430f63602797",
      category: "Dog Care",
      desc: "Creating awareness and care tips for dog lovers.",
    },
    {
      title: "Top 10 Healthy Dog Treats",
      img: "https://images.unsplash.com/photo-1620912189865-9c0c0b2d243d",
      category: "Dog Nutrition",
      desc: "Wholesome snacks that keep tails wagging.",
    },
    {
      title: "Best Indoor Games for Cats",
      img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
      category: "Cat Lifestyle",
      desc: "Fun ideas to keep your kitty active during winter.",
    },
    {
      title: "How to Keep Pets Warm in Winter",
      img: "https://images.unsplash.com/photo-1602067340370-bdcebe8c8d6d",
      category: "Pet Care",
      desc: "Practical heating solutions and safety advice for pet parents.",
    },
    {
      title: "Understanding Dog Emotions",
      img: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
      category: "Dog Psychology",
      desc: "Learn how to read your dog’s mood through body language.",
    },
    {
      title: "Signs Your Cat Truly Loves You",
      img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
      category: "Cat Behavior",
      desc: "Decode the subtle signals your cat uses to show affection.",
    },
    {
      title: "The Perfect Dog Walking Routine",
      img: "https://images.unsplash.com/photo-1598136490987-7d4f4c8e1f52",
      category: "Dog Exercise",
      desc: "How to structure your dog's walks for optimal health.",
    },
    {
      title: "How to Choose the Right Cat Food",
      img: "https://images.unsplash.com/photo-1601758174888-3729b23d23e3",
      category: "Cat Nutrition",
      desc: "Understanding labels and finding the perfect diet for your cat.",
    },
    {
      title: "DIY Dog Toys from Household Items",
      img: "https://images.unsplash.com/photo-1602067340370-bdcebe8c8d6d",
      category: "Dog Fun",
      desc: "Creative and safe toy ideas using simple materials.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto  py-10 flex flex-col lg:flex-row gap-10">
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
              src={images[index]}
              alt="Happy Customer"
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

          <div className="absolute bottom-4 left-4 text-white">
            <span className="bg-yellow-500 text-xs px-2 py-1 rounded">
              Dog Care
            </span>
            <h2 className="text-xl font-semibold mt-2">
              Alleviate Dog Cruelty Problems
            </h2>
            <p className="text-sm">By Debopriya Ghosh | January 2024</p>
          </div>
        </div>

        {/* Banner Image */}
        <Image
          src="/blogadd.jpg"
          alt="Banner"
          width={800}
          height={100}
          className="pb-10 rounded-md"
        />

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div key={blog.title} className="overflow-hidden shadow-sm">
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
      </div>

      {/* RIGHT: Sidebar (Sticky inside section) */}
      <div className="w-full lg:w-1/3">
        <div className="lg:sticky lg:top-24">
          {/* top-24 = leaves small gap below navbar */}
          <BlogSidebar />
        </div>
      </div>

      
    </section>
  );
}
