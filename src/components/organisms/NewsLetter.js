"use client";

import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { motion } from "framer-motion";

export default function NewsLetter() {
  return (
    <section className="py-24 bg-surface-base relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      
      <div className="max-w-2xl mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-display uppercase tracking-widest text-sm font-semibold mb-4 block">Join The Club</span>
          <h2 className="text-4xl sm:text-5xl font-serif font-medium mb-6">Stay in the loop</h2>
          <p className="text-muted mb-10 text-lg">
            Sign up for exclusive offers, original stories, and a first look at
            our new collections curated just for you.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-white h-[56px] rounded-full border-transparent shadow-sm"
              />
            </div>
            <Button type="submit" variant="primary" className="h-[56px] rounded-full px-8 shrink-0">
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-muted/60 mt-4">
            By subscribing, you agree to our Terms of Service & Privacy Policy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
