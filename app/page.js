"use client";
import Link from "next/link";
import Image from "next/image";
import { HOME_IMAGES, products } from "src/data";
import ProductCard from "src/components/molecules/ProductCard";
import { addToCart } from "src/services/reducers/cartReducer";
import { useDispatch } from "react-redux";
import { setCategory } from "src/services/reducers/generalReducer";
import { CATEGORY_LIST } from "src/data";

/* Image URLs from your provided HTML */

export default function HomePage() {
  return (
    <main className="bg-bg text-base font-display">
      {/* HERO */}
      <Hero />

      {/* MOST LOVED */}

      <MostLoved />
      {/* EXPLORE COLLECTIONS */}
      <ExploreCollection />

      {/* OUR STORY */}
      <OurStory />

      {/* NEWSLETTER */}
      <NewsLetter />
    </main>
  );
}
function Hero() {
  return (
    <section
      className="flex flex-col items-center justify-center text-center min-h-[60vh] px-4 sm:px-6 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url(${HOME_IMAGES.hero})`,
      }}
    >
      <h1 className="text-bg text-4xl sm:text-6xl font-serif font-extrabold mb-3">
        Elegance, Handcrafted for You
      </h1>
      <p className="text-surface max-w-2xl text-lg mb-8">
        Discover our latest collection of unique, handcrafted jewelry made with
        love.
      </p>
      <Link
        href="/shop"
        className="inline-flex items-center justify-center h-12 sm:h-14 px-6 sm:px-8 bg-primary text-bg font-bold rounded-full hover:bg-primary/90 transition"
      >
        Shop New Collection
      </Link>
    </section>
  );
}

function MostLoved() {
  const dispatch = useDispatch();
  const featuredProducts = products.filter((p) => p.featured);
  return (
    <section className="py-12 sm:py-16">
      <h2 className="section-title font-serif">Our Most-Loved Pieces</h2>
      <div className="flex overflow-x-auto tabs-scroll-hide gap-4 px-4">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="shrink-0 w-[250px] sm:w-[280px] md:w-[300px]"
          >
            <ProductCard
              id={product.id}
              slug={product.slug}
              name={product.name}
              image={product.images?.[0]}
              price={product.price}
              soldOut={product.soldOut}
              onAddToCart={() => dispatch(addToCart(product))}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function ExploreCollection() {
  const dispatch = useDispatch();
  return (
    <section className="py-12 sm:py-16">
      <h2 className="text-center text-3xl font-serif font-bold mb-8">
        Explore Our Collections
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6  mx-auto px-4">
        {CATEGORY_LIST.map((c) => (
          <Link
            key={c.name}
            href="/shop"
            onClick={() => dispatch(setCategory(c.name))}
            className="relative rounded-xl overflow-hidden group aspect-square"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundImage: `url(${c.img})` }}
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative flex items-end h-full p-6">
              <h3 className="text-bg text-lg md:text-xl lg:text-3xl font-serif font-bold">
                {c.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function NewsLetter() {
  return (
    <section className="py-16 sm:py-20 bg-accent text-center">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold mb-2">Join The Club</h2>
        <p className="text-secondary mb-6">
          Sign up for exclusive offers, original stories, and a first look at
          our new collections.
        </p>
        <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-lg h-12 px-4 bg-bg border-none focus:ring-2 focus:ring-primary text-base placeholder:text-secondary"
          />
          <button
            type="submit"
            className="shrink-0 w-full sm:w-auto h-12 px-6 rounded-lg bg-primary text-bg font-bold hover:bg-primary/90 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
function OurStory() {
  return (
    <section className="py-12 sm:py-24">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4">
        <div className="rounded-xl overflow-hidden">
          <Image
            src={HOME_IMAGES.story}
            alt="Artisan crafting jewelry"
            width={600}
            height={750}
            className="rounded-xl object-cover"
          />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-serif font-bold mb-4">
            From Our Hands to Yours
          </h2>
          <p className="text-[#896175] mb-6">
            Each piece at Aura Jewels is more than just an accessory; it's a
            story of passion and meticulous craftsmanship. Every design is
            brought to life with love and attention to detail.
          </p>
          <Link
            href="/about"
            className="font-bold text-primary hover:underline"
          >
            Read Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}
