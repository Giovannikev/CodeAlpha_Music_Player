import AlbumItem from "./AlbumItem";
import Header from "./Header";
import { albumsData, songsData } from "@/assets/assets";
import SongItem from "./SongItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const DisplayHome = () => {
  return (
    <>
      <Header />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl text-left">Featured Charts</h1>
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {albumsData.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <AlbumItem
                  name={item.name}
                  description={item.description}
                  image={item.image}
                  id={item.id}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl text-left">
          Today's biggest hits
        </h1>
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {songsData.map((song, index) => (
              <CarouselItem
                key={index}
                className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <SongItem
                  image={song.image}
                  name={song.name}
                  description={song.description}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </>
  );
};

export default DisplayHome;
