import {
  BadgeCheck,
  Truck,
  RefreshCcw,
  CreditCard,
  Star,
  MessageCircle,
} from "lucide-react";
import { FeatureCard } from "./FeatureCard";
import type { TFeature } from "./WhyChooseUs.types";

const features: TFeature[] = [
  {
    icon: <BadgeCheck className="w-10 h-10" aria-hidden="true" />,
    title: "100% authentic products",
    description:
      "Every item is sourced directly from verified suppliers. No counterfeits, no compromises — only genuine quality.",
  },
  {
    icon: <Truck className="w-10 h-10" aria-hidden="true" />,
    title: "Fast nationwide delivery",
    description:
      "Orders dispatched within 24 hours. We deliver across Bangladesh with real-time tracking on every shipment.",
  },
  {
    icon: <RefreshCcw className="w-10 h-10" aria-hidden="true" />,
    title: "Hassle-free returns",
    description:
      "Not satisfied? Return within 7 days for a full refund or exchange — no questions asked, no hidden fees.",
  },
  {
    icon: <CreditCard className="w-10 h-10" aria-hidden="true" />,
    title: "Secure payments",
    description:
      "Pay with bKash, Nagad, cards, or cash on delivery. All transactions are encrypted and fully protected.",
  },
  {
    icon: <Star className="w-10 h-10" aria-hidden="true" />,
    title: "Curated product selection",
    description:
      "Our team handpicks every product so you always find the best items across every category without endless scrolling.",
  },
  {
    icon: <MessageCircle className="w-10 h-10" aria-hidden="true" />,
    title: "24/7 customer support",
    description:
      "Got a question? Our friendly support team is available around the clock via chat, call, or WhatsApp.",
  },
];

export default function WhyChooseUs() {
  return (
    <section aria-labelledby="why-choose-us-heading" className="space-y-5 w-4/5 mx-auto p-5">

      {/* WhyChooseUs Heading */}
      <div className="space-y-2 max-w-xl">
        <p className="text-sm font-medium tracking-widest uppercase text-primary">
          Our promise
        </p>
        <h2
          id="why-choose-us-heading"
          className="text-2xl font-bold text-foreground"
        >
          Why choose Martizo?
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          We're more than just a store — we're committed to quality, convenience,
          and an online shopping experience you can trust.
        </p>
      </div>

      {/* Feature cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        aria-label="Our key features"
      >
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>

    </section>
  );
}

