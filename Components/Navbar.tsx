"use client";
import { useState } from "react";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const dropdownLinkClasses =
    "block px-6 py-3 border-b text-[#202020]  border-transparent transition-colors " +
    "hover:bg-[#FFAC0D]  hover:border-gray-300 border-b-gray-300";

  return (
    <header className="w-full bg-transparent absolute top-0 left-0 z-30">
      <div className="mx-auto px-52 py-6 flex items-center  justify-between relative">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/petlogo.svg" alt="logo" className="h-8 w-auto" />
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex gap-10 items-center text-[#fff] text-base font-semibold relative">
          {/* Pets Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleMenu("pets")}
              className="flex items-center gap-1 hover:opacity-90 cursor-pointer"
            >
              <span>Pets</span>
              <svg
                className="w-4 h-4 mb-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5.25 7.5L10 12.25 14.75 7.5z" />
              </svg>
            </button>
            {openMenu === "pets" && (
              <div className="absolute  left-0 mt-2 w-40 bg-white text-sm text-gray-700 rounded-md shadow-lg">
                <a href="#" className={dropdownLinkClasses}>
                  Dog
                </a>
                <a href="#" className={dropdownLinkClasses}>
                  Cat
                </a>
                <a href="#" className={dropdownLinkClasses}>
                  Small Pet
                </a>
              </div>
            )}
          </div>

          {/* Pet Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleMenu("services")}
              className="flex items-center gap-2 hover:opacity-90 cursor-pointer"
            >
              <span>Pet Services</span>
              <svg
                className="w-4 h-4 mb-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5.25 7.5L10 12.25 14.75 7.5z" />
              </svg>
            </button>
            {openMenu === "services" && (
              <div className="absolute left-0 mt-2 w-40 bg-white  text-gray-700 rounded-md shadow-lg">
                <a href="#" className={dropdownLinkClasses}>
                  Grooming
                </a>
                <a href="#" className={dropdownLinkClasses}>
                  Training
                </a>
                <a href="#" className={dropdownLinkClasses}>
                  Boarding
                </a>
              </div>
            )}
          </div>

          {/* Breeds Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleMenu("breeds")}
              className="flex items-center gap-2 hover:opacity-90 cursor-pointer"
            >
              <span>Breeds</span>
              <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5.25 7.5L10 12.25 14.75 7.5z" />
              </svg>
            </button>
            {openMenu === "breeds" && (
              <div className="absolute left-0 mt-2 w-40 bg-white text-gray-700 rounded-md shadow-lg">
                <a href="#" className={dropdownLinkClasses}>
                  Dog Breeds
                </a>
                <a href="#" className={dropdownLinkClasses}>
                  Cat Breeds
                </a>
              </div>
            )}
          </div>

          {/* Simple Links */}
          <a href="#" className="hover:opacity-90">
            Blog
          </a>
          <a href="#" className="hover:opacity-90">
            List Your Pet
          </a>

          {/* Login Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleMenu("login")}
              className="flex items-center gap-1 hover:opacity-90 cursor-pointer"
            >
              <span>Login</span>
              <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5.25 7.5L10 12.25 14.75 7.5z" />
              </svg>
            </button>
            {openMenu === "login" && (
              <div className="absolute left-0 mt-2 w-32 bg-white text-gray-700 rounded-md shadow-lg">
                <a href="#" className={dropdownLinkClasses}>
                  Login
                </a>
                <a href="#" className={dropdownLinkClasses}>
                  Signup
                </a>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
