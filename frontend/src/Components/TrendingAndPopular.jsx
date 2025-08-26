import { useState } from "react";
import { Link } from "react-router-dom";
import { getTrendingAndPopularStories } from "../data/mockData";

export default function TrendingAndPopular() {
  const [currentTab, setCurrentTab] = useState("trending");
  const { trending, popular } = getTrendingAndPopularStories();

  return (
    <div className="w-full">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center lg:text-left">
        Trending & Popular
      </h1>
      <div className="flex justify-center lg:justify-start gap-2 pt-6 lg:pt-8">
        <p
          className="bg-gray-400 px-3 sm:px-4 py-2 hover:bg-gray-500 rounded-full text-white cursor-pointer text-sm sm:text-base"
          onClick={() => setCurrentTab("trending")}
        >
          Trending
        </p>
        <p
          className="bg-gray-400 px-3 sm:px-4 py-2 hover:bg-gray-500 rounded-full text-white cursor-pointer text-sm sm:text-base"
          onClick={() => setCurrentTab("popular")}
        >
          Popular
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-10 pt-6 lg:pt-10">
        {" "}
        {currentTab === "trending"
          ? trending.map((card, index) => {
              return (
                <Link
                  to={`/story/${card.id}`}
                  className="flex flex-col rounded-lg cursor-pointer hover:shadow-black hover:shadow-md overflow-hidden border-2 border-gray-400 transition-all duration-300 hover:scale-105"
                  key={index}
                >
                  <img
                    className="object-cover w-full aspect-[3/2]"
                    src={card.coverImage}
                  />
                  <div className="py-1">
                    <p className="px-2 sm:px-4 text-2xl sm:text-3xl lg:text-4xl break-words ">
                      {card.ranking}
                    </p>
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
          : popular.map((card, index) => {
              return (
                <Link
                  to={`/story/${card.id}`}
                  className="flex flex-col rounded-lg cursor-pointer hover:shadow-black hover:shadow-md overflow-hidden border-2 border-gray-400 transition-all duration-300 hover:scale-105"
                  key={index}
                >
                  <img
                    className="object-cover w-full aspect-[3/2]"
                    src={card.coverImage}
                  />
                  <div className="py-1">
                    <p className="px-2 sm:px-4 text-2xl sm:text-3xl lg:text-4xl break-words">
                      {card.ranking}
                    </p>
                    <p className="px-2 font-medium break-words text-sm sm:text-base">
                      {card.title}
                    </p>
                    <p className="px-2 text-gray-400 text-xs sm:text-sm">
                      {card.category}
                    </p>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
}
