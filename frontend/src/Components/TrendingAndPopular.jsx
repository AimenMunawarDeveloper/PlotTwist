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

const TrendingList = [
  { name: "Summer Nights", image: first, genre: "Slice of Life", ranking: 1 },
  {
    name: "The Lantern Keeper",
    image: second,
    genre: "Supernatural",
    ranking: 2,
  },
  { name: "Beyond the Court", image: third, genre: "Sports", ranking: 3 },
  { name: "Empire’s Fall", image: fourth, genre: "Historical", ranking: 4 },
  { name: "The Forgotten Asylum", image: fifth, genre: "Horror", ranking: 5 },
];
const PopularList = [
  {
    name: "The House on Black Hill",
    image: sixth,
    genre: "Horror",
    ranking: 1,
  },
  {
    name: "The Misadventures of Milo",
    image: seventh,
    genre: "Comedy",
    ranking: 2,
  },
  { name: "Beneath the Broken Sky", image: eighth, genre: "Drama", ranking: 3 },
  {
    name: "The Little Cloud Who Could",
    image: ninth,
    genre: "Children",
    ranking: 4,
  },
  {
    name: "Sailing Beyond the Horizon",
    image: tenth,
    genre: "Adventure",
    ranking: 5,
  },
];
export default function TrendingAndPopular() {
  const [currentTab, setCurrentTab] = useState("trending");
  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold">Trending & Popular</h1>
      <div className="flex gap-2 pt-8">
        <p
          className="bg-gray-400 px-4 py-2 hover:bg-gray-500 rounded-full text-white cursor-pointer"
          onClick={() => setCurrentTab("trending")}
        >
          Trending
        </p>
        <p
          className="bg-gray-400 px-4 py-2 hover:bg-gray-500 rounded-full text-white cursor-pointer"
          onClick={() => setCurrentTab("popular")}
        >
          Popular
        </p>
      </div>
      <div className="grid grid-cols-5 gap-10 pt-10">
        {" "}
        {currentTab === "trending"
          ? TrendingList.map((card, index) => {
              return (
                <div
                  className="flex flex-col rounded-lg cursor-pointer hover:shadow-black hover:shadow-md overflow-hidden border-2 border-gray-400"
                  key={index}
                >
                  <img
                    className="object-cover w-full aspect-[3/2]"
                    src={card.image}
                  />
                  <div className="py-1">
                    <p className="px-4 text-4xl break-words ">{card.ranking}</p>
                    <p className="px-2 font-medium break-words">{card.name}</p>
                    <p className="px-2 text-gray-400 text-sm">{card.genre}</p>
                  </div>
                </div>
              );
            })
          : PopularList.map((card, index) => {
              return (
                <div
                  className="flex flex-col rounded-lg cursor-pointer hover:shadow-black hover:shadow-md overflow-hidden border-2 border-gray-400"
                  key={index}
                >
                  <img
                    className="object-cover w-full aspect-[3/2]"
                    src={card.image}
                  />
                  <div className="py-1">
                    <p className="px-4 text-4xl break-words">{card.ranking}</p>
                    <p className="px-2 font-medium break-words">{card.name}</p>
                    <p className="px-2 text-gray-400 text-sm">{card.genre}</p>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
