import PetListingPage from "@/Components/dogs-for-sale/dogsListingPage";
import HeroSection from "@/Components/dogs-for-sale/HeroSection";
import Navbar from "@/Components/Navbar";

export default function DogsForSalePage() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <PetListingPage />
    </div>
  );
}
