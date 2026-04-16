import { TestimonialCard } from "./TestimonialCard";
import Marquee from "react-fast-marquee";

const testimonialsToRight = [
  {
    name: "Probash Khan",
    meta: "Verified buyer · Home & Living",
    initials: "PK",
    avatarClass: "bg-primary/10 text-primary",
    rating: 4.5,
    quote:
      "Martizo has completely changed how I shop online. The quality of every product I've ordered has been exceptional — exactly as described, and delivered super fast.",
  },
  {
    name: "Tanvir Hossain",
    meta: "Verified buyer · Electronics",
    initials: "TH",
    avatarClass: "bg-blue-100 text-blue-700",
    rating: 5,
    quote:
      "I was a bit skeptical at first, but the customer support team was incredibly responsive. My package arrived in perfect condition, and the return process was seamless.",
  },
  {
    name: "Nadia Jahan",
    meta: "Verified buyer · Fashion",
    initials: "NJ",
    avatarClass: "bg-amber-100 text-amber-700",
    rating: 4,
    quote:
      "Great variety of products and really competitive prices. Shipping could be a tiny bit faster, but overall I'm very happy and will definitely be ordering again soon.",
  },
  {
    name: "Motaleb Hossain",
    meta: "Verified buyer · Home & Living",
    initials: "MH",
    avatarClass: "bg-primary/10 text-primary",
    rating: 4.5,
    quote:
      "Martizo has completely changed how I shop online. The quality of every product I've ordered has been exceptional — exactly as described, and delivered super fast.",
  },
];

const testimonialsToLeft = [
  {
    name: "Tanzim Ahmed",
    meta: "Verified buyer · Electronics",
    initials: "TA",
    avatarClass: "bg-blue-100 text-blue-700",
    rating: 5,
    quote:
      "I was a bit skeptical at first, but the customer support team was incredibly responsive. My package arrived in perfect condition, and the return process was seamless.",
  },
  {
    name: "Prakash Das",
    meta: "Verified buyer · Fashion",
    initials: "PD",
    avatarClass: "bg-amber-100 text-amber-700",
    rating: 4,
    quote:
      "Great variety of products and really competitive prices. Shipping could be a tiny bit faster, but overall I'm very happy and will definitely be ordering again soon.",
  },
  {
    name: "Mritayanjoy Mondal",
    meta: "Verified buyer · Fashion",
    initials: "MM",
    avatarClass: "bg-amber-100 text-amber-700",
    rating: 4,
    quote:
      "Great variety of products and really competitive prices. Shipping could be a tiny bit faster, but overall I'm very happy and will definitely be ordering again soon.",
  },
  {
    name: "Moni Saker",
    meta: "Verified buyer · Home & Living",
    initials: "MS",
    avatarClass: "bg-primary/10 text-primary",
    rating: 4.5,
    quote:
      "Martizo has completely changed how I shop online. The quality of every product I've ordered has been exceptional — exactly as described, and delivered super fast.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="p-5 bg-secondary/40">
      <div className="mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-sm font-medium tracking-widest text-primary uppercase mb-2">
            What our customers say
          </p>
          <h2 className="text-2xl font-bold text-foreground mb-1">
            Loved by thousands of shoppers
          </h2>
          <p className="text-base text-muted-foreground">
            Real reviews from real Martizo customers
          </p>
        </div>

        {/* Cards */}

        <Marquee
          pauseOnHover
          speed={20}
          className="py-4"
          direction="left"
        >
          <div className="flex gap-5">
            {testimonialsToLeft.map((item) => (
              <div key={item.name} className="mx-2.5">
                <TestimonialCard {...item} />
              </div>
            ))}
          </div>
        </Marquee>
        <Marquee
          pauseOnHover
          speed={20}
          className="py-4"
          direction="right"
        >
          <div className="flex gap-5">
            {testimonialsToRight.map((item) => (
              <div key={item.name} className="mx-3">
                <TestimonialCard {...item} />
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default TestimonialsSection;
