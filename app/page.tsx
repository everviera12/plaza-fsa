import CategoriesCards from "@/components/categories-cards";
import ContactForm from "@/components/contact-form";
import ContentCTA from "@/components/content-cta";
import FeaturedEvent from "@/components/featured-event";
import HeroHeader from "@/components/hero-header";
import TextSlider from "@/components/text-slider";

export default function Home() {
  return (
    <div>
      <HeroHeader />
      <TextSlider />
      <CategoriesCards />
      <FeaturedEvent />
      <ContentCTA />
      <ContactForm />
    </div>
  );
}