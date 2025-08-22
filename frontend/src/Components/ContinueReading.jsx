import { useState } from "react";
import first from "../assets/ContinueReading/1.jpg";
import second from "../assets/ContinueReading/2.jpg";
import third from "../assets/ContinueReading/3.jpg";
import fourth from "../assets/ContinueReading/4.jpg";
import fifth from "../assets/ContinueReading/5.jpg";
import sixth from "../assets/TopPicksForYou/1.jpg";
import seventh from "../assets/TopPicksForYou/2.jpg";
import eighth from "../assets/TopPicksForYou/3.jpg";
import ninth from "../assets/TopPicksForYou/4.jpg";
import tenth from "../assets/TopPicksForYou/5.jpg";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const ContinueReadingList = [
  { name: "Summer Nights", image: first, genre: "Slice of Life" },
  { name: "The Lantern Keeper", image: second, genre: "Supernatural" },
  { name: "Beyond the Court", image: third, genre: "Sports" },
  { name: "Empire’s Fall", image: fourth, genre: "Historical" },
  { name: "The Forgotten Asylum", image: fifth, genre: "Horror" },
  { name: "The House on Black Hill", image: sixth, genre: "Horror" },
  { name: "The Misadventures of Milo", image: seventh, genre: "Comedy" },
  { name: "Beneath the Broken Sky", image: eighth, genre: "Drama" },
  { name: "The Little Cloud Who Could", image: ninth, genre: "Children" },
  { name: "Sailing Beyond the Horizon", image: tenth, genre: "Adventure" },
];
export default function ContinueReading() {
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
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Continue Reading</h1>
        <div className="flex gap-2">
          <FaArrowLeft
            className="w-8 h-8 cursor-pointer hover:text-gray-400 transition-colors duration-100"
            onClick={handlePrevious}
          />
          <FaArrowRight
            className="w-8 h-8 cursor-pointer transition-colors duration-100 hover:text-gray-400 "
            onClick={handleNext}
          />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-10 pt-14">
        {ContinueReadingList.length > 0
          ? ContinueReadingList.slice(start, end).map((card, index) => {
              return (
                <div
                  className="flex flex-col rounded-lg cursor-pointer border-2 border-gray-300 hover:shadow-black hover:shadow-md overflow-hidden"
                  key={index}
                >
                  <img
                    className="object-cover w-full aspect-[3/2]"
                    src={card.image}
                  />
                  <div className="py-1">
                    <p className="px-2 font-medium break-words">{card.name}</p>
                    <p className="px-2 text-gray-400 text-sm">{card.genre}</p>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}
