import React from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div
      className="
        w-1/2 h-fit bg-card-dark px-2 gap-2 flex items-center rounded-lg border border-border-dark focus-within:ring-2 focus-within:ring-primary/50  focus-within:border-primary/50 transition-all"
    >
      <Search className="text-muted-dark" />
      <input
        type="search"
        placeholder="Search tasks..."
        className=" w-full py-2 outline-none border-none placeholder:text-muted-dark text-text-dark "
      />
    </div>
  );
};

export default SearchBar;
