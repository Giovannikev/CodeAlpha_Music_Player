"use client";

import { assets } from "@/assets/assets";
import { PlayerContext } from "@/context/PlayerContext";
import {
  useContext,
  type MutableRefObject,
  type Dispatch,
  type SetStateAction,
  useState,
} from "react";
import { Slider } from "@/components/ui/slider";

export type TimeType = {
  minute: number;
  second: number;
};

export type PlayerContextType = {
  time: {
    currentTime: TimeType;
    totalTime: TimeType;
  };
  playStatus: boolean;
  play: () => void;
  pause: () => void;
  track: {
    image: string;
    name: string;
    title: string;
    description: string;
  };
  seekBar: MutableRefObject<HTMLHRElement | null>;
  seekBg: MutableRefObject<HTMLDivElement | null>;
  currentSong: number;
  setCurrentSong: Dispatch<SetStateAction<number>>;
};

const Player = () => {
  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    setCurrentSong,
  } = useContext(PlayerContext) as PlayerContextType;

  // État pour le volume
  const [volume, setVolume] = useState(70);

  // Fonction pour calculer le pourcentage de progression
  const calculateProgress = () => {
    const currentSeconds =
      time.currentTime.minute * 60 + time.currentTime.second;
    const totalSeconds = time.totalTime.minute * 60 + time.totalTime.second;
    return totalSeconds > 0 ? (currentSeconds / totalSeconds) * 100 : 0;
  };

  // Fonction pour gérer le changement de position dans la chanson
  const handleSeekChange = (value: number[]) => {
    const newProgress = value[0];

    // Calculer le nouveau temps en secondes

    // Mettre à jour visuellement la barre (si nécessaire pour la compatibilité)
    if (seekBar.current && seekBg.current) {
      seekBar.current.style.width = `${newProgress}%`;
    }

    // Ici, vous pourriez ajouter une fonction au contexte pour modifier la position de lecture
    // Par exemple: seekTo(newTimeInSeconds);

    // Note: Cette fonction est un placeholder, vous devrez l'adapter à votre contexte
    // pour réellement changer la position de lecture de l'audio
  };

  // Fonction pour gérer le changement de volume
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    // Ici, vous pourriez ajouter une fonction au contexte pour modifier le volume de l'audio
  };

  // Fonction pour passer à la chanson suivante
  const handleNext = () => {
    setCurrentSong((prev) => prev + 1);
  };

  // Fonction pour passer à la chanson précédente
  const handlePrev = () => {
    setCurrentSong((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="h-[10%] bg-slate-950 shadow-amber-50 flex justify-between items-center text-white px-4">
      <div className="hidden lg:flex items-center gap-4">
        <img src={track.image || "/placeholder.svg"} alt="" className="w-15" />
        <div className="text-left">
          <p>{track.name}</p>
          <p>{track.title}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img
            src={assets.shuffle_icon || "/placeholder.svg"}
            alt=""
            className="w-4 cursor-pointer"
          />
          <img
            src={assets.prev_icon || "/placeholder.svg"}
            alt=""
            className="w-4 cursor-pointer"
            onClick={handlePrev}
          />
          {playStatus ? (
            <img
              onClick={pause}
              src={assets.pause_icon || "/placeholder.svg"}
              alt=""
              className="w-4 cursor-pointer"
            />
          ) : (
            <img
              onClick={play}
              src={assets.play_icon || "/placeholder.svg"}
              alt=""
              className="w-4 cursor-pointer"
            />
          )}

          <img
            src={assets.next_icon || "/placeholder.svg"}
            alt=""
            className="w-4 cursor-pointer"
            onClick={handleNext}
          />
          <img
            src={assets.loop_icon || "/placeholder.svg"}
            alt=""
            className="w-4 cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-2 w-full">
          <p className="text-xs min-w-[40px]">
            {time.currentTime.minute}:{time.currentTime.second < 10 ? "0" : ""}
            {time.currentTime.second}
          </p>
          <Slider
            value={[calculateProgress()]}
            max={100}
            step={0.1}
            onValueChange={handleSeekChange}
            className="w-[60vw] bg-green-700 max-w-[500px] cursor-pointer"
          />
          <p className="text-xs min-w-[40px]">
            {time.totalTime.minute}:{time.totalTime.second < 10 ? "0" : ""}
            {time.totalTime.second}
          </p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img
          src={assets.plays_icon || "/placeholder.svg"}
          className="w-4 cursor-pointer"
        />
        <img
          src={assets.mic_icon || "/placeholder.svg"}
          className="w-4 cursor-pointer"
        />
        <img
          src={assets.queue_icon || "/placeholder.svg"}
          className="w-4 cursor-pointer"
        />
        <img
          src={assets.speaker_icon || "/placeholder.svg"}
          className="w-4 cursor-pointer"
        />

        <div className="flex items-center gap-2">
          <img
            src={assets.volume_icon || "/placeholder.svg"}
            className="w-4 cursor-pointer"
          />
          <Slider
            value={[volume]}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="w-20 cursor-pointer"
          />
        </div>

        <img
          src={assets.mini_player_icon || "/placeholder.svg"}
          className="w-4 cursor-pointer"
        />
        <img
          src={assets.zoom_icon || "/placeholder.svg"}
          className="w-4 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Player;
