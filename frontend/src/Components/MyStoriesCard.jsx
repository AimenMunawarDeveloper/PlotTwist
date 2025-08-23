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

const startedList = [
  {
    name: "Summer Nights",
    image: first,
    genre: "Slice of Life",
    startingText:
      "On the edge of the silent woods, a shimmering gate appeared overnight. No one knew who built it, or where it led… until you stepped closer.",
  },
  {
    name: "The Lantern Keeper",
    image: second,
    genre: "Supernatural",
    startingText:
      "On the edge of the silent woods, a shimmering gate appeared overnight. No one knew who built it, or where it led… until you stepped closer.",
  },
  {
    name: "Beyond the Court",
    image: third,
    genre: "Sports",
    startingText:
      "On the edge of the silent woods, a shimmering gate appeared overnight. No one knew who built it, or where it led… until you stepped closer.",
  },
  {
    name: "Empire’s Fall",
    image: fourth,
    genre: "Historical",
    startingText:
      "On the edge of the silent woods, a shimmering gate appeared overnight. No one knew who built it, or where it led… until you stepped closer.",
  },
  {
    name: "The Forgotten Asylum",
    image: fifth,
    genre: "Horror",
    startingText:
      "On the edge of the silent woods, a shimmering gate appeared overnight. No one knew who built it, or where it led… until you stepped closer.",
  },
];

const contributedList = [
  {
    name: "The House on Black Hill",
    image: sixth,
    genre: "Horror",
    startingText:
      "On the edge of the silent woods, a shimmering gate appeared overnight. No one knew who built it, or where it led… until you stepped closer.",
  },
  {
    name: "The Misadventures of Milo",
    image: seventh,
    genre: "Comedy",
    startingText:
      "On the edge of the silent woods, a shimmering gate appeared overnight. No one knew who built it, or where it led… until you stepped closer.",
  },
  {
    name: "Beneath the Broken Sky",
    image: eighth,
    genre: "Drama",
    startingText:
      "On the edge of the silent woods, a shimmering gate appeared overnight. No one knew who built it, or where it led… until you stepped closer.",
  },
  {
    name: "The Little Cloud Who Could",
    image: ninth,
    genre: "Children",
    startingText:
      "On the edge of the silent woods, a shimmering gate appeared overnight. No one knew who built it, or where it led… until you stepped closer.",
  },
  {
    name: "Sailing Beyond the Horizon",
    image: tenth,
    genre: "Adventure",
    startingText:
      "On the edge of the silent woods, a shimmering gate appeared overnight. No one knew who built it, or where it led… until you stepped closer.",
  },
];

const readList = [
  {
    name: "The House on Black Hill",
    image: sixth,
    genre: "Horror",
    startingText:
      "On the edge of the silent woods, a shimmering gate appeared overnight. No one knew who built it, or where it led… until you stepped closer.",
  },
  {
    name: "The Misadventures of Milo",
    image: seventh,
    genre: "Comedy",
    startingText:
      "On the edge of the silent woods, a shimmering gate appeared overnight. No one knew who built it, or where it led… until you stepped closer.",
  },
  {
    name: "Beneath the Broken Sky",
    image: eighth,
    genre: "Drama",
    startingText:
      "On the edge of the silent woods, a shimmering gate appeared overnight. No one knew who built it, or where it led… until you stepped closer.",
  },
  {
    name: "The Little Cloud Who Could",
    image: ninth,
    genre: "Children",
    startingText:
      "On the edge of the silent woods, a shimmering gate appeared overnight. No one knew who built it, or where it led… until you stepped closer.",
  },
  {
    name: "Sailing Beyond the Horizon",
    image: tenth,
    genre: "Adventure",
    startingText:
      "On the edge of the silent woods, a shimmering gate appeared overnight. No one knew who built it, or where it led… until you stepped closer.",
  },
];

export default function MyStoriesCard({ heading }) {
  let data = [];

  if (heading === "Started") data = startedList;
  else if (heading === "Contributed") data = contributedList;
  else if (heading === "Read") data = readList;

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-center mb-6">{heading}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((card, index) => (
          <div
            key={index}
            className="flex items-center border rounded-lg shadow-md p-4 bg-white"
          >
            <img
              src={card.image}
              alt={card.name}
              className="w-1/3 h-48 object-cover rounded-md"
            />
            <div className="flex flex-col ml-4">
              <h4 className="mt-3 text-lg font-semibold">{card.name}</h4>
              <p className="text-sm text-gray-600 mt-2">{card.genre}</p>
              <p className="text-xs text-gray-600 mt-4">{card.startingText}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
