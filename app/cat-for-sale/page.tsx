import AvailablePets from "@/Components/cat-for-sale/AvailablePetsNearMe";
import PetListingPage from "@/Components/cat-for-sale/catsListingPage";
import NotFoundPets from "@/Components/cat-for-sale/NotFoundPets";
import PopularCatSearches from "@/Components/cat-for-sale/PopularCatSearches";
import ThingsToConsider from "@/Components/cat-for-sale/ThingsToConsider";
import WinningFormula from "@/Components/cat-for-sale/WinningFormula";
import AreYouResponsible from "@/Components/dogs-for-sale/AreYouResponsible";
import BlogSection from "@/Components/dogs-for-sale/BlogSection";
import FAQSection from "@/Components/dogs-for-sale/FAQSection";
import Feedback from "@/Components/dogs-for-sale/feedback";
import HeroSection from "@/Components/dogs-for-sale/HeroSection";
import Footer from "@/Components/LandingPage/Footer";
import Navbar from "@/Components/Navbar";

export default function DogsForSalePage() {
  return (
    <div>
      {/* <Navbar /> */}
      <HeroSection />
      <PetListingPage />
      <NotFoundPets />
      <ThingsToConsider />
      <AvailablePets />
      <WinningFormula />
      <AreYouResponsible />
      <PopularCatSearches />
      <Feedback />
      <FAQSection />
      <BlogSection />
      {/* <Footer /> */}
    </div>
  );
}
