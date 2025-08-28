import { useState } from "react";
import { Link } from "react-router-dom";

export default function TrendingAndPopular({
  trendingStories = [],
  popularStories = [],
}) {
  const [currentTab, setCurrentTab] = useState("trending");

  const currentStories =
    currentTab === "trending" ? trendingStories : popularStories;

  if (
    (!trendingStories || trendingStories.length === 0) &&
    (!popularStories || popularStories.length === 0)
  ) {
    return (
      <div className="w-full">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center lg:text-left">
          Trending & Popular
        </h1>
        <div className="text-center py-8">
          <p className="text-gray-400">
            No trending or popular stories available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center lg:text-left">
        Trending & Popular
      </h1>
      <div className="flex justify-center lg:justify-start gap-2 pt-6 lg:pt-8">
        <button
          className={`px-3 sm:px-4 py-2 rounded-full text-white cursor-pointer text-sm sm:text-base transition-colors ${
            currentTab === "trending"
              ? "bg-blue-600"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
          onClick={() => setCurrentTab("trending")}
        >
          Trending
        </button>
        <button
          className={`px-3 sm:px-4 py-2 rounded-full text-white cursor-pointer text-sm sm:text-base transition-colors ${
            currentTab === "popular"
              ? "bg-blue-600"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
          onClick={() => setCurrentTab("popular")}
        >
          Popular
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-10 pt-6 lg:pt-10">
        {currentStories.length > 0 ? (
          currentStories.map((story, index) => (
            <Link
              to={`/story/${story._id}`}
              className="flex flex-col rounded-lg cursor-pointer hover:shadow-black hover:shadow-md overflow-hidden border-2 border-gray-400 transition-all duration-300 hover:scale-105"
              key={story._id}
            >
              <img
                className="object-cover w-full aspect-[3/2]"
                src={story.coverImage}
                alt={story.title}
              />
              <div className="py-1">
                <p className="px-2 sm:px-4 text-2xl sm:text-3xl lg:text-4xl break-words">
                  #{index + 1}
                </p>
                <p className="px-2 font-medium break-words text-sm sm:text-base">
                  {story.title}
                </p>
                <p className="px-2 text-gray-400 text-xs sm:text-sm">
                  {story.category}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-400">No {currentTab} stories available</p>
          </div>
        )}
      </div>
    </div>
  );
}
