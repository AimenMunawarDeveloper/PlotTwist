import { Link } from "react-router-dom";
import { getTopPicksStories } from "../data/mockData";

export default function TopPicksForYou() {
  const TopPicksForYouList = getTopPicksStories();

  return (
    <div className="w-full">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center lg:text-left">
        Top Picks For You
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-10 pt-8 lg:pt-14">
        {TopPicksForYouList.length > 0
          ? TopPicksForYouList.map((card, index) => {
              return (
                <Link
                  to={`/story/${card.id}`}
                  className="flex flex-col rounded-lg cursor-pointer hover:shadow-black hover:shadow-md overflow-hidden transition-all duration-300 hover:scale-105"
                  key={index}
                >
                  <img
                    className="object-cover w-full aspect-[2/3]"
                    src={card.coverImage}
                  />
                  <div className="py-1">
                    <p className="px-2 font-medium break-words text-sm sm:text-base">
                      {card.title}
                    </p>
                    <p className="px-2 text-gray-400 text-xs sm:text-sm">
                      {card.category}
                    </p>
                  </div>
                </Link>
              );
            })
          : ""}
      </div>
    </div>
  );
}
