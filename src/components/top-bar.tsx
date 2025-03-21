"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { assets } from "@/lib/data";
import type { View } from "@/types/assets";

interface TopBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isMobile: boolean;
  navigationHistory: View[];
  currentHistoryIndex: number;
  navigateBack: () => void;
  navigateForward: () => void;
  setCurrentView: (view: View) => void;
}

export default function TopBar({
  searchQuery,
  setSearchQuery,
  isMobile,
  navigationHistory,
  currentHistoryIndex,
  navigateBack,
  navigateForward,
  setCurrentView,
}: TopBarProps) {
  const canGoBack = currentHistoryIndex > 0;
  const canGoForward = currentHistoryIndex < navigationHistory.length - 1;

  return (
    <div className="sticky top-0 bg-neutral-900/90 backdrop-blur-md p-4 flex items-center justify-between z-10">
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          className="rounded-full bg-black/40"
          onClick={navigateBack}
          disabled={!canGoBack}
        >
          <img
            src={assets.arrow_left || "/placeholder.svg"}
            alt="Previous"
            width={20}
            height={20}
            className={!canGoBack ? "opacity-50" : ""}
          />
        </Button>
        <Button
          size="icon"
          className="rounded-full bg-black/40"
          onClick={navigateForward}
          disabled={!canGoForward}
        >
          <img
            src={assets.arrow_right || "/placeholder.svg"}
            alt="Next"
            width={20}
            height={20}
            className={!canGoForward ? "opacity-50" : ""}
          />
        </Button>
        {isMobile && (
          <Button
            variant="ghost"
            size="sm"
            className="text-sm"
            onClick={() => setCurrentView("home")}
          >
            Home
          </Button>
        )}
        {!isMobile && (
          <div className="relative ml-2">
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
              className="w-80 bg-neutral-800 border-none pl-9 text-sm rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setCurrentView("search")}
            />
          </div>
        )}
      </div>
      <div>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback className="bg-neutral-800">U</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
