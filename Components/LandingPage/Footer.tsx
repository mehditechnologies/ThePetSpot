"use client";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTimes,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#F8FAFC]  text-[#333] pt-12 pb-6 border-t border-gray-200 px-44">
      <div className="flex gap-20">
        <div>
          <img
            src="/Footer.png"
            alt="Mr n Mrs Pet Logo"
            className="h-10 mb-4"
          />
          <p className="text-sm leading-relaxed">
            A house is not home without paw prints. We are one-stop destination
            for all your pet care needs.
          </p>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#6B7280]" />
              <span>+91 - 7597-972-222</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-[#6B7280]" />
              <span>hello@mrnmrspet.com</span>
            </div>
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-[#6B7280] mt-1" />
              <span>
                Plot No. 10, Ground Floor, Jayshree Nagar, Malviya Nagar,
                Jaipur, Rajasthan 302017
              </span>
            </div>
          </div>
        </div>
        <div className="   grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Logo + Info */}

          {/* Our Company */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Our Company</h4>
            <ul className="space-y-2 text-sm">
              {[
                "About us",
                "Contact us",
                "Terms & Conditions",
                "Privacy Policy",
                "Term of Use",
                "Refund Policy",
                "Shipping Policy",
                "Grievance Policy",
              ].map((item) => (
                <li
                  key={item}
                  className="hover:text-[#7B3AED] cursor-pointer mb-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm">
              {[
                "Dog Hostel",
                "Dog Training",
                "Dog Walking",
                "Grooming",
                "Veterinary",
                "Pet Mating",
                "Blog",
              ].map((item) => (
                <li
                  key={item}
                  className="hover:text-[#7B3AED] cursor-pointer mb-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
            <p className="text-sm mb-3">
              Subscribe to our newsletter & get all the latest news
            </p>

            <div className="flex items-center mb-5">
              <input
                type="email"
                placeholder="Enter Email ID"
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md text-sm outline-none"
              />
              <button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-5 py-2 rounded-r-md text-sm font-medium">
                Go
              </button>
            </div>

            <div className="flex items-center gap-4">
              {[
                <FaFacebookF key="fb" />,
                <FaTimes key="x" />,
                <FaWhatsapp key="wa" />,
                <FaInstagram key="ig" />,
              ].map((Icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-lg cursor-pointer hover:bg-[#7C3AED]"
                >
                  {Icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-start gap-x-10 text-gray-600">
        <span className="font-semibold text-[#333] w-full mb-3 text-xl">
          Join Us as a
        </span>
        <span>Breeder</span>

        <span>Sitter</span>
        <span>Dog Trainer</span>

        <span>Dog Walker</span>

        <span>Dog Groomer</span>

        <span>Veterinarian</span>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-4 mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="">
            © 2018-2025 Wanderlust Pet Services Private Limited. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
