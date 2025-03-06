import AlbumItem from "./AlbumItem";
import Header from "./Header";
import { albumsData, songsData } from "@/assets/assets";
import SongItem from "./SongItem";

const DisplayHome = () => {
  return (
    <>
      <Header />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl text-left">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albumsData.map((item) => (
            <AlbumItem
              key={item.id}
              name={item.name}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl text-left">
          Today's biggest hits
        </h1>
        <div className="flex overflow-auto">
          {songsData.map((song) => (
            <SongItem
              key={song.id}
              image={song.image}
              name={song.name}
              description={song.description}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
