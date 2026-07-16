"use client";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  setAddress,
  setPayment,
  clearCart,
} from "src/services/reducers/cartReducer";
import { useToast } from "src/components/ui/ToastProvider";
import { money } from "src/utils/money";
import {
  SHIPPING_THRESHOLD,
  SHIPPING_COST,
  FREE_SHIPPING_CITY,
  CONTACT_INFO,
  WHATSAPP_NUMBER,
} from "src/constants";

import Stepper from "src/components/molecules/Stepper";
import CheckoutSummary from "src/components/organisms/CheckoutSummary";
import ShippingDetailsForm from "src/components/organisms/ShippingDetailsForm";
import PaymentOptions from "src/components/organisms/PaymentOptions";
import ReviewOrderDetails from "src/components/organisms/ReviewOrderDetails";
import { WEB3FORMS_NEW_ORDER_ACCESS_KEY } from "src/config/config";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { show } = useToast();

  const items = useSelector((s) => s.cart?.items ?? []);
  const savedAddress = useSelector((s) => s.cart?.address ?? {});
  const savedPayment = useSelector((s) => s.cart?.payment ?? "");

  const [step, setStep] = useState(1);
  const [sending, setSending] = useState(false);
  const [payMethod, setPayMethod] = useState(savedPayment.method || "whatsapp");

  const [addr, setAddr] = useState({
    name: savedAddress.name || "",
    street: savedAddress.street || "",
    city: savedAddress.city || "",
    state: savedAddress.state || "",
    zip: savedAddress.zip || "",
    email: savedAddress.email || "",
    phone: savedAddress.phone || "",
    country: savedAddress.country || "",
  });
  const [errors, setErrors] = useState({}); // { field: "message" }

  const isCartEmpty = items.length === 0;
  const subtotal = useMemo(
    () => items.reduce((s, it) => s + it.price * it.qty, 0),
    [items],
  );

  const isInFreeCity =
    addr.city?.trim().toLowerCase() === FREE_SHIPPING_CITY?.toLowerCase();
  const isFreeShipping = subtotal >= SHIPPING_THRESHOLD || isInFreeCity;
  const effectiveShipping = isFreeShipping ? 0 : SHIPPING_COST;
  const total = (subtotal + effectiveShipping).toFixed(2);

  /* ---------- validations ---------- */
  const requiredFields = ["name", "street", "city", "zip", "email"];
  const validateShipping = () => {
    const next = {};
    for (const f of requiredFields) {
      if (!String(addr[f] || "").trim()) next[f] = "Required";
    }
    if (addr.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addr.email)) {
      next.email = "Invalid email";
    }
    if (
      addr.phone &&
      addr.phone.replace(/\D/g, "").length > 0 &&
      addr.phone.replace(/\D/g, "").length < 7
    ) {
      next.phone = "Phone seems too short";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validatePayment = () => {
    if (!["whatsapp", "card", "paypal"].includes(payMethod)) {
      show({ type: "error", title: "Select a payment method" });
      return false;
    }
    return true;
  };

  const invalid = (name) =>
    errors[name]
      ? "border-rose-400 focus:ring-rose-400"
      : "border-border focus:ring-primary";

  /* ---------- step handlers ---------- */
  const goNextFromShipping = () => {
    if (isCartEmpty) {
      show({ type: "error", title: "Your cart is empty" });
      return;
    }
    if (!validateShipping()) {
      show({ type: "error", title: "Please fix the highlighted fields" });
      return;
    }
    dispatch(setAddress(addr));
    setStep(2);
    show({ type: "success", title: "Address saved" });
  };

  const goNextFromPayment = () => {
    if (!validatePayment()) return;
    dispatch(setPayment({ method: payMethod }));
    setStep(3);
  };

  const placeOrder = async () => {
    if (isCartEmpty) {
      show({ type: "error", title: "Your cart is empty" });
      return;
    }
    if (!validateShipping()) {
      setStep(1);
      show({ type: "error", title: "Shipping info incomplete" });
      return;
    }
    if (!validatePayment()) {
      setStep(2);
      return;
    }

    try {
      setSending(true);

      const accessKey = WEB3FORMS_NEW_ORDER_ACCESS_KEY;
      if (!accessKey) {
        console.error("Missing NEXT_PUBLIC_WEB3FORMS_NEW_ORDER_ACCESS_KEY");
        throw new Error("Configuration error: Missing API access key.");
      }

      // 1. Prepare Order Details
      const itemsList = items
        .map((it) => {
          let desc = `- ${it.qty}x ${it.name}`;
          const details = [];
          if (it.color) details.push(`Color: ${it.color}`);
          if (it.size) details.push(`Size: ${it.size}`);
          if (details.length > 0) {
            desc += ` (${details.join(", ")})`;
          }
          desc += ` [${money(it.price)}]`;
          return desc;
        })
        .join("\n");

      const addressStr = `${addr.name}\n${addr.street}\n${addr.city}, ${addr.state} ${addr.zip}\n${addr.phone}\n${addr.email}`;
      const summaryText = `Subtotal: ${money(subtotal)}\nShipping: ${isFreeShipping ? "Free" : money(effectiveShipping)}\nTotal: ${money(total)}`;

      const fullOrderDetails = `*Shipping Address:*\n${addressStr}\n\n*Items:*\n${itemsList}\n\n*Summary:*\n${summaryText}\n*Payment Method:* ${payMethod}`;

      // 2. Send Email via Web3Forms
      const formData = new FormData();
      formData.append("access_key", accessKey);
      formData.append("name", addr.name);
      formData.append("email", addr.email);
      formData.append(
        "subject",
        `New Order from ${addr.name} - ${money(total)}`,
      );
      formData.append("order_details", fullOrderDetails);
      formData.append("from_name", "Tarmal Creation Order System");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to send order notification");
      }

      // 3. Open WhatsApp as well (as per current flow)
      const encodedText = encodeURIComponent(
        `*New Order!*\n${fullOrderDetails}`,
      );
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`,
        "_blank",
      );

      // 4. Finalize
      dispatch(clearCart());
      show({
        type: "success",
        title: "Order placed!",
        description: `Total ${money(total)}`,
      });
      setTimeout(() => router.push("/"), 900);
    } catch (error) {
      console.error("Order error:", error);
      let description = "We couldn't process your order. Please try again.";

      // Detect if it's likely an ad-blocker or network issue
      if (error instanceof TypeError && error.message.includes("fetch")) {
        description =
          "Network error. This is often caused by ad-blockers blocking our order system. Please disable them and try again.";
      } else if (error.message) {
        description = error.message;
      }

      show({
        type: "error",
        title: "Submission failed",
        description,
        duration: 8000, // Show for longer if it's an error
      });
    } finally {
      setSending(false);
    }
  };

  /* ---------- UI ---------- */
  return (
    <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <Stepper step={step} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-10 lg:gap-14">
        {/* LEFT SIDE */}
        <section className="space-y-8">
          {step === 1 && (
            <ShippingDetailsForm
              invalid={invalid}
              addr={addr}
              setAddr={setAddr}
              errors={errors}
              goNextFromShipping={goNextFromShipping}
              isFreeShipping={isFreeShipping}
              shippingCost={effectiveShipping}
            />
          )}

          {step === 2 && (
            <PaymentOptions
              setPayMethod={setPayMethod}
              payMethod={payMethod}
              setStep={setStep}
              goNextFromPayment={goNextFromPayment}
            />
          )}

          {step === 3 && (
            <ReviewOrderDetails
              setStep={setStep}
              addr={addr}
              payMethod={payMethod}
              items={items}
              placeOrder={placeOrder}
              sending={sending}
            />
          )}
        </section>

        {/* RIGHT SIDE */}
        <CheckoutSummary items={items} shippingCharge={effectiveShipping} />
      </div>
    </main>
  );
}
