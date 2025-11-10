import PetsAd from "@/Components/PetsAd";
import HeroSection from "../components/HeroSection";

export default function PostYourAdsPage() {
  return (
    <div>
      <HeroSection
        title="About Mr n Mrs Pet"
        bgImage="/aboutBg.webp"
        currentPage="Pet for sale"
      />

      <PetsAd />
    </div>
  );
}
