import { Link } from "react-router-dom";
import { getTrendingStories } from "../data/mockData";

export default function Trending() {
  const cards = getTrendingStories();

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-center">Trending</h1>
      <div className="w-full flex justify-between flex-wrap gap-10 items-center px-6 pt-14">
        {cards.length > 0
          ? cards.map((card, index) => {
              return (
                <Link
                  to={`/story/${card.id}`}
                  key={index}
                  className="flex flex-col cursor-pointer flex-wrap justify-center items-center gap-4 relative w-[350px] height-[200px] text-justify border-1 border-[#B6B2B2] rounded-md shadow-md shadow-slate-500 hover:shadow-lg hover:shadow-black transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={card.coverImage}
                    className="h-[300px] w-full object-cover "
                  />
                  <div className="p-6">
                    <h4 className="text-lg mb-2 font-semibold">{card.title}</h4>
                    <h5 className="text-md">{card.startingText}</h5>
                  </div>
                </Link>
              );
            })
          : "No step available"}
      </div>
    </div>
  );
}
