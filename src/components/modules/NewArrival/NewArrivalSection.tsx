import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const NewArrivalSection = () => {
  return (
    <section>
       {/* Heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-8">
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-primary mb-1.5">
            Just dropped
          </p>
          <h2
            id="new-arrivals-heading"
            className="text-xl sm:text-2xl font-medium text-foreground"
          >
            New arrivals
          </h2>
        </div>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="self-start sm:self-auto border-primary text-primary hover:bg-primary/10 hover:text-primary"
        >
          <Link to="/products?isNewArrival=true">View all new arrivals</Link>
        </Button>
      </div>

    </section>
  );
};

export default NewArrivalSection;