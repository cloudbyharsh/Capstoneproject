import Hero from "@/components/home/Hero";
import CategoryRow from "@/components/home/CategoryRow";
import FeaturedServices from "@/components/home/FeaturedServices";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import PanchangWidget from "@/components/home/PanchangWidget";

export default function Home() {
  return (
    <>
      <Hero />
      <PanchangWidget />
      <CategoryRow />
      <FeaturedServices />
      <HowItWorks />
      <Testimonials />
    </>
  );
}
