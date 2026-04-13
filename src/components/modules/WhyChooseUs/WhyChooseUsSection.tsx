import {
  BadgeCheck,
  Truck,
  RefreshCcw,
  CreditCard,
  Star,
  MessageCircle,
} from "lucide-react";
import { FeatureCard } from "./FeatureCard";
import type { TFeature, TTrustPoint } from "./WhyChooseUs.types";
import type { TStat } from "./WhyChooseUs.types";
import { StatItem } from "./StatItem";
import { TrustCard } from "./TrustCard";

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

const stats: TStat[] = [
  { value: "50,000+", label: "Happy customers" },
  { value: "2,000+", label: "Products available" },
  { value: "4.8 / 5", label: "Average rating" },
  { value: "64", label: "Districts covered" },
];

const trustPoints: TTrustPoint[] = [
  {
    title: "Verified seller since 2020",
    description:
      "Four years of trusted service with thousands of repeat customers across Bangladesh.",
  },
  {
    title: "Eco-conscious packaging",
    description:
      "We use recyclable materials for all deliveries as part of our commitment to the environment.",
  },
  {
    title: "Loyalty rewards program",
    description:
      "Earn points on every purchase and redeem them for discounts on your next order.",
  },
];

export const WhyChooseUsSection = () => {
  return (
    <section aria-labelledby="why-choose-us-heading" className="space-y-5 border-2 border-border p-5">
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
          We're more than just a store — we're committed to quality,
          convenience, and an online shopping experience you can trust.
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

      {/* Stats */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 rounded-xl border border-border overflow-hidden bg-background"
        aria-label="Martizo by the numbers"
      >
        {stats.map((s, i) => (
          <StatItem key={s.label} stat={s} isLast={i === stats.length - 1} />
        ))}
      </div>

      {/* Trust points */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
        aria-label="Our commitments"
      >
        {trustPoints.map((point) => (
          <TrustCard key={point.title} point={point} />
        ))}
      </div>
    </section>
  );
};
