import AvailablePets from "@/Components/LandingPage/AvailablePets";
import HeroSection from "@/Components/LandingPage/HeroSection";
import MMP from "@/Components/LandingPage/MMP";
import ServicesSection from "@/Components/LandingPage/Service";
import Navbar from "@/Components/Navbar";
import joinUs from "@/Components/LandingPage/joinUs";
import PetWebsite from "@/Components/LandingPage/joinUs";
import Footer from "@/Components/LandingPage/Footer";
import Clients from "@/Components/LandingPage/Clients";

export default function Home() {
  return (
    <main className="font-sans">
      <Navbar />
      <HeroSection />
      <AvailablePets />
      <MMP />
      <ServicesSection />
      <PetWebsite />
      <Clients />
      <Footer />
    </main>
  );
}
