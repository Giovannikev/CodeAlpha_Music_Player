import { assets } from "@/assets/assets";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img
            src={assets.arrow_left}
            alt=""
            className="w-8 bg-gray-800 p-2 rounded-2xl cursor-pointer"
          />
          <img
            src={assets.arrow_right}
            alt=""
            className="w-8 bg-gray-800 p-2 rounded-2xl cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-4">
          <Button className="hidden md:block" variant={"secondary"}>
            Explore premium
          </Button>
          <Button>Install the App</Button>
          <Avatar className="inset-shadow-zinc-100 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>Profile</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Button variant={"secondary"}>All</Button>
        <Button>Music</Button>
        <Button>Podcats</Button>
      </div>
    </>
  );
};

export default Header;
