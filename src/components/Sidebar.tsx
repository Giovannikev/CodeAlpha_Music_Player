"use client";

import { Button } from "@/components/ui/button";
import { assets } from "@/lib/data";
import type { View } from "@/types/assets";
import { cn } from "@/lib/utils";

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  likedSongs: number[];
}

export default function Sidebar({
  currentView,
  setCurrentView,
  likedSongs,
}: SidebarProps) {
  return (
    <div className="w-64 bg-black p-6 flex flex-col gap-6 border-r border-gray-50 h-full">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <img
            src={assets.spotify_logo || "/placeholder.svg"}
            alt="Spotify"
            width={40}
            height={40}
            className="object-contain"
          />
          Music Player
        </div>
        <nav className="space-y-2">
          <Button
            className={cn(
              "w-full justify-start gap-4",
              currentView === "home" ? "text-white" : "text-neutral-500"
            )}
            onClick={() => setCurrentView("home")}
          >
            <img
              src={assets.home_icon || "/placeholder.svg"}
              alt="Home"
              width={24}
              height={24}
            />
            Home
          </Button>
          <Button
            className={cn(
              "w-full justify-start gap-4",
              currentView === "search" ? "text-white" : "text-neutral-500"
            )}
            onClick={() => setCurrentView("search")}
          >
            <img
              src={assets.search_icon || "/placeholder.svg"}
              alt="Search"
              width={24}
              height={24}
            />
            Search
          </Button>
          <Button
            className={cn(
              "w-full justify-start gap-4",
              currentView === "library" ? "text-white " : "text-neutral-500"
            )}
            onClick={() => setCurrentView("library")}
          >
            <img
              src={assets.stack_icon || "/placeholder.svg"}
              alt="Library"
              width={24}
              height={24}
            />
            Library
          </Button>
        </nav>
      </div>
      <div className="space-y-2 mt-6">
        <Button
          className="w-full justify-start gap-4 text-neutral-500 hover:text-white"
          onClick={() => {
            alert("Create Playlist functionality Will be implemented soon");
          }}
        >
          <img
            src={assets.plus_icon || "/placeholder.svg"}
            alt="Create Playlist"
            width={20}
            height={20}
            className="bg-neutral-700 p-1 rounded-sm"
          />
          Create Playlist
        </Button>
        <Button
          className={cn(
            "w-full justify-start gap-4",
            currentView === "liked-songs"
              ? "text-white bg-gray-50/50"
              : "text-neutral-500"
          )}
          onClick={() => setCurrentView("liked-songs")}
        >
          <img
            src={assets.like_icon || "/placeholder.svg"}
            alt="Liked Songs"
            width={20}
            height={20}
            className="bg-gradient-to-br from-indigo-600 to-neutral-300 p-1 rounded-sm"
          />
          Liked Songs
          <span className="ml-auto text-xs">{likedSongs.length}</span>
        </Button>
      </div>
    </div>
  );
}
