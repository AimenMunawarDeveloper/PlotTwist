import StoryThumbnail1 from "../assets/StoryThumbnail1.jpg";
import StoryThumbnail2 from "../assets/StoryThumbnail2.jpg";
import StoryThumbnail3 from "../assets/StoryThumbnail3.jpg";

const cards = [
  {
    image: StoryThumbnail1,
    title: "The Forgotten Gate",
    startingText:
      "On the edge of the silent woods, a shimmering gate appeared overnight. No one knew who built it, or where it led… until you stepped closer.",
  },
  {
    image: StoryThumbnail2,
    title: "Shadows Over the Kingdom",
    startingText:
      "The kingdom celebrated peace for a hundred years—until a shadow returned to the castle walls, whispering of old betrayals.",
  },
  {
    image: StoryThumbnail3,
    title: "The Vanishing Hour",
    startingText:
      "At exactly 2:13 a.m., the town clock stopped—and so did the people. Only you remained awake.",
  },
];
export default function Trending() {
  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-center">Trending</h1>
      <div className="w-full flex justify-between flex-wrap gap-10 items-center px-6 pt-14">
        {cards.length > 0
          ? cards.map((card, index) => {
              return (
                <div
                  className="flex flex-col cursor-pointer flex-wrap justify-center items-center gap-4 relative w-[350px] height-[200px] text-justify border-1 border-[#B6B2B2] rounded-md shadow-md shadow-slate-500 hover:shadow-lg hover:shadow-black"
                  key={index}
                >
                  <img
                    src={card.image}
                    className="h-[300px] w-full object-cover "
                  />
                  <div className="p-6">
                    <h4 className="text-lg mb-2 font-semibold">{card.title}</h4>
                    <h5 className="text-md">{card.startingText}</h5>
                  </div>
                </div>
              );
            })
          : "No step available"}
      </div>
    </div>
  );
}
