"use client";

import { useState } from "react";
import Link from "next/link";
import { LuLocate, LuMail, LuPhoneCall } from "react-icons/lu";
import { FaMapMarker } from "react-icons/fa";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bg text-base">
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
          <h1 className="text-4xl sm:text-5xl font-serif font-extrabold tracking-tight">
            Get in Touch
          </h1>
          <p className="mt-3 text-muted">
            For custom orders, questions, or just to say hello, please use the
            form below.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <FormSection />
          {/* Contact info + Map */}
          <div className="lg:col-span-2 space-y-8">
            <ContactUs />
            <ContactLocation />
          </div>
        </div>
      </section>
    </main>
  );
}
function ContactUs() {
  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm p-6 sm:p-8">
      <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
      <div className="space-y-5 text-sm">
        <div className="flex items-start gap-4">
          <div className="mt-1 h-10 w-10 grid place-items-center rounded-full bg-primary/10 text-primary">
            <LuMail />
          </div>
          <div>
            <p className="font-semibold">Email</p>
            <a
              href="mailto:hello@jewelrybyhand.com"
              className="text-muted hover:text-primary"
            >
              hello@jewelrybyhand.com
            </a>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="mt-1 h-10 w-10 grid place-items-center rounded-full bg-primary/10 text-primary">
            <LuPhoneCall />
          </div>
          <div>
            <p className="font-semibold">Phone</p>
            <a href="tel:+1234567890" className="text-muted hover:text-primary">
              +1 (234) 567-890
            </a>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="mt-1 h-10 w-10 grid place-items-center rounded-full bg-primary/10 text-primary">
            <FaMapMarker />
          </div>
          <div>
            <p className="font-semibold">Studio</p>
            <p className="text-muted">
              San Francisco, CA (By appointment only)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactLocation() {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Our Studio Location</h3>
      <div className="aspect-video overflow-hidden rounded-xl border border-border">
        <iframe
          className="w-full h-full"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.257766155255!2d-122.42172042456434!3d37.78310797198192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8ba535%3A0x42f72535075f1b67!2sUnion%20Square%2C%20San%20Francisco%2C%20CA%2094108%2C%20USA!5e0!3m2!1sen!2suk!4v1698246738944!5m2!1sen!2suk"
          style={{ border: 0 }}
        />
      </div>
    </div>
  );
}

function FormSection() {
  const initial = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  function validate(values) {
    const errs = {};
    if (!values.name.trim()) errs.name = "Full name is required.";
    if (!values.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!values.subject.trim()) errs.subject = "Subject is required.";
    if (!values.message.trim()) errs.message = "Message is required.";
    return errs;
  }

  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    const { id, value } = e.target;
    setValues((s) => ({ ...s, [id]: value }));
    if (errors[id]) setErrors((s) => ({ ...s, [id]: undefined })); // clear field error as user types
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    try {
      setSending(true);
      // If you wire an API route later, call it here:
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify(values) });
      await new Promise((r) => setTimeout(r, 900)); // mock request
      setSent(true);
      setValues(initial);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="lg:col-span-3">
      <div className="bg-surface rounded-xl border border-border shadow-sm p-6 sm:p-8">
        {sent && (
          <div className="mb-6 rounded-lg border border-success bg-success-bg text-success px-4 py-3">
            ✅ Thanks! Your message has been sent. We’ll get back to you soon.
          </div>
        )}
        <form className="space-y-6" onSubmit={onSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={values.name}
                onChange={onChange}
                className={`w-full rounded-lg border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.name ? "border-danger" : "border-border"
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-danger">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={values.email}
                onChange={onChange}
                className={`w-full rounded-lg border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email ? "border-danger" : "border-border"
                }`}
                placeholder="you@example.com"
                inputMode="email"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-danger">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={values.subject}
              onChange={onChange}
              className={`w-full rounded-lg border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.subject ? "border-danger" : "border-border"
              }`}
              placeholder="e.g., Custom Order Inquiry"
            />
            {errors.subject && (
              <p className="mt-1 text-xs text-danger">{errors.subject}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={values.message}
              onChange={onChange}
              rows={6}
              className={`w-full rounded-lg border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.message ? "border-danger" : "border-border"
              }`}
              placeholder="Write your message here…"
            />
            {errors.message && (
              <p className="mt-1 text-xs text-danger">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full h-12 rounded-lg bg-primary text-white font-bold hover:opacity-90 disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
