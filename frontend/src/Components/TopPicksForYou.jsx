import first from "../assets/TopPicksForYou/1.jpg";
import second from "../assets/TopPicksForYou/2.jpg";
import third from "../assets/TopPicksForYou/3.jpg";
import fourth from "../assets/TopPicksForYou/4.jpg";
import fifth from "../assets/TopPicksForYou/5.jpg";
import sixth from "../assets/TopPicksForYou/6.jpg";
import seventh from "../assets/ContinueReading/1.jpg";
import eighth from "../assets/ContinueReading/2.jpg";
import nineth from "../assets/ContinueReading/3.jpg";
import tenth from "../assets/ContinueReading/4.jpg";

const TopPicksForYouList = [
  { name: "The House on Black Hill", image: first, genre: "Horror" },
  { name: "The Misadventures of Milo", image: second, genre: "Comedy" },
  { name: "Beneath the Broken Sky", image: third, genre: "Drama" },
  { name: "The Little Cloud Who Could", image: fourth, genre: "Children" },
  { name: "Sailing Beyond the Horizon", image: fifth, genre: "Adventure" },
  { name: "When Petals Fall", image: sixth, genre: "Romance" },
  { name: "Summer Nights", image: seventh, genre: "Slice of Life" },
  { name: "The Lantern Keeper", image: eighth, genre: "Supernatural" },
  { name: "Beyond the Court", image: nineth, genre: "Sports" },
  { name: "Empire’s Fall", image: tenth, genre: "Historical" },
];
export default function TopPicksForYou() {
  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold">Top Picks For You</h1>
      <div className="grid grid-cols-5 gap-10 pt-14">
        {TopPicksForYouList.length > 0
          ? TopPicksForYouList.map((card, index) => {
              return (
                <div
                  className="flex flex-col rounded-lg cursor-pointer hover:shadow-black hover:shadow-md overflow-hidden"
                  key={index}
                >
                  <img
                    className="object-cover w-full aspect-[2/3]"
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
