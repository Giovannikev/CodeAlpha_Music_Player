"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Song } from "@/types/assets";
import { assets } from "@/lib/data";
import { Heart } from "lucide-react";

interface TrackListProps {
  tracks: (Song & { durationSeconds: number })[];
  currentTrackIndex: number;
  isPlaying: boolean;
  onPlayTrack: (index: number) => void;
  albumName?: string;
  albumImage?: string;
  formatTime: (seconds: number) => string;
  likedSongs?: number[];
  onToggleLike?: (trackId: number) => void;
}

export default function TrackList({
  tracks,
  currentTrackIndex,
  isPlaying,
  onPlayTrack,
  albumName,
  albumImage,
  likedSongs = [],
  onToggleLike,
}: TrackListProps) {
  return (
    <div className="bg-gradient-to-b from-neutral-800/50 to-black p-6 rounded-lg">
      {albumName && albumImage && (
        <div className="flex items-center gap-6 mb-8">
          <img
            src={albumImage || "/placeholder.svg"}
            alt={albumName}
            width={200}
            height={200}
            className="rounded-md shadow-xl"
          />
          <div>
            <div className="text-xs uppercase font-semibold text-neutral-400 mb-1">
              Album
            </div>
            <h1 className="text-4xl font-bold mb-4">{albumName}</h1>
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <span className="font-semibold text-white">Various Artists</span>
              <span>•</span>
              <span>{tracks.length} songs</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-[16px_4fr_3fr_1fr] md:grid-cols-[16px_4fr_3fr_2fr_1fr] gap-4 text-sm text-left text-neutral-400 border-b border-neutral-700 pb-2 px-4 mb-2">
        <div>#</div>
        <div>Title</div>
        <div className="hidden md:block">Album</div>
        <div>Artist</div>
        <div className="flex justify-end">
          <img
            src={assets.clock_icon || "/placeholder.svg"}
            alt="Duration"
            width={20}
            height={14}
          />
        </div>
      </div>

      <div className="space-y-2">
        {tracks.map((track, index) => {
          const isCurrentTrack =
            tracks[index].id === tracks[currentTrackIndex]?.id;
          const isLiked = likedSongs.includes(track.id);

          return (
            <div
              key={track.id}
              className={cn(
                "grid grid-cols-[16px_4fr_3fr_1fr] md:grid-cols-[16px_4fr_3fr_2fr_1fr] gap-4 items-center text-left h-auto py-2 px-4 rounded-md group",
                isCurrentTrack
                  ? "bg-neutral-700/50 text-green-500"
                  : "hover:bg-neutral-800/50 text-white"
              )}
            >
              <div className="flex items-center justify-center">
                <div className="group-hover:hidden">
                  {isCurrentTrack && isPlaying ? (
                    <img
                      src={assets.plays_icon || "/placeholder.svg"}
                      alt="Playing"
                      width={14}
                      height={14}
                      className="text-green-500"
                    />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <Button
                  size="icon"
                  className="hidden group-hover:flex h-6 w-6 p-0"
                  onClick={() => onPlayTrack(index)}
                >
                  <img
                    src={
                      isCurrentTrack && isPlaying
                        ? assets.pause_icon
                        : assets.play_icon
                    }
                    alt={isPlaying ? "Pause" : "Play"}
                    width={14}
                    height={14}
                  />
                </Button>
              </div>
              <div className="flex items-center gap-3 overflow-hidden">
                <img
                  src={track.image || "/placeholder.svg"}
                  alt={track.title}
                  width={40}
                  height={40}
                  className="rounded"
                />
                <div className="overflow-hidden">
                  <div
                    className={cn(
                      "font-medium truncate",
                      isCurrentTrack && "text-green-500"
                    )}
                  >
                    {track.title}
                  </div>
                </div>
              </div>
              <div className="hidden md:block truncate">
                {albumName || "Album"}
              </div>
              <div className="truncate">{track.name}</div>
              <div className="flex items-center justify-end gap-4">
                {onToggleLike && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleLike(track.id);
                    }}
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4",
                        isLiked
                          ? "fill-green-500 text-green-500"
                          : "text-neutral-400"
                      )}
                    />
                  </Button>
                )}
                <span>{track.duration}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
