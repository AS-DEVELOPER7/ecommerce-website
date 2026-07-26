"use client";

import Link from "next/link";
import ContactInfo from "src/components/organisms/ContactInfo";
import ContactLocation from "src/components/organisms/ContactLocation";
import ContactForm from "src/components/organisms/ContactForm";
import Interactive3DCard from "src/components/3d/Interactive3DCard";
import ParticleBackground3D from "src/components/3d/ParticleBackground3D";
import { RiSparklingLine, RiArrowLeftLine } from "react-icons/ri";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-neutral-900 text-sm sm:text-base relative overflow-hidden pb-16">
      <ParticleBackground3D />

      <div className="relative z-10">
        {/* Top bar */}
        <div className="container mx-auto px-4 sm:px-6 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-primary font-medium transition-colors"
          >
            <RiArrowLeftLine className="text-lg" />
            Back to Home
          </Link>
        </div>

        {/* Title */}
        <section className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 text-primary font-display uppercase tracking-widest text-xs font-bold mb-3">
              <RiSparklingLine className="text-base animate-pulse" /> We're Here For You
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-medium text-neutral-900 tracking-tight">
              Get in Touch
            </h1>
            <p className="mt-4 text-neutral-600 text-base sm:text-lg font-normal">
              For custom jewelry orders, questions, or bespoke consultations, connect with our master artisans.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form wrapped in 3D Card */}
            <div className="lg:col-span-3">
              <Interactive3DCard maxTilt={8} glare={true}>
                <div className="bg-white/90 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-white shadow-[0_15px_35px_rgba(0,0,0,0.06)]">
                  <ContactForm />
                </div>
              </Interactive3DCard>
            </div>

            {/* Contact info + Map */}
            <div className="lg:col-span-2 space-y-8">
              <Interactive3DCard maxTilt={10} glare={true}>
                <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white shadow-[0_15px_35px_rgba(0,0,0,0.06)]">
                  <ContactInfo />
                </div>
              </Interactive3DCard>

              <Interactive3DCard maxTilt={10} glare={true}>
                <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white shadow-[0_15px_35px_rgba(0,0,0,0.06)] overflow-hidden">
                  <ContactLocation />
                </div>
              </Interactive3DCard>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
