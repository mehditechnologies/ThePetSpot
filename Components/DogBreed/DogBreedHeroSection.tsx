"use client";
import {  useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaAngleRight } from "react-icons/fa";

export default function DogBreedHeroSection() {
  const router = useRouter();

  const [selectedPet, setSelectedPet] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");

  // Sample breed data
  const breeds = {
    Dogs: [
      "Labrador Retriever",
      "German Shepherd",
      "Golden Retriever",
      "Pug",
      "Bulldog",
      "Beagle",
    ],
    Cats: ["Persian", "Maine Coon", "Siamese", "Bengal", "Ragdoll", "Sphynx"],
  };

  type PetType = keyof typeof breeds;

  const handleSearch = () => {
    if (!selectedPet) {
      alert("Please select a pet type first!");
      return;
    }
    if (!selectedBreed) {
      alert("Please select a breed!");
      return;
    }

    // make breed url friendly
    const breedSlug = selectedBreed.toLowerCase().replace(/\s+/g, "-");

    const route =
      selectedPet === "Dogs"
        ? `/dog-breed/${breedSlug}`
        : selectedPet === "Cats"
        ? `/cats/${breedSlug}`
        : "/";

    router.push(route);
  };

  return (
    <section
      className="relative h-[60vh] w-full bg-cover bg-center flex items-start justify-center text-white"
      style={{ backgroundImage: "url('/aboutBg.webp')" }}
    >
      <div className="relative z-20 mt-32 w-full max-w-[1100px] text-center px-6">
        <h1 className="text-4xl md:text-4xl font-semibold mb-6 drop-shadow-lg">
          Pets Complete Your Family
        </h1>

        {/* Search row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          {/* Select Pet Type */}
          <select
            value={selectedPet}
            onChange={(e) => {
              setSelectedPet(e.target.value);
              setSelectedBreed(""); // reset breed when pet type changes
            }}
            className="rounded-sm outline-none font-semibold bg-white p-3 w-full md:w-[250px] text-gray-700"
          >
            <option value="">Select Pet Type</option>
            <option value="Dogs">Dogs</option>
            <option value="Cats">Cats</option>
          </select>

          {/* Select Breed */}
          <select
            value={selectedBreed}
            onChange={(e) => setSelectedBreed(e.target.value)}
            disabled={!selectedPet}
            className={`rounded-sm outline-none font-semibold p-3 w-full md:w-[250px] ${
              selectedPet
                ? "bg-white text-gray-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <option value="">
            {selectedPet &&
              breeds[selectedPet as PetType].map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
                </option>
          </select>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-[#028d8f] rounded-sm px-10 py-2 font-medium text-white hover:bg-[#037273] w-full md:w-auto"
          >
            Search
          </button>
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
            <button className="bg-[#028d8f] text-white px-5 py-3 rounded-full text-xs hover:bg-[#037273]">
              Add Your Pet
              <FaAngleRight className="inline mb-0.5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
