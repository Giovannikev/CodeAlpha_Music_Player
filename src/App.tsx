"use client";

import "./App.css";
import Sidebar from "@/components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";
import { useContext } from "react";
import { PlayerContext } from "./context/PlayerContext";

function App() {
  const { audioref, track } = useContext(PlayerContext);

  return (
    <div className="h-screen">
      <div className="h-[90%] flex">
        <Sidebar />
        <Display />
      </div>
      <Player />
      <audio ref={audioref} src={track.file} preload="auto"></audio>
    </div>
  );
}

export default App;
