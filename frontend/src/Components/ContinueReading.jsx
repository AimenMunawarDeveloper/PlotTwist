import { useState } from "react";
import { Link } from "react-router-dom";
import { getContinueReadingStories } from "../data/mockData";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function ContinueReading() {
  const ContinueReadingList = getContinueReadingStories();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);

  const handleNext = () => {
    if (end < ContinueReadingList.length) {
      setStart((previous) => previous + 5);
      setEnd((previous) => previous + 5);
    }
  };
  const handlePrevious = () => {
    if (start > 0) {
      setStart((previous) => previous - 5);
      setEnd((previous) => previous - 5);
    }
  };
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center sm:text-left">
          Continue Reading
        </h1>
        <div className="flex gap-2">
          <FaArrowLeft
            className="w-6 h-6 sm:w-8 sm:h-8 cursor-pointer hover:text-gray-400 transition-colors duration-100"
            onClick={handlePrevious}
          />
          <FaArrowRight
            className="w-6 h-6 sm:w-8 sm:h-8 cursor-pointer transition-colors duration-100 hover:text-gray-400 "
            onClick={handleNext}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-10 pt-8 lg:pt-14">
        {ContinueReadingList.length > 0
          ? ContinueReadingList.slice(start, end).map((card, index) => {
              return (
                <Link
                  to={`/story/${card.id}`}
                  className="flex flex-col rounded-lg cursor-pointer border-2 border-gray-300 hover:shadow-black hover:shadow-md overflow-hidden transition-all duration-300 hover:scale-105"
                  key={index}
                >
                  <img
                    className="object-cover w-full aspect-[3/2]"
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
