import { assets } from "@/assets/assets";
import { Button } from "./ui/button";

const Sidebar = () => {
  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-gray-800 h-[15%] rounded flex flex-col justify-around">
        <div className="flex items-center gap-3 pl-8 cursor-pointer">
          <img src={assets.home_icon} alt="home logo" className="w-6" />
          <p className="font-bold ">Home</p>
        </div>
        <div className="flex items-center gap-3 pl-8 cursor-pointer">
          <img src={assets.search_icon} alt="home logo" className="w-6" />
          <p className="font-bold ">Search</p>
        </div>
      </div>
      <div className="bg-gray-800 h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center justify-center gap-3">
            <img src={assets.stack_icon} className="w-8" alt=" library" />
            <p className="font-semibold">Your library</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <img src={assets.arrow_icon} className="w-5" alt=" arrow" />
            <img src={assets.plus_icon} className="w-5" alt=" library" />
          </div>
        </div>
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <h1>Create your first playlist</h1>
          <p className="font-light">it's easy we will help you</p>
          <Button variant={"secondary"} className="mt-4">
            Create Playlist
          </Button>
        </div>
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <h1>Let's find some podcats to follow</h1>
          <p className="font-light">we will keep you update on new episodes</p>
          <Button variant={"secondary"} className="mt-4">
            Browse podcats
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
