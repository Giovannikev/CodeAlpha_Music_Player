import { songsData } from "@/assets/assets";
import {
  createContext,
  useRef,
  ReactNode,
  useState,
  MutableRefObject,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

export type PlayerContextType = {
  playStatus: boolean;
  play: () => void;
  pause: () => void;
  seekBar: MutableRefObject<HTMLDivElement | null>;
  seekBg: MutableRefObject<HTMLDivElement | null>;
  currentSong: number;
  setCurrentSong: Dispatch<SetStateAction<number>>;
};

export const PlayerContext = createContext<PlayerContextType>({
  playStatus: false,
  play: () => {},
  pause: () => {},
  seekBar: { current: null },
  seekBg: { current: null },
  currentSong: 0,
  setCurrentSong: () => {},
});

const PlayerContextProvider = ({ children }: { children: ReactNode }) => {
  const audioref = useRef<HTMLAudioElement | null>(null);
  const seekBg = useRef<HTMLDivElement | null>(null);
  const seekBar = useRef<HTMLDivElement | null>(null);

  const [track, setTrack] = useState(songsData[1]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    if (audioref.current) {
      audioref.current.play();
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioref.current) {
      audioref.current.pause();
      setPlayStatus(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (audioref.current) {
        audioref.current.ontimeupdate = () => {
          if (seekBar.current && seekBar.current.style) {
            const currentTime = audioref.current?.currentTime;
            const duration = audioref.current?.duration;

            seekBar.current.style.width = `${
              duration && currentTime
                ? Math.floor((currentTime / duration) * 100) + "%"
                : 0
            }%`;
          }

          setTime({
            currentTime: {
              second: Math.floor((audioref.current?.currentTime || 0) % 60),
              minute: Math.floor((audioref.current?.currentTime || 0) / 60),
            },
            totalTime: {
              second: Math.floor((audioref.current?.duration || 0) % 60),
              minute: Math.floor((audioref.current?.duration || 0) / 60),
            },
          });
        };
      }
    }, 1000);
  });

  const contextValue = {
    audioref,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
