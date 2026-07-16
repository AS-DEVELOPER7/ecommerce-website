"use client";

import Link from "next/link";
import ContactInfo from "src/components/organisms/ContactInfo";
import ContactLocation from "src/components/organisms/ContactLocation";
import ContactForm from "src/components/organisms/ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bg text-sm sm:text-base">
      {/* Top bar (optional breadcrumb / back) */}
      <div className="container mx-auto px-4 sm:px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary"
        >
          <span className="i-lucide-arrow-left" />
          Back to Home
        </Link>
      </div>

      {/* Title */}
      <section className="container mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold tracking-tight">
            Get in Touch
          </h1>
          <p className="mt-3 text-muted">
            For custom orders, questions, or just to say hello, please use the
            form below.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 sm:px-6 ">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <ContactForm />
          {/* Contact info + Map */}
          <div className="lg:col-span-2 space-y-8">
            <ContactInfo />
            <ContactLocation />
          </div>
        </div>
      </section>
    </main>
  );
}
