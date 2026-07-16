"use client";

import { useState } from "react";
import { FiUser, FiMail, FiSend } from "react-icons/fi";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import TextArea from "../atoms/TextArea";
import { WEB3FORMS_CONTACT_US_ACCESS_KEY } from "src/config/config";

export default function ContactForm() {
  const initial = {
    name: "",
    email: "",
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

      const formData = new FormData();
      // Using whichever key is available, but recommending NEXT_PUBLIC_ for client-side
      const accessKey = WEB3FORMS_CONTACT_US_ACCESS_KEY;

      formData.append("access_key", accessKey);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("subject", `Website Enquiry from ${values.name}`); // Custom Subject

      formData.append("message", values.message);
      formData.append("from_name", "Tarmal Creation Website Enquiry");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSent(true);
        setValues(initial);
      } else {
        console.error("Submission error:", data);
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Failed to send message. Please check your connection.");
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
              <Input
                id="name"
                name="name"
                value={values.name}
                onChange={onChange}
                icon={FiUser}
                placeholder="Enter your full name"
                className={errors.name ? "border-danger" : ""}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-danger">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={onChange}
                icon={FiMail}
                placeholder="you@example.com"
                inputMode="email"
                className={errors.email ? "border-danger" : ""}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-danger">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <TextArea
              id="message"
              name="message"
              value={values.message}
              onChange={onChange}
              rows={6}
              placeholder="Write your message here…"
              className={errors.message ? "border-danger" : ""}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-danger">{errors.message}</p>
            )}
          </div>

          <Button type="submit" disabled={sending} className="w-full">
            {sending ? (
              "Sending…"
            ) : (
              <span className="flex items-center gap-2">
                Send Message <FiSend />
              </span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
