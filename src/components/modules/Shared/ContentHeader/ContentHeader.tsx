import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { IContentHeaderProps } from "./contentHeader.interface";
import { Link } from "react-router";

const ContentHeader = (props: IContentHeaderProps) => {
  const { subTitle, title, highlightedWord, description, btnText, btnLink } =
    props;
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
      <div>
       {subTitle && ( <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-px" style={{ background: "var(--primary)" }} />
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "var(--primary)" }}
          >
            {subTitle}
          </span>
        </div>)}
        <h2
          className="text-2xl font-bold tracking-tight leading-tight"
          style={{
            color: "var(--foreground)",
            fontFamily: "'Georgia', serif",
          }}
        >
          {title && title}{" "}
          <span style={{ color: "var(--primary)" }}>{highlightedWord && highlightedWord}</span>
        </h2>
        {description && (<p
          className="mt-2 text-base max-w-lg"
          style={{ color: "var(--muted-foreground)" }}
        >
          {description}
        </p>)}
      </div>

      {btnText && btnLink && (
        <Link to={btnLink}>
          <Button
            variant="outline"
            size="sm"
            className="self-start sm:self-auto border-primary text-primary hover:bg-primary/10 hover:text-primary cursor-pointer"
          >
            {btnText} <ArrowRight size={14} />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ContentHeader;
