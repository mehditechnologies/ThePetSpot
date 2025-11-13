"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaAngleRight } from "react-icons/fa";
import { authStore } from "@/Store/authStore";

export default function HeroSection() {
  const router = useRouter();
  const [selectedPet, setSelectedPet] = useState("");
  const store = authStore() as any;
  const { authUser } = store;

  const handleAddPetClick = () => {
    if (authUser) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  const handleSearch = () => {
    if (
      !selectedPet ||
      selectedPet === "Please Select The Pet You Are Looking For..."
    ) {
      alert("Please select a pet type first!");
      return;
    }

    // Navigate to the corresponding page
    const route =
      selectedPet === "Dogs"
        ? "/dogs/for-sale"
        : selectedPet === "Cats"
        ? "/cats-for-sale"
        : selectedPet === "Small Pets"
        ? "/small-pets"
        : "/";

    router.push(route);
  };

  return (
    <section
      className="relative h-[60vh] w-full bg-cover bg-center flex items-start justify-center text-white"
      style={{ backgroundImage: "url('/home-banner.jpg')" }}
    >
      <div className="relative z-20 mt-32 w-full max-w-[1100px] text-center px-6">
        <h1 className="text-4xl md:text-4xl font-semibold mb-6 drop-shadow-lg">
          Pets Complete Your Family !!
        </h1>

        {/* Search row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <select
            value={selectedPet}
            onChange={(e) => setSelectedPet(e.target.value)}
            className="rounded-sm outline-none font-semibold bg-white p-3 w-full md:w-[450px] text-gray-700"
          >
            <option>Please Select The Pet You Are Looking For...</option>
            <option>Dogs</option>
            <option>Cats</option>
            <option>Small Pets</option>
          </select>

          <button
            onClick={handleSearch}
            className="bg-[#028d8f] rounded-sm px-20 py-2 font-medium text-white hover:bg-[#037273]"
          >
            Search
          </button>
        </div>

        {/* small nav links under search */}
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-base font-medium text-white">
          <a
            href="/dog-breed"
            className="hover:bg-[#028d8f] px-3 py-1 rounded-sm"
          >
            Breed Information
          </a>
          <a href="#" className="hover:bg-[#028d8f] px-3 py-1 rounded-sm">
            Compare Breed
          </a>
          <a href="/blog" className="hover:bg-[#028d8f] px-3 py-1 rounded-sm">
            Blog
          </a>
          <a href="#" className="hover:bg-[#028d8f] px-3 py-1 rounded-sm">
            Pet Transportation
          </a>
          <a href="#" className="hover:bg-[#028d8f] px-3 py-1 rounded-sm">
            Pet Adoption
          </a>
        </div>
      </div>

      {/* Breeder CTA bar */}
      <div className="absolute left-0 right-0 top-[76%] z-20 px-44 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between rounded-md py-7">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded bg-amber-100">
              <Image
                src="/breed_register.webp"
                alt="Breed Register"
                height={36}
                width={36}
                className="object-contain object-center"
              />
            </div>
            <div>
              <div className="text-lg font-semibold text-[#17a2b8]">
                ARE YOU A BREEDER?
              </div>
              <div className="text-base text-black">
                It takes only a few clicks to connect with genuine pet lovers.
                Register Now!
              </div>
            </div>
          </div>

          <div>
            <button 
              onClick={handleAddPetClick}
              className="bg-[#028d8f] text-white px-5 py-3 rounded-full text-xs hover:bg-[#037273]"
            >
              Add Your Pet
              <FaAngleRight className="inline mb-0.5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
