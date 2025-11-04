"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  FiSearch,
  FiMapPin,
  FiPlus,
  FiDollarSign,
  FiFilter,
} from "react-icons/fi";
import { FaDog, FaMars, FaVenus, FaFire } from "react-icons/fa";
import { pets, breeds, popularBreeds, statesWithCities } from "./data";

export default function PetListingPage() {
  const [budget, setBudget] = useState(500000);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [showBreeds, setShowBreeds] = useState(false);
  const [showStates, setShowStates] = useState(false);
  const [showCities, setShowCities] = useState(false);
  const [openUp, setOpenUp] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedFeature, setSelectedFeature] = useState<string>("");

  const genderOptions = ["Male", "Female", "Other"];
  const featureOptions = [
    "Puppy Quality",
    "Pet Quality",
    "KCI Registered",
    "Champion Bloodline",
    "All",
  ];
  useEffect(() => {
    const checkPosition = () => {
      if (!searchRef.current) return;
      const rect = searchRef.current.getBoundingClientRect();
      setOpenUp(window.innerHeight - rect.bottom < 250);
    };
    checkPosition();
    window.addEventListener("scroll", checkPosition);
    window.addEventListener("resize", checkPosition);
    return () => {
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
    };
  }, []);

  const dropdownClass = `absolute z-20 left-0 w-full bg-white border border-gray-200  rounded-md max-h-48 overflow-y-auto `;

  return (
    <div className="min-h-screen  font-raleway p-6 px-52">
      {/* 🔍 Integrated Search Bar */}
      <div
        ref={searchRef}
        className="w-full max-w-6xl mx-auto bg-white border border-gray-200 
        rounded-xl flex items-center justify-between gap-3 
        px-4 sm:px-6 lg:px-8 py-4 mb-10"
      >
        {/* 🐶 Breed Input */}
        <div className="relative flex items-center bg-white border border-gray-200 rounded-md px-3 py-2 w-full">
          <FaDog className="text-gray-400 text-lg mr-2" />
          <input
            type="text"
            placeholder="Breed"
            value={selectedBreed}
            onFocus={() => {
              setShowBreeds(true);
              setShowStates(false);
              setShowCities(false);
            }}
            onChange={(e) => setSelectedBreed(e.target.value)}
            className="w-full outline-none active:outline-[#BFDEFF] text-sm text-gray-700 placeholder:text-gray-400"
          />
          {showBreeds && (
            <ul
              className={`${dropdownClass} ${
                openUp ? "bottom-full mb-1" : "top-full mt-1"
              }`}
            >
              {breeds
                .filter((b) =>
                  b.toLowerCase().includes(selectedBreed.toLowerCase())
                )
                .map((breed) => (
                  <li
                    key={breed}
                    onClick={() => {
                      setSelectedBreed(breed);
                      setShowBreeds(false);
                    }}
                    className="px-3 py-2 hover:bg-purple-100 cursor-pointer"
                  >
                    {breed}
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* 📍 State Input */}
        <div className="relative flex items-center bg-white border border-gray-200 rounded-md px-3 py-2 w-full">
          <FiMapPin className="text-gray-400 text-lg mr-2" />
          <input
            type="text"
            placeholder="State"
            value={selectedState}
            readOnly
            onFocus={() => {
              setShowStates(!showStates);
              setShowBreeds(false);
              setShowCities(false);
            }}
            className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400 cursor-pointer"
          />
          {showStates && (
            <ul
              className={`${dropdownClass} ${
                openUp ? "bottom-full mb-1" : "top-full mt-1"
              }`}
            >
              {Object.keys(statesWithCities).map((state) => (
                <li
                  key={state}
                  onClick={() => {
                    setSelectedState(state);
                    setSelectedCity("");
                    setShowStates(false);
                  }}
                  className="px-3 py-2 hover:bg-purple-100 cursor-pointer"
                >
                  {state}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 🏙️ City Input */}
        <div className="relative flex items-center bg-white border border-gray-200 rounded-md px-3 py-2 w-full">
          <FiMapPin className="text-gray-400 text-lg mr-2" />
          <input
            type="text"
            placeholder="City"
            value={selectedCity}
            readOnly
            onFocus={() => {
              if (selectedState) {
                setShowCities(!showCities);
                setShowBreeds(false);
                setShowStates(false);
              }
            }}
            className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400 cursor-pointer"
          />
          {showCities && selectedState && (
            <ul
              className={`${dropdownClass} ${
                openUp ? "bottom-full mb-1" : "top-full mt-1"
              }`}
            >
              {statesWithCities[selectedState].map((city) => (
                <li
                  key={city}
                  onClick={() => {
                    setSelectedCity(city);
                    setShowCities(false);
                  }}
                  className="px-3 py-2 hover:bg-purple-100 cursor-pointer"
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 🔍 Search Button */}
        <button
          className="bg-[#8957E9] hover:bg-[#8b3ffd] text-white font-medium 
            rounded-md px-18 py-2 flex items-center justify-center gap-2 
            transition-all duration-200"
        >
          Search
        </button>
      </div>

      {/* 🔽 Main Layout (Sidebar + Content) */}
      <div className="max-w-6xl mx-auto flex gap-8">
        {/* 🧭 Sidebar */}
        <div className="w-60 ">
          {/* Header */}
          <div className="bg-[#F9F6FF] px-5 py-5 shadow">
            <div className="  text-[#8957E9] rounded-lg  p flex items-center justify-between ">
              <h3 className="font-semibold text-base flex items-center gap-2">
                Add Pet
              </h3>
              <FiPlus className="text-lg font-extrabold cursor-pointer hover:scale-110 transition" />
            </div>
            <hr className="my-1.5 border-gray-200" />

            {/* Pet Type Section */}
            <div className="space-y-0 text-gray-700 text-sm">
              <div className="hover:text-purple-600 cursor-pointer text-sm font-semibold my-2">
                For Sale
              </div>
              <hr className="my-2 border-gray-200" />
              <div className="hover:text-purple-600 cursor-pointer font-semibold">
                For Mating
              </div>
              <hr className="my-2 border-gray-200" />
              <div className="hover:text-purple-600 cursor-pointer font-semibold">
                For Adoption
              </div>
            </div>
          </div>

          {/* Filters */}
          <h3 className="text-purple-600 font-medium text-xl flex items-center gap-2 my-6">
            Filters
          </h3>
          {/* i Am Looking */}
          <div className=" px-5 py-5 shadow my-3">
            <div className="  text-[#8957E9] rounded-lg  p flex items-center justify-between ">
              <h3 className="font-semibold text-base flex items-center gap-2">
                i'm Looking
              </h3>
            </div>
            <hr className="my-1.5 border-gray-200 mb-4" />

            {/* Pet Type Section */}
            <div className="space-y-0 text-gray-700 text-sm mt-2">
              <div className="hover:text-purple-600 cursor-pointer text-sm font-semibold my-2">
                For Buying
              </div>
              <hr className="my-2 border-gray-200" />
              <div className="hover:text-purple-600 cursor-pointer font-semibold">
                For Mating
              </div>
              <hr className="my-2 border-gray-200" />
              <div className="hover:text-purple-600 cursor-pointer font-semibold">
                For Adoption
              </div>
            </div>
          </div>

          {/* Pet Category */}
          <div className="px-5 py-5 shadow rounded-lg bg-white my-3">
            <div className="text-[#8957E9] flex items-center justify-between">
              <h3 className="font-semibold text-base flex items-center gap-2">
                Pet Category
              </h3>
            </div>

            <hr className="my-2 border-gray-200 mb-4" />

            {/* Pet Type Section */}
            <div className="space-y-3 text-gray-700 text-sm">
              <label className="flex items-center gap-2 font-semibold cursor-pointer">
                <input
                  type="radio"
                  name="petOption"
                  value="buying"
                  className="accent-[#8957E9] w-4 h-4"
                />
                Dogs
              </label>
              <hr className="border-gray-200" />
              <label className="flex items-center gap-2 font-semibold cursor-pointer">
                <input
                  type="radio"
                  name="petOption"
                  value="mating"
                  className="accent-[#8957E9] w-4 h-4"
                />
                Cats
              </label>
              <hr className="border-gray-200" />
              <label className="flex items-center gap-2 font-semibold cursor-pointer">
                <input
                  type="radio"
                  name="petOption"
                  value="adoption"
                  className="accent-[#8957E9] w-4 h-4"
                />
                Small Pets
              </label>
            </div>
          </div>

          {/* Sorted By */}
          <div className="px-5 py-5 shadow rounded-lg bg-white my-3">
            <div className="text-[#8957E9] flex items-center justify-between">
              <h3 className="font-semibold text-base flex items-center gap-2">
                Sort By
              </h3>
            </div>

            <hr className="my-2 border-gray-200 mb-4" />

            {/* Pet Type Section */}
            <div className="space-y-3 text-gray-700 text-sm">
              <label className="flex items-center gap-2 font-semibold cursor-pointer">
                <input
                  type="radio"
                  name="petOption"
                  value="buying"
                  className="accent-[#8957E9] w-4 h-4"
                />
                Price Low to High
              </label>
              <hr className="border-gray-200" />
              <label className="flex items-center gap-2 font-semibold cursor-pointer">
                <input
                  type="radio"
                  name="petOption"
                  value="mating"
                  className="accent-[#8957E9] w-4 h-4"
                />
                Price High to Low
              </label>
              <hr className="border-gray-200" />
              <label className="flex items-center gap-2 font-semibold cursor-pointer">
                <input
                  type="radio"
                  name="petOption"
                  value="adoption"
                  className="accent-[#8957E9] w-4 h-4"
                />
                Age Low to High
              </label>
              <hr className="border-gray-200" />
              <label className="flex items-center gap-2 font-semibold cursor-pointer">
                <input
                  type="radio"
                  name="petOption"
                  value="adoption"
                  className="accent-[#8957E9] w-4 h-4"
                />
                Age High to Low
              </label>
              <hr className="border-gray-200" />
              <label className="flex items-center gap-2 font-semibold cursor-pointer">
                <input
                  type="radio"
                  name="petOption"
                  value="adoption"
                  className="accent-[#8957E9] w-4 h-4"
                />
                What's New
              </label>
            </div>
          </div>
          <div className="px-5 py-5 shadow rounded-lg bg-white my-3">
            <div className="text-[#8957E9] flex items-center justify-between">
              <h3 className="font-semibold text-base flex items-center gap-2">
                Gender
              </h3>
            </div>
            <hr className="my-2 border-gray-200 mb-4" />
            <div className="space-y-3 text-gray-700 text-sm">
              {genderOptions.map((opt, idx) => (
                <div key={opt}>
                  <label className="flex items-center gap-2 font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={opt}
                      className="accent-[#8957E9] w-4 h-4"
                      checked={selectedGender === opt}
                      onChange={() => setSelectedGender(opt)}
                    />
                    {opt}
                  </label>
                  {idx < genderOptions.length - 1 && (
                    <hr className="border-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pet Features Section */}
          <div className="px-5 py-5 shadow rounded-lg bg-white my-3">
            <div className="text-[#8957E9] flex items-center justify-between">
              <h3 className="font-semibold text-base flex items-center gap-2">
                Pet Features
              </h3>
            </div>
            <hr className="my-2 border-gray-200 mb-4" />
            <div className="space-y-3 text-gray-700 text-sm">
              {featureOptions.map((opt, idx) => (
                <div key={opt}>
                  <label className="flex items-center gap-2 font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="feature"
                      value={opt}
                      className="accent-[#8957E9] w-4 h-4"
                      checked={selectedFeature === opt}
                      onChange={() => setSelectedFeature(opt)}
                    />
                    {opt}
                  </label>
                  {idx < featureOptions.length - 1 && (
                    <hr className="border-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* 💰 Budget Range */}
          <div className="mb-5">
            <h3 className="text-purple-600 font-semibold flex items-center gap-2 mb-3">
              <FiDollarSign /> Budget
            </h3>
            <input
              type="range"
              min="0"
              max="1000000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full accent-purple-600"
            />
            <p className="text-sm text-gray-600 mt-2">
              Selected: <span className="font-semibold">PKR {budget}</span>
            </p>
          </div>

          <hr className="my-5 border-gray-300" />

          {/* 🔥 Popular Breeds */}
          <h3 className="text-purple-600 font-semibold flex items-center gap-2 mb-3">
            <FaFire /> Popular Breeds
          </h3>
          <div className="space-y-2 text-gray-700">
            {popularBreeds.map((breed, i) => (
              <div
                key={i}
                className="hover:text-purple-600 cursor-pointer text-sm"
              >
                {breed}
              </div>
            ))}
          </div>
        </div>

        {/* 🐶 Pets Grid */}
        <div className="flex-1">
          <div className="bg-white p-6 rounded-xl  mb-6">
            <p className="text-sm text-gray-500">
              Home &gt; <span className="text-purple-600">Dogs</span> &gt;
              Labrador Retriever Puppies for Sale
            </p>
            <h2 className="text-2xl font-bold mt-2">
              Labrador Retriever Puppies For Sale
            </h2>
            <p className="text-gray-600 mt-3 leading-relaxed">
              <span className="font-semibold">
                Labrador Retriever price in Pakistan:
              </span>{" "}
              Mr n Mrs Pet is Pakistan’s most ethical place to buy, sell, and
              adopt Labrador Retriever puppies near you.
            </p>
            <button className="mt-3 text-sm bg-purple-100 text-purple-600 px-4 py-1 rounded-md">
              Read More
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <div key={pet.id} className="bg-white rounded-xl ">
                <div className="relative">
                  <img
                    src={pet.img}
                    alt={pet.name}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                    Pet Quality
                  </span>
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white px-3 py-2 text-sm font-semibold">
                    View Price
                  </div>
                </div>

                <div className="p-4 text-sm text-gray-700">
                  <h3 className="text-purple-700 font-semibold text-lg mb-2">
                    {pet.name}
                  </h3>
                  <p>
                    <span className="font-medium">Breed:</span> {pet.breed}
                  </p>
                  <p className="flex items-center gap-1">
                    <span className="font-medium">Gender:</span> {pet.gender}
                    <p className="inline ml-3">
                      <span className="font-medium">Age:</span> {pet.age}
                    </p>
                  </p>

                  <p>
                    <span className="font-medium">City:</span>{" "}
                    <span className="text-purple-600 cursor-pointer hover:underline">
                      {pet.city}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
