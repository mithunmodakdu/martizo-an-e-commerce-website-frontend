import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useId, useState } from "react";
import { useNavigate } from "react-router";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    handleSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  const handleSearch = (value: string) => {
    if (value) {
      navigate(`/products?searchTerm=${value}`);
    } 
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setDebouncedSearchQuery(searchQuery);
    }
  };

  const id = useId();
  return (
    <div className="grow">
      <div className="relative mx-auto w-full max-w-lg">
      <Input
        id={id}
        className="peer h-12 ps-8 pe-10"
        placeholder="Search..."
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/80 peer-disabled:opacity-50">
        <SearchIcon size={16} />
      </div>
    </div>
    </div>
  );
};

export default SearchBox;
