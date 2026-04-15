import { TestimonialCard } from "./TestimonialCard";

const testimonials = [
  {
    name: "Sarah Rahman",
    meta: "Verified buyer · Home & Living",
    initials: "SR",
    avatarClass: "bg-primary/10 text-primary",
    rating: 5,
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
];

const TestimonialsSection = () =>{
  return (
    <section className="p-5 bg-secondary/40">
      <div className="max-w-5xl mx-auto">

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((item) => (
            <TestimonialCard key={item.name} {...item} />
          ))}
        </div>


       

       

      </div>
    </section>
  );
}

export default TestimonialsSection;