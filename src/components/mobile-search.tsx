"use client";

import { Input } from "@/components/ui/input";
import { assets } from "@/lib/data";
import type { View } from "@/types/assets";

interface MobileSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setCurrentView: (view: View) => void;
}

export default function MobileSearch({
  searchQuery,
  setSearchQuery,
  setCurrentView,
}: MobileSearchProps) {
  return (
    <div className="px-4 py-2">
      <div className="relative">
        <div className="absolute left-2.5 top-2.5">
          <img
            src={assets.search_icon || "/placeholder.svg"}
            alt="Search"
            width={16}
            height={16}
            className="opacity-60"
          />
        </div>
        <Input
          type="search"
          placeholder="What do you want to listen to?"
          className="w-full bg-neutral-800 border-none pl-9 text-sm rounded-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setCurrentView("search")}
        />
      </div>
    </div>
  );
}
