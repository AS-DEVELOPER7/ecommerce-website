"use client";

import Image from "next/image";
import Link from "next/link";
import { FaHammer, FaLeaf, FaHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark text-brand-charcoal dark:text-gray-200">
      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center text-center bg-cover bg-center min-h-[60vh] px-4 py-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCnqhdrfXVgozdaQp7Jp3WR0OXKVLM0fZSaWjQDbJs0SyschhOblUWdMPqp1oeiEJpwNmG9o9INjnxqJzEe_fB3j2YNcwPUOcCwDUzXMvfeFBTX1gOSN8tacwFtRRioU8bhGaIYYuRDz26UvRbnKXG4B1y5uL70TGUnm7hQhj5W_4eHEavUdxOSqFtam6F9kwPOT8ijha5nMcjQWkoDyrhag5zhIKS_hnd9bqr8EpLD5GQmR0nylJDeX76BsP6XGogYhKihXWn8xb3h')",
        }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3">
          Our Story, Woven into Every Piece.
        </h1>
        <p className="text-white max-w-2xl text-base md:text-lg">
          Discover the passion and craftsmanship behind our handcrafted jewelry,
          made with love from our home to yours.
        </p>
      </section>

      {/* Intro */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Handcrafted with Love and Passion
        </h2>
        <p className="text-base text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Welcome to our world of handcrafted jewelry, where every piece is a
          labor of love. We believe in creating beautiful, timeless jewelry that
          tells a story and connects with you on a personal level.
        </p>
      </section>

      {/* Founder */}
      <section className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-10">
        <div className="w-full lg:w-2/5">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPZaiYml0GZ_Ye9u8dVRJm1ysnel-C4PgoyHiB-osBfyDjl0u2icJqmBQ1rWrtmjugcCRiR8ZVz7ivI7ztLwdTSYC3svaZx6Qe-ZX20hgTQQVGmg6VeWlSuRuREyC6k4q35GARhiJfdyzuELaugqEPZAEgOyoN7lTW748PocZG9Zb5NqCYMZX_pam0HePyWzvATkflY4XPBgZ4_r_lyica_ciJj0XK5wLZiaP2GKqG0b6xBRYde31vShGMxGKpV-gA3cMuaRCWJqne"
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
          <h3 className="text-2xl md:text-3xl font-bold">
            Meet <span className="text-primary">Jane Doe</span>
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            It all started with a simple idea and a desire to create something
            beautiful and meaningful. From a small workbench in my home, this
            passion grew into a full-time dedication to crafting pieces that
            bring joy and celebrate individuality.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Each design is inspired by nature, art, and the stories of the
            amazing people I meet.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white dark:bg-background-dark py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {[
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
          ].map((v, i) => (
            <div
              key={i}
              className="p-6 bg-background-light dark:bg-background-dark border border-border rounded-xl text-center shadow-sm"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 text-primary mx-auto mb-4">
                {v.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{v.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Behind the Scenes */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Behind the Scenes
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBARjdt3HtdPoZPmGJ_brke_dBNyXU_U0hl3Wk0Mqkt9GsVks6L-AXni6irMwysC6iVuvbsfMj8SHuyoEExbwEHiEatu4-ktXNo8u3bFeoPkvZs10Oj1lLC4FMIqMJKQCu5BCkKPo7U5H9SwJT6-xe9PsYSzc437_4_f-SiTKVeCSxJTHOQshuP-RBhT77ouU6Ecg39JrV1vY9TZzbktftWnVFpurgM9vJQsFyBN-kjwaJL6MxStN1MmtT3crwjnwhkdYcajw1oQbzo",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCzWRPlFgmrFlLoTTOoPnfzecm9xaCkXgdu6G0QM7BbBtQgzM2treNEQwHL6nzGCO-laAbRvvsUpSxxoATW8-iEOX0U_QvoO99F8FIX22wsbitLIpx2Y1QAhnyV8KLvT6Ez_BMUnsQ38xo1zlEn3Vq71A6q3aZ0B1TA_o2dpEVA_XzqUgG_lIIE3uCMcbkjtgCWvsa0rB_WwSE8HlbwePVudiyD7p0xEPrrumEp4ENWtm5qERFk1Y8jx8dZYyWlp-zAmnNYKu1woZp6",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuC_7g9SbaHw4yYkHVeJhaUJFE2Bi6Nn54lV0_KTSoaFY5jOiiaVrSDLZuoVnXNS7crhhk9u4a7AHRRHy86T9Z8bGaCSZamK92TMO7SEqkpQY88rTSj4f4VJBK1nMJQ_WV1ye5WRlajGBlY0BBkGsDqbiWpLwXzTSR_C9JsgR0hpqzPIJD3CMJ3FibRrnMRaVKHzmFx_EFKprc6ESlE3yEzKngfws-kxevdDYpxd41_bemFXYP3uJJyKtKI54pmTiqCPmk9iWOW_q51L",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAEW_lUHwwxid9H2D_5s9UVIL81sJwavQGIyhnuL-09Hw8nIQFX9eSaHl_E0eOa-swzBhhd6z6TXW465d9P-L6YCCuDmzXV8Ugwet_GbIQ0AfPd_SNfEIWKxGjzMP3cuunHint6lF_dCT2BFw9DVcUsxWJTkRIcoWZxEBGBrbVBxDCwEnaPLgVhtzHpgZzJoUBJ7Z7ALknAebLRWcBnvvs0PrBaMi_xMez5wCWf9IKnOXuMpwt_Stfs-crwsuGyLe_m4NNIedQFElNa",
          ].map((src, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-lg overflow-hidden"
            >
              <Image src={src} alt="Crafting" fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 px-6 bg-gradient-to-b from-brand-soft-pink/70 to-white">
        <h3 className="text-3xl font-bold mb-3">
          Find a Piece that Tells Your Story
        </h3>
        <p className="max-w-xl mx-auto mb-6 text-gray-600 dark:text-gray-300">
          Explore our collections and discover handcrafted jewelry that’s as
          unique as you are.
        </p>
        <button
          onClick={() => router.push("/shop")}
          className="inline-flex h-12 px-6 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition"
        >
          Explore Jewelry
        </button>
      </section>
    </main>
  );
}
