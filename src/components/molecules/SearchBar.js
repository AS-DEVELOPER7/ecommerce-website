"use client";

import { useState, useEffect } from "react";
import Input from "../atoms/Input";
import { RiSearchLine } from "react-icons/ri";
import { useDebounce } from "src/hooks/useDebounce";

export default function SearchBar({ initialValue = "", onSearch, placeholder = "Search..." }) {
  const [localValue, setLocalValue] = useState(initialValue);
  const debouncedValue = useDebounce(localValue, 500);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <Input
      icon={RiSearchLine}
      placeholder={placeholder}
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
    />
  );
}
