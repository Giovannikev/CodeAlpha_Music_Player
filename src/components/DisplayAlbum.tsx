import { albumsData, assets, songsData } from "@/assets/assets";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { Separator } from "./ui/separator";

const DisplayAlbum = () => {
  const { id } = useParams();
  const albumData = albumsData[id as keyof typeof albumsData];

  if (!albumData || typeof albumData !== "object" || !("image" in albumData)) {
    return <div>Album not found</div>;
  }

  return (
    <>
      <Header />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img src={albumData.image} alt="" className="w-48 rounded" />
        <div className="flex flex-col text-left">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData.name}
          </h2>
          <h4>{albumData.description}</h4>
          <p className="mt-1 p-2">
            <img src={assets.spotify_logo} className="w-5 inline-block" />
            <b> Spotify </b>● 1,354,321 likes ● <b> 50 songs, </b>
            about 2 hr 30 min
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-gray-300 text-left">
        <p>
          <b className="mr-4">#</b> Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img src={assets.clock_icon} alt="" className="m-auto w-4" />
      </div>
      <Separator />
      {songsData.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-gray-400 hover:bg-gray-800 hover:rounded cursor-pointer "
        >
          <p className=" flex text-white text-left">
            <b className="mr-4 text-gray-400">{index + 1}</b>
            <img src={item.image} alt="" className="inline w-10 mr-5" />
            <div className="flex flex-col">
              {item.name} - {item.title}
            </div>
          </p>
          <p className="text-sm text-left">{albumData.name}</p>
          <p className="text-sm hidden sm:block text-left">
            {albumData.dateAdded}
          </p>
          <p className="text-sm">{item.duration}</p>
        </div>
      ))}
    </>
  );
};

export default DisplayAlbum;
