interface SongItemProps {
  name: string;
  image: string;
  description: string;
}

const SongItem = ({ name, image, description }: SongItemProps) => {
  return (
    <div className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-gray-800">
      <img src={image} alt="" className="rounded" />
      <p className="font-bold mt-2 mb1">{name}</p>
      <p className="text-slate-200 text-sm">{description}</p>
    </div>
  );
};

export default SongItem;
