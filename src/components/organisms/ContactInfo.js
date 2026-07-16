"use client";

import { LuMail, LuPhoneCall } from "react-icons/lu";
import { FaMapMarker } from "react-icons/fa";
import { CONTACT_INFO } from "src/constants";

export default function ContactInfo() {
  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm p-6 sm:p-8">
      <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
      <div className="space-y-5 text-sm">
        <div className="flex items-start gap-4">
          <div className="mt-1 h-10 w-10 grid place-items-center rounded-full bg-primary/10 text-primary">
            <LuMail />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Email</p>
            <a
              href={`mailto:${CONTACT_INFO.EMAIL}`}
              className="text-muted hover:text-primary"
            >
              {CONTACT_INFO.EMAIL}
            </a>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="mt-1 h-10 w-10 grid place-items-center rounded-full bg-primary/10 text-primary">
            <LuPhoneCall />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Phone</p>
            <a
              href={`tel:${CONTACT_INFO.PHONE}`}
              className="text-muted hover:text-primary"
            >
              {CONTACT_INFO.PHONE}
            </a>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="mt-1 h-10 w-10 grid place-items-center rounded-full bg-primary/10 text-primary">
            <FaMapMarker />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Studio</p>
            <p className="text-muted">{CONTACT_INFO.ADDRESS}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
