"use client";

import { useState, useEffect, useRef } from "react";
import { albumsData, songsData } from "@/lib/data";
import type { View } from "@/types/assets";
import { useMobile } from "@/hooks/use-mobile";

const convertDurationToSeconds = (duration: string): number => {
      const [minutes, seconds] = duration.split(":").map(Number);
      return minutes * 60 + seconds;
};

const tracks = songsData.map((song) => ({
      ...song,
      durationSeconds: convertDurationToSeconds(song.duration),
}));

export function useMusicPlayer() {
      const audioRef = useRef<HTMLAudioElement | null>(null);
      const [isPlaying, setIsPlaying] = useState(false);
      const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
      const [currentTime, setCurrentTime] = useState(0);
      const [volume, setVolume] = useState(70);
      const [isMuted, setIsMuted] = useState(false);
      const [searchQuery, setSearchQuery] = useState("");
      const [filteredTracks, setFilteredTracks] = useState(tracks);
      const [recentlyPlayed, setRecentlyPlayed] = useState<number[]>([]);
      const [currentView, setCurrentView] = useState<View>("home");
      const [selectedAlbumIndex, setSelectedAlbumIndex] = useState<number | null>(null);
      const [likedSongs, setLikedSongs] = useState<number[]>([]);
      const [navigationHistory, setNavigationHistory] = useState<View[]>(["home"]);
      const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
      const [selectedCategory, setSelectedCategory] = useState<string>("");
      const isMobile = useMobile();

      const currentTrack = tracks[currentTrackIndex];


      const updateView = (view: View) => {
            const newHistory = [
                  ...navigationHistory.slice(0, currentHistoryIndex + 1),
                  view,
            ];
            setNavigationHistory(newHistory);
            setCurrentHistoryIndex(newHistory.length - 1);
            setCurrentView(view);
      };

      const navigateBack = () => {
            if (currentHistoryIndex > 0) {
                  setCurrentHistoryIndex(currentHistoryIndex - 1);
                  setCurrentView(navigationHistory[currentHistoryIndex - 1]);
            }
      };

      const navigateForward = () => {
            if (currentHistoryIndex < navigationHistory.length - 1) {
                  setCurrentHistoryIndex(currentHistoryIndex + 1);
                  setCurrentView(navigationHistory[currentHistoryIndex + 1]);
            }
      };


      useEffect(() => {
            audioRef.current = new Audio(currentTrack.file);
            audioRef.current.volume = volume / 100;

            const updateTime = () => {
                  if (audioRef.current) setCurrentTime(Math.floor(audioRef.current.currentTime));
            };

            const handleTrackEnd = () => handleNext();

            if (audioRef.current) {
                  audioRef.current.addEventListener("timeupdate", updateTime);
                  audioRef.current.addEventListener("ended", handleTrackEnd);
            }

            return () => {
                  if (audioRef.current) {
                        audioRef.current.removeEventListener("timeupdate", updateTime);
                        audioRef.current.removeEventListener("ended", handleTrackEnd);
                        audioRef.current.pause();
                  }
            };
      }, [currentTrackIndex]);


      useEffect(() => {
            let filtered = tracks;

            if (searchQuery.trim() !== "") {
                  filtered = filtered.filter(
                        (track) =>
                              track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              track.name.toLowerCase().includes(searchQuery.toLowerCase())
                  );
            }

            if (selectedCategory.trim() !== "") {
                  filtered = filtered.filter(
                        (track) => track.category === selectedCategory
                  );
            }

            setFilteredTracks(filtered);
            if (searchQuery.trim().length > 0 || selectedCategory.trim().length > 0) {
                  updateView("search");
            }
      }, [searchQuery, selectedCategory]);


      useEffect(() => {
            if (audioRef.current) {
                  if (isPlaying) {
                        audioRef.current.play().catch((error) => {
                              console.error("Erreur de lecture audio:", error);
                              setIsPlaying(false);
                        });
                  } else {
                        audioRef.current.pause();
                  }
            }
      }, [isPlaying, currentTrackIndex]);

      useEffect(() => {
            if (audioRef.current) {
                  audioRef.current.volume = isMuted ? 0 : volume / 100;
            }
      }, [volume, isMuted]);


      const togglePlay = () => setIsPlaying((prev) => !prev);

      const handleNext = () => {
            setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
            if (!isPlaying) setIsPlaying(true);
      };

      const handlePrevious = () => {
            setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
            if (!isPlaying) setIsPlaying(true);
      };

      const handleVolumeChange = (value: number[]) => {
            setVolume(value[0]);
            if (isMuted && value[0] > 0) setIsMuted(false);
      };

      const toggleMute = () => setIsMuted((prev) => !prev);

      const handleProgressChange = (value: number[]) => {
            const newTime = value[0];
            setCurrentTime(newTime);
            if (audioRef.current) audioRef.current.currentTime = newTime;
      };

      const playTrack = (index: number) => {
            setCurrentTrackIndex(index);
            setIsPlaying(true);
            setRecentlyPlayed((prev) => {
                  const filtered = prev.filter((i) => i !== index);
                  return [index, ...filtered].slice(0, 10);
            });
      };

      const toggleLikeSong = (trackId: number) => {
            setLikedSongs((prev) =>
                  prev.includes(trackId) ? prev.filter((id) => id !== trackId) : [...prev, trackId]
            );
      };

      const getLikedTracks = () => {
            return likedSongs
                  .map((trackId) => {
                        const trackIndex = tracks.findIndex((t) => t.id === trackId);
                        return trackIndex !== -1 ? tracks[trackIndex] : null;
                  })
                  .filter(Boolean) as (typeof tracks)[0][];
      };

      const formatTime = (seconds: number) => {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
      };

      const viewAlbum = (albumIndex: number) => {
            setSelectedAlbumIndex(albumIndex);
            updateView("album");
      };

      return {
            isPlaying,
            currentTrack,
            currentTime,
            volume,
            isMuted,
            searchQuery,
            setSearchQuery,
            filteredTracks,
            recentlyPlayed,
            currentView,
            updateView,
            selectedAlbumIndex,
            viewAlbum,
            likedSongs,
            toggleLikeSong,
            getLikedTracks,
            navigationHistory,
            currentHistoryIndex,
            navigateBack,
            navigateForward,
            togglePlay,
            handleNext,
            handlePrevious,
            handleVolumeChange,
            toggleMute,
            handleProgressChange,
            playTrack,
            formatTime,
            tracks,
            albumsData,
            songsData,
            isMobile,
            selectedCategory,
            setSelectedCategory,
      };
}
