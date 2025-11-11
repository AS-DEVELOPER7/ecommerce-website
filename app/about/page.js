"use client";

import Image from "next/image";
import { FaHammer, FaLeaf, FaHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ABOUT_US_IMAGES } from "src/data";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark text-brand-charcoal dark:text-gray-200">
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
    </main>
  );
}
function JewelryCTA() {
  const router = useRouter();
  return (
    <section className="text-center py-16 px-6 bg-accent">
      <h3 className="text-3xl font-bold mb-3 text-primary">
        Find a Piece that Tells Your Story
      </h3>
      <p className="max-w-xl mx-auto mb-6 text-muted">
        Explore our collections and discover handcrafted jewelry that’s as
        unique as you are.
      </p>
      <button
        onClick={() => router.push("/shop")}
        className="inline-flex  p-4 px-8 bg-primary text-bg font-semibold rounded-full hover:bg-primary/90 transition"
      >
        Explore Jewelry
      </button>
    </section>
  );
}

function BehindTheScenes() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        Behind the Scenes
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ABOUT_US_IMAGES.behindTheScene.map((src, i) => (
          <div
            key={i}
            className="relative aspect-square rounded-lg overflow-hidden"
          >
            <Image src={src} alt="Crafting" fill className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

function OurValuesSection() {
  const ourValues = [
    {
      icon: <FaHammer className="text-3xl" />,
      title: "Authentic Craftsmanship",
      desc: "Every piece is meticulously handcrafted with attention to detail, ensuring exceptional quality and uniqueness.",
    },
    {
      icon: <FaLeaf className="text-3xl" />,
      title: "Sustainable Materials",
      desc: "We are committed to using ethically sourced and sustainable materials to protect our planet.",
    },
    {
      icon: <FaHeart className="text-3xl" />,
      title: "Personal Connection",
      desc: "Our jewelry is designed to be more than an accessory; it’s a way to connect with your own story and style.",
    },
  ];
  return (
    <section className="text-primary py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {ourValues.map((v, i) => (
          <div
            key={i}
            className="p-6   border border-border rounded-xl text-center shadow-sm"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 text-primary mx-auto mb-4">
              {v.icon}
            </div>
            <h3 className="font-semibold text-base text-lg mb-2">{v.title}</h3>
            <p className="text-sm text-muted ">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FounderSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-10">
      <div className="w-full lg:w-2/5">
        <div className="relative aspect-3/4 rounded-lg overflow-hidden shadow-md">
          <Image
            src={ABOUT_US_IMAGES.founder}
            alt="Founder Portrait"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex-1 space-y-4">
        <p className="uppercase text-primary font-semibold tracking-wider">
          Our Founder
        </p>
        <h3 className="text-2xl text-base md:text-3xl font-bold">
          Meet <span className="text-primary">Jane Doe</span>
        </h3>
        <p className="text-muted  leading-relaxed">
          It all started with a simple idea and a desire to create something
          beautiful and meaningful. From a small workbench in my home, this
          passion grew into a full-time dedication to crafting pieces that bring
          joy and celebrate individuality.
        </p>
        <p className="text-muted leading-relaxed">
          Each design is inspired by nature, art, and the stories of the amazing
          people I meet.
        </p>
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="max-w-5xl text-primary mx-auto px-6 py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Handcrafted with Love and Passion
      </h2>
      <p className=" text-muted  max-w-3xl mx-auto">
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
      className="flex flex-col items-center justify-center text-center bg-cover bg-center min-h-[60vh] px-4 py-20"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url(${ABOUT_US_IMAGES.hero})`,
      }}
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-bg mb-3">
        Our Story, Woven into Every Piece.
      </h1>
      <p className="text-surface max-w-2xl  md:text-lg">
        Discover the passion and craftsmanship behind our handcrafted jewelry,
        made with love from our home to yours.
      </p>
    </section>
  );
}
