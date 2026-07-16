"use client";

import HeroSection from "src/components/organisms/HeroSection";
import FeaturedProducts from "src/components/organisms/FeaturedProducts";
import ExploreCollection from "src/components/organisms/ExploreCollection";
import OurStory from "src/components/organisms/OurStory";
import NewsLetter from "src/components/organisms/NewsLetter";

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
