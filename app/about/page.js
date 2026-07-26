"use client";

import Image from "next/image";
import { FaHammer, FaLeaf, FaHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ABOUT_US_IMAGES } from "src/constants/images";
import Interactive3DCard from "src/components/3d/Interactive3DCard";
import ParticleBackground3D from "src/components/3d/ParticleBackground3D";
import { RiSparklingLine } from "react-icons/ri";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-neutral-900 relative overflow-hidden">
      <ParticleBackground3D />
      <div className="relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* Intro */}
        <IntroSection />

        {/* Founder */}
        <FounderSection />

        {/* Values */}
        <OurValuesSection />

        {/* Behind the Scenes */}
        <BehindTheScenes />

        {/* CTA */}
        <JewelryCTA />
      </div>
    </main>
  );
}

function JewelryCTA() {
  const router = useRouter();
  return (
    <section className="text-center py-12 sm:py-20 px-6 bg-gradient-to-r from-primary/10 via-amber-500/10 to-primary/10 border-t border-border">
      <div className="max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 text-primary font-display uppercase tracking-widest text-xs font-bold mb-3">
          <RiSparklingLine className="text-base animate-pulse" /> Timeless Treasures
        </span>
        <h3 className="text-2xl sm:text-4xl font-serif font-medium mb-4 text-neutral-900">
          Find a Piece that Tells Your Story
        </h3>
        <p className="max-w-xl mx-auto mb-8 text-neutral-600 text-sm sm:text-base font-normal">
          Explore our collections and discover handcrafted jewelry that’s as unique as you are in an interactive 3D experience.
        </p>
        <button
          onClick={() => router.push("/shop")}
          className="inline-flex items-center gap-2 py-4 px-8 bg-primary hover:bg-pink-600 text-white font-semibold rounded-full shadow-[0_8px_25px_rgba(238,43,140,0.3)] hover:scale-105 transition-all"
        >
          Explore 3D Jewelry <RiSparklingLine className="text-lg" />
        </button>
      </div>
    </section>
  );
}

function BehindTheScenes() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 sm:py-20">
      <div className="text-center mb-12">
        <span className="text-primary font-display uppercase tracking-widest text-xs font-bold mb-2 block">
          Artisanal Craftsmanship
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-medium text-neutral-900">
          Behind the Scenes
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
        {ABOUT_US_IMAGES.behindTheScene.map((src, i) => (
          <Interactive3DCard key={i} maxTilt={14} glare={true}>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg border border-white/80 group">
              <Image src={src} alt="Crafting process" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Interactive3DCard>
        ))}
      </div>
    </section>
  );
}

function OurValuesSection() {
  const ourValues = [
    {
      icon: <FaHammer className="text-xl sm:text-2xl" />,
      title: "Authentic Craftsmanship",
      desc: "Every piece is meticulously handcrafted with attention to detail, ensuring exceptional quality and uniqueness.",
    },
    {
      icon: <FaLeaf className="text-xl sm:text-2xl" />,
      title: "Sustainable Materials",
      desc: "We are committed to using ethically sourced and sustainable materials to protect our planet.",
    },
    {
      icon: <FaHeart className="text-xl sm:text-2xl" />,
      title: "Personal Connection",
      desc: "Our jewelry is designed to be more than an accessory; it’s a way to connect with your own story and style.",
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-surface-base/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-primary font-display uppercase tracking-widest text-xs font-bold mb-2 block">
            What Drives Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-neutral-900">
            Our Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {ourValues.map((v, i) => (
            <Interactive3DCard key={i} maxTilt={15} glare={true}>
              <div className="p-8 bg-white/90 backdrop-blur-md border border-white rounded-3xl text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] h-full flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 shadow-sm">
                  {v.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold text-neutral-900 mb-3">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">{v.desc}</p>
              </div>
            </Interactive3DCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function FounderSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 sm:py-20 flex flex-col lg:flex-row items-center gap-12 sm:gap-16">
      <div className="w-full lg:w-2/5">
        <Interactive3DCard maxTilt={14} glare={true}>
          <div className="relative aspect-3/4 rounded-3xl overflow-hidden shadow-xl border border-white/80">
            <Image
              src={ABOUT_US_IMAGES.behindTheScene[1]}
              alt="Our Workshop"
              fill
              className="object-cover"
            />
          </div>
        </Interactive3DCard>
      </div>

      <div className="flex-1 space-y-5 text-left">
        <span className="uppercase text-primary font-bold text-xs tracking-widest block">
          Our Founder
        </span>
        <h3 className="text-3xl sm:text-4xl font-serif font-medium text-neutral-900">
          Meet <span className="text-primary">Arwa Peeth</span>
        </h3>
        <p className="text-neutral-700 text-base sm:text-lg leading-relaxed font-normal">
          It all started with a simple idea and a desire to create something
          beautiful and meaningful. From a small workbench in my home, this
          passion grew into a full-time dedication to crafting pieces that bring
          joy and celebrate individuality.
        </p>
        <p className="text-neutral-600 leading-relaxed text-sm sm:text-base font-normal">
          Each design is inspired by nature, art, and the stories of the amazing
          people I meet across Rajasthan and the world.
        </p>
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12 sm:py-20 text-center">
      <span className="inline-flex items-center gap-1.5 text-primary font-display uppercase tracking-widest text-xs font-bold mb-3">
        <RiSparklingLine className="text-base" /> Artisanal Excellence
      </span>
      <h2 className="text-3xl sm:text-5xl font-serif font-medium mb-6 text-neutral-900 leading-tight">
        Handcrafted with Love, Passion & 3D Precision
      </h2>
      <p className="text-neutral-700 text-base sm:text-xl max-w-2xl sm:max-w-3xl mx-auto leading-relaxed font-normal">
        Welcome to our world of handcrafted jewelry, where every piece is a
        labor of love. We believe in creating beautiful, timeless jewelry that
        tells a story and connects with you on a personal level.
      </p>
    </section>
  );
}

function HeroSection() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center bg-cover bg-center min-h-[45vh] sm:min-h-[60vh] px-4 py-16 sm:py-24 rounded-b-3xl overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(253, 251, 247, 0.4), rgba(253, 251, 247, 0.8)), url(${ABOUT_US_IMAGES.hero})`,
      }}
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <span className="inline-flex items-center gap-1.5 text-primary font-display uppercase tracking-widest text-xs font-bold mb-4 bg-white/80 px-4 py-1.5 rounded-full border border-white shadow-sm">
          <RiSparklingLine className="text-base" /> Tarmal Story
        </span>
        <h1 className="text-3xl sm:text-6xl font-serif font-medium text-neutral-900 mb-6 drop-shadow-sm leading-tight">
          Our Story, Woven into Every Piece.
        </h1>
        <p className="text-neutral-800 max-w-2xl mx-auto text-base sm:text-xl font-normal drop-shadow-sm">
          Discover the passion and craftsmanship behind our handcrafted jewelry,
          made with love from our home to yours.
        </p>
      </div>
    </section>
  );
}
