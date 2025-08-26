import { Link } from "react-router-dom";
import {
  getStartedStories,
  getContributedStories,
  getReadStories,
} from "../data/mockData";

export default function MyStoriesCard({ heading }) {
  let data = [];

  if (heading === "Started") data = getStartedStories();
  else if (heading === "Contributed") data = getContributedStories();
  else if (heading === "Read") data = getReadStories();

  return (
    <div className="w-full">
      <h3 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">
        {heading}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {data.map((card, index) => (
          <Link
            key={index}
            to={`/story/${card.id}`}
            className="flex flex-col sm:flex-row items-start border rounded-lg shadow-md p-3 sm:p-4 bg-white hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <img
              src={card.coverImage}
              alt={card.title}
              className="w-full sm:w-1/3 h-32 sm:h-48 object-cover rounded-md"
            />
            <div className="flex flex-col mt-3 sm:mt-0 sm:ml-4 w-full">
              <h4 className="text-base sm:text-lg font-semibold line-clamp-2">
                {card.title}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
                {card.category}
              </p>
              <p className="text-xs text-gray-600 mt-2 sm:mt-4 line-clamp-3">
                {card.startingText}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
