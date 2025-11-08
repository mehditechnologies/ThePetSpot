"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { authStore } from "@/Store/authStore"; // ✅ import your zustand store

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"password" | "otp">("password");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");

  const router = useRouter();
  const { login, isLoggingIn } = authStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    let formData;
    if (activeTab === "password") {
      formData = { email, password };
    } else {
      formData = { mobile: mobileOtp };
    }

    const success = await login(formData);

    if (success) {
      router.push("/"); // navigate after login
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-[#fdf3f3] py-5 pb-10">
      <div className="w-full max-w-5xl bg-white shadow-[0_4px_25px_rgba(0,0,0,0.08)] grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Section */}
        <div className="relative flex flex-col justify-center items-center text-white px-10 py-16">
          <Image
            src="/signup-bg.webp"
            alt="bg"
            fill
            className="object-cover z-0"
          />
          <div className="absolute inset-0 bg-[#169bb6]/70 z-10" />
          <div className="relative z-20 text-center max-w-sm">
            <Image
              src="/petlogo.svg"
              alt="logo"
              width={180}
              height={180}
              className="mx-auto mb-6"
            />
            <h2 className="text-3xl font-semibold leading-snug mb-2">
              We Welcome You,
            </h2>
            <p className="text-lg leading-snug font-medium">
              with our open <br /> Heart and Paws!
            </p>
          </div>
          <Image
            src="/taddy.png"
            alt="pets"
            width={260}
            height={260}
            className="relative z-20 mt-8"
          />
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center px-20 py-14">
          <h2 className="text-2xl font-semibold text-center mb-2 text-[#2CA4B6]">
            Login to Continue
          </h2>
          <p className="text-center text-sm text-gray-600 mb-8">
            Don't have an account with us?
            <a
              href="/sign-up"
              className="text-[#32b5ce] ml-1 font-medium hover:underline"
            >
              Click here to Register
            </a>
          </p>

          {/* Tabs */}
          <div className="flex justify-center text-base font-bold mb-4">
            <button
              className={`pb-1 px-5 border-b-3 transition font-bold ${
                activeTab === "password"
                  ? "text-[#04a4c3] border-[#04a4c3]"
                  : "text-gray-500 border-transparent hover:text-black"
              }`}
              onClick={() => setActiveTab("password")}
            >
              Login with Password
            </button>
            <button
              className={`pb-1 px-4 border-b-3 transition font-bold ${
                activeTab === "otp"
                  ? "text-[#04a4c3] border-[#04a4c3]"
                  : "text-gray-500 border-transparent hover:text-black"
              }`}
              onClick={() => setActiveTab("otp")}
            >
              Login with OTP
            </button>
          </div>

          <hr className="mb-4 font-light text-gray-200" />

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {activeTab === "password" ? (
              <>
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-[#F1F1F1] rounded-md text-sm focus:outline-none focus:border-[#169bb6]"
                  required
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 bg-[#F1F1F1] rounded-md text-sm focus:outline-none focus:border-[#169bb6]"
                    required
                  />
                  <span
                    onClick={() => setShowPassword((v) => !v)}
                    className={`fa fa-fw field-icon toggle-password absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                    style={{ fontSize: 20 }}
                  />
                </div>
              </>
            ) : (
              <input
                type="text"
                placeholder="Mobile No."
                value={mobileOtp}
                onChange={(e) => setMobileOtp(e.target.value)}
                className="w-full p-3 bg-[#F1F1F1] rounded-md text-sm focus:outline-none focus:border-[#169bb6]"
                required
              />
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className={`w-full py-2 rounded-md font-medium text-white transition ${
                isLoggingIn
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#04A4C3] hover:bg-[#118196]"
              }`}
            >
              {isLoggingIn ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
