"use client";
import React, { useEffect, useRef, useState } from "react";
import { FiMapPin, FiPlus, FiDollarSign } from "react-icons/fi";
import { FaDog, FaFire } from "react-icons/fa";
import { pets, breeds, popularBreeds, statesWithCities } from "./data"; // adjust path if needed

export default function DogsPage() {
  // Core states
  const [budget, setBudget] = useState<number>(500000);
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [showBreeds, setShowBreeds] = useState<boolean>(false);
  const [showStates, setShowStates] = useState<boolean>(false);
  const [showCities, setShowCities] = useState<boolean>(false);
  const [openUp, setOpenUp] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 12;

  // Sidebar/filter states
  const [petCategory, setPetCategory] = useState<string>("Dogs");
  const [lookingFor, setLookingFor] = useState<string>("Buying");
  const [sortBy, setSortBy] = useState<string>("");
  const [filteredPetsList, setFilteredPetsList] = useState(pets);

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

  const searchRef = useRef<HTMLDivElement | null>(null);

  // ---------- Utility helpers ----------
  const slugify = (s?: string) => {
    if (!s) return "";
    return encodeURIComponent(
      s
        .toString()
        .trim()
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[\s\_]+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
    );
  };

  // Convert slug back to human readable (german-shepherd -> German Shepherd)
  const unSlug = (s?: string) => {
    if (!s) return "";
    try {
      const dec = decodeURIComponent(s);
      const words = dec
        .replace(/-/g, " ")
        .replace(/_/g, " ")
        .trim()
        .split(/\s+/)
        .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w));
      return words.join(" ");
    } catch {
      return s.replace(/-/g, " ");
    }
  };

  const findStateForCity = (cityName: string) => {
    if (!cityName) return "";
    for (const [state, cities] of Object.entries(statesWithCities)) {
      if (cities.map((c) => c.toLowerCase()).includes(cityName.toLowerCase()))
        return state;
    }
    return "";
  };

  // ---------- Layout helpers ----------
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

  // ---------- Filtering logic (same as yours) ----------
  const applyFilters = () => {
    let result = pets.slice();
    setCurrentPage(1);

    // Breed / name search
    if (selectedBreed && selectedBreed.trim() !== "") {
      const q = selectedBreed.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.breed.toLowerCase().includes(q) || p.name.toLowerCase().includes(q)
      );
    }

    // City / State filter
    if (selectedCity) {
      result = result.filter((p) => p.city === selectedCity);
    } else if (selectedState) {
      const cities =
        statesWithCities[selectedState as keyof typeof statesWithCities] || [];
      if (cities.length > 0) {
        result = result.filter(
          (p) => cities.includes(p.city) || p.city === selectedState
        );
      } else {
        result = result.filter((p) => p.city === selectedState);
      }
    }

    // Budget filter
    if (budget !== undefined && budget !== null) {
      result = result.filter((p) => p.price <= budget);
    }

    // Gender
    if (selectedGender) {
      result = result.filter((p) => p.gender === selectedGender);
    }

    // Feature: implement "Puppy Quality" as <= 8 weeks
    if (selectedFeature === "Puppy Quality") {
      result = result.filter((p) => {
        const weeks = parseInt(String(p.age || "0"), 10) || 0;
        return weeks <= 8;
      });
    }

    // Sorting
    if (sortBy === "priceLowHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighLow") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "ageLowHigh") {
      result.sort((a, b) => {
        const aa = parseInt(String(a.age || "0"), 10) || 0;
        const bb = parseInt(String(b.age || "0"), 10) || 0;
        return aa - bb;
      });
    } else if (sortBy === "ageHighLow") {
      result.sort((a, b) => {
        const aa = parseInt(String(a.age || "0"), 10) || 0;
        const bb = parseInt(String(b.age || "0"), 10) || 0;
        return bb - aa;
      });
    } else if (sortBy === "newest") {
      result.sort((a, b) => b.id - a.id);
    }

    setFilteredPetsList(result);
  };

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedBreed,
    selectedState,
    selectedCity,
    budget,
    selectedGender,
    selectedFeature,
    sortBy,
    petCategory,
    lookingFor,
  ]);

  const dropdownClass = `absolute z-20 left-0 w-full bg-white border border-gray-200  rounded-md max-h-48 overflow-y-auto `;

  // ---------- URL push (client-side only) ----------
  const pushUrlClientSide = () => {
    applyFilters();

    const breedSlug = slugify(selectedBreed);
    const citySlug = slugify(selectedCity);

    let path = "/dogs/for-sale"; // default
    if (breedSlug && citySlug) {
      path = `/dogs/${breedSlug}/for-sale/in/${citySlug}`;
    } else if (breedSlug) {
      path = `/dogs/${breedSlug}/for-sale`;
    } else if (citySlug) {
      path = `/dogs/for-sale/in/${citySlug}`;
    }

    if (typeof window !== "undefined") {
      // push a new history entry
      window.history.pushState({}, "", path);

      // optional: change title to something helpful
      const prettyTitle = selectedBreed
        ? `${selectedBreed} for sale${
            selectedCity ? " in " + selectedCity : ""
          }`
        : "Dogs for sale";
      document.title = prettyTitle;
    }

    // UI is already updated via state.
  };

  // ---------- popstate handler: update UI when user presses back/forward ----------
  useEffect(() => {
    const onPop = () => {
      const parts = window.location.pathname.split("/").filter(Boolean);
      if (parts[0] !== "dogs") return;

      // parse breed & city
      const inIdx = parts.indexOf("in");
      const forSaleIdx = parts.indexOf("for-sale");

      let breed = "";
      let city = "";

      if (parts[1] && parts[1] !== "for-sale") {
        // candidate breed (parts[1])
        breed = unSlug(parts[1]);
      }

      if (inIdx !== -1 && parts.length > inIdx + 1) {
        city = unSlug(parts[inIdx + 1]);
      } else if (forSaleIdx !== -1 && parts.length > forSaleIdx + 1) {
        // uncommon structure, ignore
      }

      setSelectedBreed(breed || "");
      setSelectedCity(city || "");
      if (city) {
        const stateFound = findStateForCity(city);
        if (stateFound) setSelectedState(stateFound);
        else setSelectedState("");
      } else {
        // If city empty, keep existing selectedState or clear it if you prefer:
        // setSelectedState("");
      }
      // applyFilters is triggered by the watch useEffect
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Optionally parse initial location when component mounts so if user landed on /dogs it works,
  // but remember direct refresh on /dogs/german-shepherd/... will 404 unless you created route.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const parts = window.location.pathname.split("/").filter(Boolean);
    if (parts[0] !== "dogs") return;

    const inIdx = parts.indexOf("in");
    const forSaleIdx = parts.indexOf("for-sale");

    let breed = "";
    let city = "";

    if (parts[1] && parts[1] !== "for-sale") breed = unSlug(parts[1]);
    if (inIdx !== -1 && parts.length > inIdx + 1)
      city = unSlug(parts[inIdx + 1]);

    if (breed) setSelectedBreed(breed);
    if (city) {
      setSelectedCity(city);
      const stateFound = findStateForCity(city);
      if (stateFound) setSelectedState(stateFound);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- Render ----------
  return (
    <div className="min-h-screen  font-raleway p-6 px-44">
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
            readOnly
            onFocus={() => {
              setShowBreeds(!showBreeds); // toggle like state input
              setShowStates(false);
              setShowCities(false);
            }}
            className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400 cursor-pointer"
          />
          {showBreeds && (
            <ul
              className={`${dropdownClass} ${
                openUp ? "bottom-full mb-1" : "top-full mt-1"
              }`}
            >
              {breeds.map((breed) => (
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
          onClick={() => pushUrlClientSide()}
          className="bg-[#8957E9] hover:bg-[#8b3ffd] text-white font-medium 
            rounded-md px-18 py-2 flex items-center justify-center gap-2 
            transition-all duration-200"
        >
          Search
        </button>
      </div>

      {/* 🔽 Main Layout (Sidebar + Content) */}
      <div className="max-w-7xl mx-auto flex gap-4">
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
                I am Looking
              </h3>
            </div>
            <hr className="my-1.5 border-gray-200 mb-4" />

            <div className="space-y-0 text-gray-700 text-sm mt-2">
              <label className="flex items-center gap-2 font-semibold cursor-pointer">
                <input
                  type="radio"
                  name="lookingFor"
                  value="Buying"
                  className="accent-[#8957E9] w-4 h-4"
                  checked={lookingFor === "Buying"}
                  onChange={() => setLookingFor("Buying")}
                />
                For Buying
              </label>
              <hr className="my-2 border-gray-200" />
              <label className="flex items-center gap-2 font-semibold cursor-pointer">
                <input
                  type="radio"
                  name="lookingFor"
                  value="Mating"
                  className="accent-[#8957E9] w-4 h-4"
                  checked={lookingFor === "Mating"}
                  onChange={() => setLookingFor("Mating")}
                />
                For Mating
              </label>
              <hr className="my-2 border-gray-200" />
              <label className="flex items-center gap-2 font-semibold cursor-pointer">
                <input
                  type="radio"
                  name="lookingFor"
                  value="Adoption"
                  className="accent-[#8957E9] w-4 h-4"
                  checked={lookingFor === "Adoption"}
                  onChange={() => setLookingFor("Adoption")}
                />
                For Adoption
              </label>
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

            <div className="space-y-3 text-gray-700 text-sm">
              <label className="flex items-center gap-2 font-semibold cursor-pointer">
                <input
                  type="radio"
                  name="petCategory"
                  value="Dogs"
                  className="accent-[#8957E9] w-4 h-4"
                  checked={petCategory === "Dogs"}
                  onChange={() => setPetCategory("Dogs")}
                />
                Dogs
              </label>
              <hr className="border-gray-200" />
              <label className="flex items-center gap-2 font-semibold cursor-pointer">
                <input
                  type="radio"
                  name="petCategory"
                  value="Cats"
                  className="accent-[#8957E9] w-4 h-4"
                  checked={petCategory === "Cats"}
                  onChange={() => setPetCategory("Cats")}
                />
                Cats
              </label>
              <hr className="border-gray-200" />
              <label className="flex items-center gap-2 font-semibold cursor-pointer">
                <input
                  type="radio"
                  name="petCategory"
                  value="Small Pets"
                  className="accent-[#8957E9] w-4 h-4"
                  checked={petCategory === "Small Pets"}
                  onChange={() => setPetCategory("Small Pets")}
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

            <div className="space-y-3 text-gray-700 text-sm">
              <label className="flex items-center gap-2 font-semibold cursor-pointer">
                <input
                  type="radio"
                  name="sortBy"
                  value="priceLowHigh"
                  className="accent-[#8957E9] w-4 h-4"
                  checked={sortBy === "priceLowHigh"}
                  onChange={() => setSortBy("priceLowHigh")}
                />
                Price Low to High
              </label>
              <hr className="border-gray-200" />
              <label className="flex items-center gap-2 font-semibold cursor-pointer">
                <input
                  type="radio"
                  name="sortBy"
                  value="priceHighLow"
                  className="accent-[#8957E9] w-4 h-4"
                  checked={sortBy === "priceHighLow"}
                  onChange={() => setSortBy("priceHighLow")}
                />
                Price High to Low
              </label>
              <hr className="border-gray-200" />
              <label className="flex items-center gap-2 font-semibold cursor-pointer">
                <input
                  type="radio"
                  name="sortBy"
                  value="ageLowHigh"
                  className="accent-[#8957E9] w-4 h-4"
                  checked={sortBy === "ageLowHigh"}
                  onChange={() => setSortBy("ageLowHigh")}
                />
                Age Low to High
              </label>
              <hr className="border-gray-200" />
              <label className="flex items-center gap-2 font-semibold cursor-pointer">
                <input
                  type="radio"
                  name="sortBy"
                  value="ageHighLow"
                  className="accent-[#8957E9] w-4 h-4"
                  checked={sortBy === "ageHighLow"}
                  onChange={() => setSortBy("ageHighLow")}
                />
                Age High to Low
              </label>
              <hr className="border-gray-200" />
              <label className="flex items-center gap-2 font-semibold cursor-pointer">
                <input
                  type="radio"
                  name="sortBy"
                  value="newest"
                  className="accent-[#8957E9] w-4 h-4"
                  checked={sortBy === "newest"}
                  onChange={() => setSortBy("newest")}
                />
                Whats New
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
                  <label className="flex items-center gap-2 font-semibold cursor-pointer active:text-[#8957E9]">
                    <input
                      type="radio"
                      name="gender"
                      value={opt}
                      className="accent-[#8957E9] w-4 h-4 mb-2 "
                      checked={selectedGender === opt}
                      onChange={() => setSelectedGender(opt)}
                    />
                    {opt}
                  </label>
                  {idx < genderOptions.length - 1 && (
                    <hr className="border-gray-200 my-1.5" />
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
                  <label className="flex items-center gap-2 font-semibold cursor-pointer mb-2">
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
                    <hr className="border-gray-200 my-1.5" />
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
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full appearance-none h-2 bg-gray-200 rounded-lg accent-[#8957E9] cursor-pointer outline-none"
            />
            <div className="flex justify-between font-semibold">
              <p>0</p>
              <p>10L</p>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Your Budget: <span className="font-semibold">₹: {budget}</span>
            </p>
          </div>

          <hr className="my-5 border-gray-300" />

          {/* 🔥 Popular Breeds */}
          <h3 className="text-purple-600 font-semibold flex items-center gap-2 mb-3">
            <FaFire /> Popular Breeds
          </h3>
          <div className="space-y-2 text-gray-700">
            {popularBreeds.map((breed, i) => {
              const breedCount = pets.filter((p) => p.breed === breed).length;
              return (
                <div
                  key={i}
                  onClick={() => setSelectedBreed(breed)}
                  className="hover:text-purple-600 cursor-pointer text-sm flex gap-2"
                >
                  <span>{breed}</span>
                  <span className="text-gray-500">({breedCount})</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 🐶 Pets Grid */}
        <div className="flex-1">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <span className="hover:text-purple-600 cursor-pointer transition-colors">
                Home
              </span>
              <span>→</span>
              <span className="hover:text-purple-600 cursor-pointer transition-colors">
                Dogs
              </span>
              <span>→</span>
              <span className="text-purple-600 font-medium">
                {selectedBreed
                  ? `${selectedBreed} for Sale`
                  : "All Dogs for Sale"}
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {selectedBreed
                    ? `${selectedBreed} For Sale`
                    : "Dogs For Sale"}
                </h1>
                <p className="text-gray-600 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 font-semibold text-sm">
                    {filteredPetsList.length}
                  </span>
                  Premium pets available near you
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {(() => {
              const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
              const endIdx = startIdx + ITEMS_PER_PAGE;
              const paginatedList = filteredPetsList.slice(startIdx, endIdx);
              const totalPages = Math.ceil(
                filteredPetsList.length / ITEMS_PER_PAGE
              );

              if (paginatedList.length === 0) {
                return (
                  <div className="col-span-3 text-center py-20">
                    <div className="text-6xl mb-4">🐕</div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                      No pets found
                    </h3>
                    <p className="text-gray-500">Try adjusting your filters</p>
                  </div>
                );
              }

              return paginatedList.map((pet) => (
                <div
                  key={pet.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={pet.img}
                      alt={pet.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-purple-600 text-xs font-semibold rounded-full shadow-lg">
                        ⭐ Premium
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                      {pet.name}
                    </h3>

                    <div className="space-y-2.5 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Breed</span>
                        <span className="font-semibold text-gray-800">
                          {pet.breed}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Gender & Age</span>
                        <span className="font-semibold text-gray-800">
                          {pet.gender}, {pet.age}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Location</span>
                        <span className="font-semibold text-purple-600">
                          {pet.city}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <button className="px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                        Call
                      </button>
                      <button className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                        Chat
                      </button>
                      <button className="px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium">
                        Info
                      </button>
                    </div>

                    <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
                      Book Now
                    </button>
                  </div>
                </div>
              ));
            })()}
          </div>

          {/* Pagination */}
          {(() => {
            const totalPages = Math.ceil(
              filteredPetsList.length / ITEMS_PER_PAGE
            );
            if (totalPages <= 1) return null;
            return (
              <div className="mt-12 flex items-center justify-center gap-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all duration-200 ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-purple-600 hover:bg-purple-50 shadow-sm hover:shadow-md hover:scale-105"
                  }`}
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-full font-semibold transition-all duration-200 ${
                          currentPage === page
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-110"
                            : "bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage >= totalPages}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all duration-200 ${
                    currentPage >= totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-purple-600 hover:bg-purple-50 shadow-sm hover:shadow-md hover:scale-105"
                  }`}
                >
                  Next
                </button>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
