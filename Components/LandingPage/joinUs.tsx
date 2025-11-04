"use client";

import Image from "next/image";

export default function HomePage() {
  const cards = [
    { src: "/joinus/labrador-2021.webp", title: "Labrador Retriever" },
    { src: "/joinus/guinea_pigs_2021.webp", title: "Guinea Pigs" },
    { src: "/joinus/persian_cat_2021.webp", title: "Persian Cat" },
    {
      src: "/joinus/breed_2021.webp",
      title: "Breed Selector",
      subtitle: "Select Your Breed In All Pets Type",
      button: "View Breeds",
    },
    {
      src: "/joinus/compare_breed_2021.webp",
      title: "Compare Breeds",
      subtitle: "Compare Between 2 Breeds",
      button: "View Breeds",
    },
    {
      src: "/joinus/more_breed_2021.webp",
      title: "More Breeds?",
      subtitle: "70+ Breeds Information here.",
      button: "View Breeds",
    },
  ];

  const healthArticles = [
    {
      id: 1,
      image: "/joinus/view-all-blogs.webp",
      title: "View More Blogs",
      bgColor: "bg-[#f7b394]",
      description:
        "Find inspiration in the new photos we hand-select every day or use our search to find and download exactly what you're looking for.",
    },
    {
      id: 2,
      image: "/joinus/blog2.webp",
      label: "2",
      title: "Doctors For CAT",
      bgColor: "bg-[#6ed2b2]",
      subtitle: "CHECKUP STARTING FROM 999/-",
      description: "Read top articles from health experts",
    },
    {
      id: 3,
      image: "/joinus/blog3.webp",
      label: "3",
      title: "Doctors For SMALL PET",
      bgColor: "bg-[#f7b394]",
      subtitle: "CHECKUP STARTING FROM 999/-",
      description: "Read top articles from health experts",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#004D4D] flex flex-col items-center py-16 px-6 md:px-16 lg:px-44">
      {/* Join Us Section */}
      <section className="w-full max-w-6xl text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-[#025B5B]">
          Join Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "Join as a Breeder",
            "Join as a Sitter",
            "Join as a Dog Trainer",
            "Join as a Dog Walker",
            "Join as a Dog Groomer",
            "Join as a Veterinarian",
          ].map((text, index) => (
            <button
              key={index}
              className="bg-white shadow-[0_0_3px_rgba(0,0,0,0.15)] rounded-lg py-3 text-xs text-black font-medium hover:text-[#6f42c1] transition"
            >
              {text}
            </button>
          ))}
        </div>
      </section>

      {/* Excited Section */}
      <section className="text-center max-w-3xl mb-12">
        <h3 className="text-2xl md:text-3xl font-semibold text-[#025B5B]">
          Excited to get a pet, but still confused?
        </h3>
        <p className="text-black text-sm mt-1">
          We're here to help you! Try MMP Tools and make the right choice!
        </p>
      </section>

      {/* Pet Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mb-24">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`relative rounded-2xl overflow-hidden transition-transform duration-300 group
                ${idx === 1 ? "lg:col-span-2 lg:row-span-1" : ""}
             ${idx === 3 ? "lg:col-span-2 lg:row-span-1" : ""}`}
          >
            <Image
              src={card.src}
              alt={card.title}
              width={500}
              height={300}
              className={`object-cover w-full h-64 ${
                card.button ? "brightness-75" : ""
              }`}
            />

            {card.button ? (
              <div className="absolute inset-0 flex flex-col justify-end mb-3 items-center text-center text-white transition-all duration-300">
                <h4 className="text-2xl font-semibold mb-1">{card.title}</h4>
                <p className="text-sm mb-3 opacity-90">{card.subtitle}</p>
                <button className="border border-white px-4 py-1 text-sm rounded hover:bg-white hover:text-black transition">
                  {card.button}
                </button>
              </div>
            ) : (
              <div className="absolute bottom-3 left-3 text-white font-semibold text-lg drop-shadow-md">
                {card.title}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Health Experts Section */}
      {/* Health Experts Section */}
      <section className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {healthArticles.map((item) => (
            <div
              key={item.id}
              className={` rounded-xl overflow-hidden  flex flex-col justify-between`}
            >
              {/* First Card Special Layout */}
              {item.id === 1 ? (
                <div className="flex flex-col items-center justify-between h-full text-center ">
                  {/* Text Section (Top) */}
                  <div className="mb-4">
                    <h3 className="text-xl text-start md:text-xl font-medium mb-2 text-black">
                      Read top articles from health experts
                    </h3>
                    <p className="text-sm text-black font-medium  text-start">
                      Find inspiration in the new photos we hand-select every
                      day or use our search to find and download exactly what
                      you’re looking for.
                    </p>
                  </div>

                  {/* Image Section (Reduced Height) */}
                  <div className="relative  w-full h-80">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ) : (
                <>
                  {/* Image Section */}
                  <div className="relative  w-full h-96">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Text Section */}
                  <div className=" text-center bg-white text-black">
                    {item.subtitle && (
                      <p className="text-xs tracking-[3px] text-start font-semibold text-[#025B5B]">
                        {item.subtitle}
                      </p>
                    )}
                    <p className="text-xs text-gray-600 text-start mt-1">
                      {item.description}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
