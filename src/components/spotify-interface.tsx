"use client";

import { useState, useEffect, useRef } from "react";
import { assets, albumsData, songsData, defaultPlaylists } from "@/lib/data";
import { useMobile } from "@/hooks/use-mobile";
import Sidebar from "./sidebar";
import TopBar from "./top-bar";
import MobileSearch from "./mobile-search";
import PlayerControls from "./player-controls";
import AlbumCard from "./album-card";
import { Carousel } from "./ui/carousel";
import TrackList from "./track-list";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { View, Playlist } from "@/types/assets";

// Convertir les durées du format MM:SS en secondes
const convertDurationToSeconds = (duration: string): number => {
  const [minutes, seconds] = duration.split(":").map(Number);
  return minutes * 60 + seconds;
};

// Convertir les chansons pour inclure la durée en secondes
const tracks = songsData.map((song) => ({
  ...song,
  durationSeconds: convertDurationToSeconds(song.duration),
}));

export default function SpotifyInterface() {
  // Références et états
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
  const [selectedAlbumIndex, setSelectedAlbumIndex] = useState<number | null>(
    null
  );
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(
    null
  );
  const [playlists] = useState<Playlist[]>(defaultPlaylists);
  const [likedSongs, setLikedSongs] = useState<number[]>([]);
  const [navigationHistory, setNavigationHistory] = useState<View[]>(["home"]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  const isMobile = useMobile();

  // Track actuel
  const currentTrack = tracks[currentTrackIndex];

  // Gérer la navigation
  const updateView = (view: View) => {
    // Ajouter la nouvelle vue à l'historique, en supprimant tout ce qui est après l'index actuel
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

  // Créer l'élément audio au chargement
  useEffect(() => {
    audioRef.current = new Audio(currentTrack.file);
    audioRef.current.volume = volume / 100;

    // Mettre à jour le temps actuel pendant la lecture
    const updateTime = () => {
      if (audioRef.current) {
        setCurrentTime(Math.floor(audioRef.current.currentTime));
      }
    };

    // Passer à la piste suivante quand la lecture se termine
    const handleTrackEnd = () => {
      handleNext();
    };

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

  // Filtrer les tracks en fonction de la recherche
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTracks(tracks);
    } else {
      const filtered = tracks.filter(
        (track) =>
          track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          track.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTracks(filtered);
      if (searchQuery.trim().length > 0) {
        updateView("search");
      }
    }
  }, [searchQuery]);

  // Mettre à jour l'état de lecture
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

  // Mettre à jour le volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // Fonctions de contrôle
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    if (!isPlaying) setIsPlaying(true);
  };

  const handlePrevious = () => {
    setCurrentTrackIndex(
      (prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length
    );
    if (!isPlaying) setIsPlaying(true);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (isMuted && value[0] > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleProgressChange = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  // Jouer une piste spécifique
  const playTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);

    // Ajouter à l'historique des titres récemment joués
    setRecentlyPlayed((prev) => {
      // Supprimer l'index s'il existe déjà
      const filtered = prev.filter((i) => i !== index);
      // Ajouter au début et limiter à 10 éléments
      return [index, ...filtered].slice(0, 10);
    });
  };

  // Formater le temps (secondes -> MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Voir un album
  const viewAlbum = (albumIndex: number) => {
    setSelectedAlbumIndex(albumIndex);
    updateView("album");
  };

  // Aimer/Ne plus aimer une chanson
  const toggleLikeSong = (trackId: number) => {
    setLikedSongs((prev) => {
      if (prev.includes(trackId)) {
        return prev.filter((id) => id !== trackId);
      } else {
        return [...prev, trackId];
      }
    });
  };

  // Obtenir les pistes d'une playlist
  const getPlaylistTracks = (playlistId: number | null) => {
    if (playlistId === null) return [];

    const playlist = playlists.find((p) => p.id === playlistId);
    if (!playlist) return [];

    return playlist.tracks
      .map((trackId) => {
        const trackIndex = tracks.findIndex((t) => t.id === trackId);
        return trackIndex !== -1 ? tracks[trackIndex] : null;
      })
      .filter(Boolean) as (typeof tracks)[0][];
  };

  // Obtenir les pistes aimées
  const getLikedTracks = () => {
    return likedSongs
      .map((trackId) => {
        const trackIndex = tracks.findIndex((t) => t.id === trackId);
        return trackIndex !== -1 ? tracks[trackIndex] : null;
      })
      .filter(Boolean) as (typeof tracks)[0][];
  };

  // Rendu du contenu principal en fonction de la vue actuelle
  const renderMainContent = () => {
    switch (currentView) {
      case "album":
        if (selectedAlbumIndex === null) return null;

        const album = albumsData[selectedAlbumIndex];
        // Filtrer les pistes pour cet album (simulation - dans une vraie app, les pistes seraient liées aux albums)
        const albumTracks = tracks.slice(
          selectedAlbumIndex * 2,
          selectedAlbumIndex * 2 + 4
        );
        if (albumTracks.length === 0) albumTracks.push(...tracks.slice(0, 4));

        return (
          <div className="p-6">
            <TrackList
              tracks={albumTracks}
              currentTrackIndex={currentTrackIndex}
              isPlaying={isPlaying}
              onPlayTrack={(index) =>
                playTrack(
                  tracks.findIndex((t) => t.id === albumTracks[index].id)
                )
              }
              albumName={album.name}
              albumImage={album.image}
              formatTime={formatTime}
              likedSongs={likedSongs}
              onToggleLike={toggleLikeSong}
            />
          </div>
        );

      case "search":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Search Results</h1>
            {filteredTracks.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {filteredTracks.map((track, index) => (
                  <AlbumCard
                    key={index}
                    item={track}
                    isPlaying={
                      currentTrackIndex ===
                        tracks.findIndex((t) => t.id === track.id) && isPlaying
                    }
                    onPlay={() =>
                      playTrack(tracks.findIndex((t) => t.id === track.id))
                    }
                    playIcon={assets.play_icon}
                    pauseIcon={assets.pause_icon}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-neutral-400">
                No results found for "{searchQuery}"
              </div>
            )}
          </div>
        );

      case "library":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Your Library</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {albumsData.map((album, index) => (
                <Button
                  key={album.id}
                  className="flex items-center gap-4 bg-neutral-800/50 hover:bg-neutral-800 h-auto p-0 overflow-hidden"
                  onClick={() => viewAlbum(index)}
                >
                  <img
                    src={album.image || "/placeholder.svg"}
                    alt={album.name}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                  <span className="font-semibold">{album.name}</span>
                  <div className="ml-auto mr-4 opacity-0 hover:opacity-100 transition-opacity">
                    <div className="bg-green-500 rounded-full p-2 shadow-lg">
                      <img
                        src={assets.play_icon || "/placeholder.svg"}
                        alt="Play"
                        width={16}
                        height={16}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </Button>
              ))}
            </div>

            <h2 className="text-xl font-bold mb-4">Your Playlists</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="bg-neutral-800/40 p-4 rounded-md hover:bg-neutral-800 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedPlaylistId(playlist.id);
                    updateView("playlist");
                  }}
                >
                  <div className="aspect-square bg-neutral-700 rounded-md flex items-center justify-center mb-4">
                    <img
                      src={assets.stack_icon || "/placeholder.svg"}
                      alt="Playlist"
                      width={40}
                      height={40}
                      className="opacity-70"
                    />
                  </div>
                  <h3 className="font-semibold text-sm">{playlist.name}</h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    {playlist.tracks.length} songs
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case "liked-songs":
        const likedTracks = getLikedTracks();

        return (
          <div className="p-6">
            <div className="bg-gradient-to-b from-indigo-800 to-black p-6 rounded-lg mb-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-48 h-48 bg-gradient-to-br from-indigo-600 to-neutral-300 rounded-md flex items-center justify-center shadow-xl">
                  <img
                    src={assets.like_icon || "/placeholder.svg"}
                    alt="Liked Songs"
                    width={64}
                    height={64}
                    className="opacity-80"
                  />
                </div>
                <div>
                  <div className="text-xs uppercase font-semibold text-neutral-400 mb-1">
                    Playlist
                  </div>
                  <h1 className="text-4xl font-bold mb-4">Liked Songs</h1>
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <span className="font-semibold text-white">
                      Your Collection
                    </span>
                    <span>•</span>
                    <span>{likedTracks.length} songs</span>
                  </div>
                </div>
              </div>

              {likedTracks.length > 0 ? (
                <TrackList
                  tracks={likedTracks}
                  currentTrackIndex={currentTrackIndex}
                  isPlaying={isPlaying}
                  onPlayTrack={(index) =>
                    playTrack(
                      tracks.findIndex((t) => t.id === likedTracks[index].id)
                    )
                  }
                  formatTime={formatTime}
                  likedSongs={likedSongs}
                  onToggleLike={toggleLikeSong}
                />
              ) : (
                <div className="text-center py-12 text-neutral-400">
                  You haven't liked any songs yet.
                </div>
              )}
            </div>
          </div>
        );

      case "playlist": {
        if (selectedPlaylistId === null) return null;

        const playlist = playlists.find((p) => p.id === selectedPlaylistId);
        if (!playlist) return null;

        const playlistTracks = getPlaylistTracks(selectedPlaylistId);

        return (
          <div className="p-6">
            <div className="bg-gradient-to-b from-neutral-800 to-black p-6 rounded-lg mb-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-48 h-48 bg-neutral-700 rounded-md flex items-center justify-center shadow-xl">
                  <img
                    src={assets.stack_icon || "/placeholder.svg"}
                    alt="Playlist"
                    width={64}
                    height={64}
                    className="opacity-70"
                  />
                </div>
                <div>
                  <div className="text-xs uppercase font-semibold text-neutral-400 mb-1">
                    Playlist
                  </div>
                  <h1 className="text-4xl font-bold mb-4">{playlist.name}</h1>
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <span className="font-semibold text-white">
                      Your Collection
                    </span>
                    <span>•</span>
                    <span>{playlistTracks.length} songs</span>
                  </div>
                </div>
              </div>

              {playlistTracks.length > 0 ? (
                <TrackList
                  tracks={playlistTracks}
                  currentTrackIndex={currentTrackIndex}
                  isPlaying={isPlaying}
                  onPlayTrack={(index) =>
                    playTrack(
                      tracks.findIndex((t) => t.id === playlistTracks[index].id)
                    )
                  }
                  formatTime={formatTime}
                  likedSongs={likedSongs}
                  onToggleLike={toggleLikeSong}
                />
              ) : (
                <div className="text-center py-12 text-neutral-400">
                  This playlist is empty.
                </div>
              )}
            </div>
          </div>
        );
      }

      default: // 'home'
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Good afternoon</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {albumsData.slice(0, 6).map((album, index) => (
                <Button
                  key={album.id}
                  className="flex items-center gap-4 bg-neutral-800/50 hover:bg-neutral-800 h-auto p-0 overflow-hidden"
                  onClick={() => viewAlbum(index)}
                >
                  <img
                    src={album.image || "/placeholder.svg"}
                    alt={album.name}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                  <span className="font-semibold">{album.name}</span>
                  <div
                    className={cn(
                      "ml-auto mr-4 transition-opacity",
                      "opacity-0 hover:opacity-100"
                    )}
                  >
                    <div className="bg-green-500 rounded-full p-2 shadow-lg">
                      <img
                        src={assets.play_icon || "/placeholder.svg"}
                        alt="Play"
                        width={16}
                        height={16}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </Button>
              ))}
            </div>

            <div className="mb-8">
              <h1 className="text-2xl font-semibold font-sans">Made for you</h1>
              <Carousel title="Made for you" className="flex gap-2">
                {albumsData.map((album, index) => (
                  <div
                    key={album.id}
                    className="max-w-[180px] sm:min-w-[200px] snap-start"
                  >
                    <AlbumCard
                      item={album}
                      isPlaying={false}
                      onPlay={() => playTrack(index % tracks.length)}
                      onViewAlbum={() => viewAlbum(index)}
                      playIcon={assets.play_icon}
                      pauseIcon={assets.pause_icon}
                      isAlbum={true}
                    />
                  </div>
                ))}
              </Carousel>
            </div>

            {/* Carrousel des titres récemment joués */}
            {recentlyPlayed.length > 0 && (
              <div className="mb-8">
                <h1 className="text-2xl font-semibold font-sans">
                  Recently played
                </h1>
                <Carousel title="Recently played" className="flex gap-2">
                  {recentlyPlayed.map((trackIndex) => (
                    <div
                      key={`recent-${tracks[trackIndex].id}`}
                      className=" max-w-[180px] sm:min-w-[200px] snap-start"
                    >
                      <AlbumCard
                        item={tracks[trackIndex]}
                        isPlaying={
                          currentTrackIndex === trackIndex && isPlaying
                        }
                        onPlay={() => playTrack(trackIndex)}
                        playIcon={assets.play_icon}
                        pauseIcon={assets.pause_icon}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            )}

            {/* Tous les titres */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold font-sans">
                Popular played
              </h1>
              <Carousel title="Popular tracks" className="flex gap-2">
                {tracks.map((track, index) => (
                  <div
                    key={track.id}
                    className="flex flex-row max-w-[180px] sm:min-w-[200px] snap-start"
                  >
                    <AlbumCard
                      item={track}
                      isPlaying={currentTrackIndex === index && isPlaying}
                      onPlay={() => playTrack(index)}
                      playIcon={assets.play_icon}
                      pauseIcon={assets.pause_icon}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        );
    }
  };
  // Mobile display
  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="flex flex-1 overflow-hidden">
        {!isMobile && (
          <Sidebar
            playlists={playlists}
            currentView={currentView}
            setCurrentView={updateView}
            setSelectedPlaylistId={setSelectedPlaylistId}
            likedSongs={likedSongs}
          />
        )}

        <div className="flex-1 overflow-auto bg-gradient-to-b from-neutral-900 to-black">
          <TopBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isMobile={isMobile}
            navigationHistory={navigationHistory}
            currentHistoryIndex={currentHistoryIndex}
            navigateBack={navigateBack}
            navigateForward={navigateForward}
            setCurrentView={updateView}
          />

          {isMobile && (
            <MobileSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setCurrentView={updateView}
            />
          )}

          {renderMainContent()}
        </div>
      </div>

      <PlayerControls
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        currentTime={currentTime}
        volume={volume}
        isMuted={isMuted}
        togglePlay={togglePlay}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        handleProgressChange={handleProgressChange}
        handleVolumeChange={handleVolumeChange}
        toggleMute={toggleMute}
        formatTime={formatTime}
        isLiked={likedSongs.includes(currentTrack.id)}
        toggleLike={() => toggleLikeSong(currentTrack.id)}
      />
    </div>
  );
}
