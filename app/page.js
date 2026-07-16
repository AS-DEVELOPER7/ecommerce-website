"use client";

import HeroSection from "src/components/organisms/home/HeroSection";
import FeaturedProducts from "src/components/organisms/home/FeaturedProducts";
import ExploreCollection from "src/components/organisms/home/ExploreCollection";
import OurStory from "src/components/organisms/home/OurStory";
import NewsLetter from "src/components/organisms/home/NewsLetter";

export default function HomePage() {
  return (
    <main className="bg-bg text-base">
      <HeroSection />
      <FeaturedProducts />
      <ExploreCollection />
      <OurStory />
      {/* <NewsLetter /> */}
    </main>
  );
}
