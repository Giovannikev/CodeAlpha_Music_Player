"use client";

import Sidebar from "./Sidebar";
import TopBar from "./top-bar";
import MobileSearch from "./mobile-search";
import PlayerControls from "./player-controls";
import AlbumCard from "./album-card";
import TrackList from "./track-list";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSpotify } from "@/hooks/useMusicPlayer";
import { assets } from "@/lib/data";

export default function SpotifyInterface() {
  const {
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
  } = useSpotify();

  const renderMainContent = () => {
    switch (currentView) {
      case "album": {
        if (selectedAlbumIndex === null) return null;

        const album = albumsData[selectedAlbumIndex];
        let albumTracks = tracks.slice(
          selectedAlbumIndex * 2,
          selectedAlbumIndex * 2 + 4
        );
        if (albumTracks.length === 0) albumTracks = tracks.slice(0, 4);

        return (
          <div className="p-6">
            <TrackList
              tracks={albumTracks}
              currentTrackIndex={tracks.findIndex(
                (t) => t.id === currentTrack.id
              )}
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
      }
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
                      tracks.findIndex((t) => t.id === track.id) ===
                        tracks.findIndex((t) => t.id === currentTrack.id) &&
                      isPlaying
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
          </div>
        );
      case "liked-songs": {
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
                  currentTrackIndex={tracks.findIndex(
                    (t) => t.id === currentTrack.id
                  )}
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
      }
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">All Songs</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {songsData.map((song, index) => (
                <Button
                  key={song.id}
                  className="flex items-center gap-4 bg-neutral-800/50 hover:bg-neutral-800 h-auto p-0 overflow-hidden"
                  onClick={() => playTrack(index)}
                >
                  <img
                    src={song.image || "/placeholder.svg"}
                    alt={song.name}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                  <span className="font-semibold">{song.name}</span>
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
              <h1 className="text-2xl font-semibold font-sans">All Albums</h1>
              <div className="grid grid-cols-5 gap-2">
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
              </div>
            </div>
            {recentlyPlayed.length > 0 && (
              <div className="mb-8">
                <h1 className="text-2xl font-semibold font-sans">
                  Recently played
                </h1>
                <div className="grid grid-cols-5 gap-2">
                  {recentlyPlayed.map((trackIndex) => (
                    <div
                      key={`recent-${tracks[trackIndex].id}`}
                      className="max-w-[180px] sm:min-w-[200px] snap-start"
                    >
                      <AlbumCard
                        item={tracks[trackIndex]}
                        isPlaying={
                          tracks.findIndex((t) => t.id === currentTrack.id) ===
                            trackIndex && isPlaying
                        }
                        onPlay={() => playTrack(trackIndex)}
                        playIcon={assets.play_icon}
                        pauseIcon={assets.pause_icon}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="flex flex-1 overflow-hidden">
        {!isMobile && (
          <Sidebar
            currentView={currentView}
            setCurrentView={updateView}
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
