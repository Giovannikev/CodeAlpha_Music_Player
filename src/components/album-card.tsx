"use client";

import type React from "react";

import { useState } from "react";
import type { Album, Song } from "@/types/assets";

interface AlbumCardProps {
  item: Album | (Song & { durationSeconds?: number });
  isPlaying: boolean;
  onPlay: () => void;
  onViewAlbum?: () => void;
  playIcon: string;
  pauseIcon: string;
  isAlbum?: boolean;
}

export default function AlbumCard({
  item,
  isPlaying,
  onPlay,
  onViewAlbum,
  playIcon,
  pauseIcon,
  isAlbum = false,
}: AlbumCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (isAlbum && onViewAlbum) {
      onViewAlbum();
    } else {
      onPlay();
    }
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay();
  };

  const title = "title" in item ? item.title : item.name;
  const artist = "name" in item ? item.name : "";
  const description = item.description || "";

  return (
    <div
      className="bg-neutral-800/40 p-4 rounded-md hover:bg-neutral-800 transition-colors group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative mb-4">
        <img
          src={item.image || "/placeholder.svg"}
          alt={title}
          width={300}
          height={300}
          className={"aspect-square object-cover rounded-md shadow-lg"}
        />
        {(isHovered || isPlaying) && (
          <button
            className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0"
            onClick={handlePlayClick}
          >
            <img
              src={isPlaying ? pauseIcon : playIcon}
              alt={isPlaying ? "Pause" : "Play"}
              width={20}
              height={20}
              className="object-contain"
            />
          </button>
        )}
      </div>
      <h3 className="font-semibold text-sm line-clamp-1">{title}</h3>
      <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
        {isAlbum ? description : artist}
      </p>
    </div>
  );
}
