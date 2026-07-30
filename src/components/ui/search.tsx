import * as React from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { Input } from "./input";

export interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Search({ value, onChange, placeholder = "Search..." }: SearchProps) {
  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-8"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
