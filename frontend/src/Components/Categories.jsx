import {
  FaHeart,
  FaDragon,
  FaTheaterMasks,
  FaLaugh,
  FaShieldAlt,
  FaRobot,
  FaEye,
  FaSearch,
  FaBasketballBall,
  FaLandmark,
  FaHandHoldingHeart,
  FaChild,
} from "react-icons/fa";

import { GiCampfire, GiGhost, GiSpookyHouse } from "react-icons/gi";

const categoriesList = [
  { name: "Romance", icon: FaHeart },
  { name: "Fantasy", icon: FaDragon },
  { name: "Drama", icon: FaTheaterMasks },
  { name: "Comedy", icon: FaLaugh },
  { name: "Slice of Life", icon: GiCampfire },
  { name: "Superhero", icon: FaShieldAlt },
  { name: "Sci-fi", icon: FaRobot },
  { name: "Thriller", icon: FaEye },
  { name: "Supernatural", icon: GiGhost },
  { name: "Mystery", icon: FaSearch },
  { name: "Sports", icon: FaBasketballBall },
  { name: "Historical", icon: FaLandmark },
  { name: "Heart-warming", icon: FaHandHoldingHeart },
  { name: "Horror", icon: GiSpookyHouse },
  { name: "Children", icon: FaChild },
];

export default function Categories() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-5 gap-10">
        {categoriesList.length > 0
          ? categoriesList.map((category, index) => {
              return (
                <div
                  className="bg-[#262626] hover:shadow-black hover:shadow-md flex flex-col p-6 h-28 rounded-lg cursor-pointer items-between"
                  key={index}
                >
                  <p className="text-white">{category.name}</p>
                  <category.icon className="w-12 h-12 text-white self-end" />
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}
