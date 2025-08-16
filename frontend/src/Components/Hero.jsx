import HeroImage from "../assets/HeroImage.svg";
import TextUnderline from "../assets/TextUnderline.svg";
export default function Hero() {
  return (
    <div className="flex justify-between flex-wrap">
      <div className="w-1/2 flex flex-col justify-center gap-10">
        <h4 className="bg-black text-white p-2 rounded-md text-lg uppercase w-fit">
          Endless Stories, One Choice at a Time
        </h4>
        <h1 className="text-5xl font-bold">
          Create,{" "}
          <span className="relative inline-block">
            explore
            <img
              src={TextUnderline}
              className="absolute left-0 bottom-[-4px]"
            />
          </span>
          ,and shape worlds beyond imagination.
        </h1>
        <p className="text-lg">
          Dive into adventures where your vote writes the next chapter. Join
          writers and dreamers in weaving tales that twist and turn. Find your
          path — or make a new one.
        </p>
        <div className="flex gap-5">
          <button className="bg-black text-white px-4 py-2 rounded-md">
            Start Your Story
          </button>
          <button className="bg-black text-white px-4 py-2 rounded-md">
            Read & Vote
          </button>
        </div>
      </div>
      <div className="w-1/2 z-10 p-6">
        <img src={HeroImage} />
      </div>
    </div>
  );
}
