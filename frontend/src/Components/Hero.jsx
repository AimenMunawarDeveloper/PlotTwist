import HeroImage from "../assets/HeroImage.svg";
import TextUnderline from "../assets/TextUnderline.svg";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-0">
      <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 lg:gap-10 text-center lg:text-left">
        <h4 className="bg-black text-white p-2 rounded-md text-sm sm:text-lg uppercase w-fit mx-auto lg:mx-0">
          Endless Stories, One Choice at a Time
        </h4>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
          Create,{" "}
          <span className="relative inline-block">
            explore
            <img
              src={TextUnderline}
              className="absolute left-0 bottom-[-4px] w-full"
            />
          </span>
          ,and shape worlds beyond imagination.
        </h1>
        <p className="text-sm sm:text-base lg:text-lg">
          Dive into adventures where your vote writes the next chapter. Join
          writers and dreamers in weaving tales that twist and turn. Find your
          path — or make a new one.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center lg:justify-start">
          <Link to="/stories">
            <button className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
              Start Your Story
            </button>
          </Link>
          <Link to="/stories">
            <button className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
              Read & Vote
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-1/2 z-10 p-4 lg:p-6 flex justify-center">
        <img src={HeroImage} className="w-full max-w-md lg:max-w-none" />
      </div>
    </div>
  );
}
