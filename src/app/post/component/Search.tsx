// This is a Client Component, so we can use `useRouter` here
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchComponent = () => {
  const router = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const search = searchParams.get('search')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("search", value);
    } else {
      newParams.delete("search");
    }
    router.push(`${pathname}?${newParams.toString()}`, undefined)
  }

  return (
    <form action="/post">
      <div className="flex justify-center items-center gap-4">
        <div className="relative w-1/4">
          <input
            type="text"
            id="keyword"
            name="search"
            placeholder="search here"
            value={search || ''}
            onChange={handleSearchChange}
            className="py-1 px-3 w-full border border-slate-400 focus:outline focus:outline-slate-700 text-slate-400 rounded-md"
            required={true}
          />
          <FaSearch className="absolute right-2 top-2 text-slate-400" />
        </div>
      </div>
    </form>
  );
};

export default SearchComponent;
