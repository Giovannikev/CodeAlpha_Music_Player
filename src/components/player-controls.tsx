"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { assets } from "@/lib/data";
import type { Song } from "@/types/assets";
import { Heart } from "lucide-react";

interface PlayerControlsProps {
  currentTrack: Song & { durationSeconds: number };
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  togglePlay: () => void;
  handlePrevious: () => void;
  handleNext: () => void;
  handleProgressChange: (value: number[]) => void;
  handleVolumeChange: (value: number[]) => void;
  toggleMute: () => void;
  formatTime: (seconds: number) => string;
  isLiked?: boolean;
  toggleLike?: () => void;
}

export default function PlayerControls({
  currentTrack,
  isPlaying,
  currentTime,
  volume,
  isMuted,
  togglePlay,
  handlePrevious,
  handleNext,
  handleProgressChange,
  handleVolumeChange,
  toggleMute,
  formatTime,
  isLiked = false,
  toggleLike,
}: PlayerControlsProps) {
  return (
    <div className="h-20 bg-neutral-900 border-t border-neutral-800 flex items-center px-4">
      <div className="grid grid-cols-3 w-full gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentTrack.image || "/placeholder.svg"}
            alt={currentTrack.title}
            width={56}
            height={56}
            className="rounded"
          />
          <div className="hidden sm:block">
            <div className="font-semibold text-sm">{currentTrack.title}</div>
            <div className="text-xs text-neutral-400">{currentTrack.name}</div>
          </div>
          {toggleLike && (
            <Button size="icon" className="hidden sm:flex" onClick={toggleLike}>
              {isLiked ? (
                <Heart className="h-4 w-4 fill-green-500 text-green-500" />
              ) : (
                <img
                  src={assets.like_icon || "/placeholder.svg"}
                  alt="Like"
                  width={16}
                  height={16}
                  className="opacity-60 hover:opacity-100"
                />
              )}
            </Button>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-4 mb-1">
            <Button size="icon">
              <img
                src={assets.shuffle_icon || "/placeholder.svg"}
                alt="Shuffle"
                width={16}
                height={16}
                className="opacity-60 hover:opacity-100"
              />
            </Button>
            <Button size="icon" onClick={handlePrevious}>
              <img
                src={assets.prev_icon || "/placeholder.svg"}
                alt="Previous"
                width={16}
                height={16}
                className="opacity-60 hover:opacity-100"
              />
            </Button>
            <Button onClick={togglePlay} size="icon">
              <img
                src={isPlaying ? assets.pause_icon : assets.play_icon}
                alt={isPlaying ? "Pause" : "Play"}
                width={16}
                height={16}
                className="object-contain"
              />
            </Button>
            <Button size="icon" onClick={handleNext}>
              <img
                src={assets.next_icon || "/placeholder.svg"}
                alt="Next"
                width={16}
                height={16}
                className="opacity-60 hover:opacity-100"
              />
            </Button>
            <Button size="icon">
              <img
                src={assets.loop_icon || "/placeholder.svg"}
                alt="Repeat"
                width={16}
                height={16}
                className="opacity-60 hover:opacity-100"
              />
            </Button>
          </div>
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-xs text-neutral-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[currentTime]}
              max={currentTrack.durationSeconds}
              step={1}
              className="w-full"
              onValueChange={handleProgressChange}
            />
            <span className="text-xs text-neutral-400 w-10">
              {currentTrack.duration}
            </span>
          </div>
        </div>

        {/* Volume */}
        <div className="hidden md:flex items-center justify-end gap-2">
          <Button size="icon">
            <img
              src={assets.queue_icon || "/placeholder.svg"}
              alt="Queue"
              width={16}
              height={16}
              className="opacity-60 hover:opacity-100"
            />
          </Button>
          <Button size="icon">
            <img
              src={assets.speaker_icon || "/placeholder.svg"}
              alt="Speaker"
              width={16}
              height={16}
              className="opacity-60 hover:opacity-100"
            />
          </Button>
          <div className="flex items-center gap-2">
            <Button size="icon" onClick={toggleMute}>
              <img
                src={assets.volume_icon || "/placeholder.svg"}
                alt="Volume"
                width={16}
                height={16}
                className="opacity-60 hover:opacity-100"
              />
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              className="w-24"
              onValueChange={handleVolumeChange}
            />
          </div>
          <Button size="icon">
            <img
              src={assets.zoom_icon || "/placeholder.svg"}
              alt="Maximize"
              width={16}
              height={16}
              className="opacity-60 hover:opacity-100"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
