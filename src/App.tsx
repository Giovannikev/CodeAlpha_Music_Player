import "./App.css";
import Sidebar from "@/components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";

function App() {
  return (
    <div className="h-screen">
      <div className="h-[90%] flex">
        <Sidebar />
        <Display />
      </div>
      <Player />
    </div>
  );
}

export default App;
