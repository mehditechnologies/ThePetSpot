import ContactSection from "@/Components/Contact/ContactSection";
import HeroSection from "../components/HeroSection";
import Map from "@/Components/Contact/map";

export default function page() {
  return (
    <div>
      <HeroSection
        title="About Mr n Mrs Pet"
        bgImage="/contact.webp"
        currentPage="Contact Us"
      />
      <ContactSection />
      <Map />
    </div>
  );
}
