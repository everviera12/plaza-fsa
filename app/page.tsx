import CategoriesCards from "@/components/categories-cards";
import HeroHeader from "@/components/hero-header";
import TextSlider from "@/components/text-slider";

export default function Home() {
  return (
    <div>
      <HeroHeader />
      <TextSlider />
      <CategoriesCards />
    </div>
  );
}