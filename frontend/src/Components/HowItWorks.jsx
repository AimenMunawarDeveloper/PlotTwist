import { FaBookOpen } from "react-icons/fa";
import { FaVoteYea } from "react-icons/fa";
import { GiMagicGate } from "react-icons/gi";
import CardDecoration from "../assets/CardDecoration.svg";

export default function HowItWorks() {
  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-center">How It Works</h1>
      <div className="w-full flex justify-between flex-wrap gap-10 items-center px-6 pt-14">
        <div className="flex flex-col flex-wrap justify-center items-center gap-4 w-1/4 text-justify border-1 border-[#B6B2B2] p-4 rounded-md shadow-md shadow-slate-500">
          <FaBookOpen className="w-8 h-8" />
          <h3 className="text-xl font-semibold">Step 1</h3>
          <h4 className="text-lg">Read the Latest Chapter</h4>
          <h5 className="text-md">
            Dive into the newest part of the story, written by our talented
            authors and shaped by the community.
          </h5>
        </div>
        <div className="flex flex-col flex-wrap justify-center items-center gap-4 w-1/4 text-justify border-1 border-[#B6B2B2] p-4 rounded-md shadow-md shadow-slate-500">
          <FaVoteYea className="w-8 h-8" />
          <h3 className="text-xl font-semibold">Step 2</h3>
          <h4 className="text-lg">Cast Your Vote</h4>
          <h5 className="text-md">
            Choose what happens next — every vote helps decide the direction of
            the plot.
          </h5>
        </div>
        <div className="flex flex-col flex-wrap justify-center items-center gap-4 relative w-1/4 text-justify border-1 border-[#B6B2B2] p-4 rounded-md shadow-md shadow-slate-500">
          <GiMagicGate className="w-8 h-8" />
          <h3 className="text-xl font-semibold">Step 3</h3>
          <h4 className="text-lg">Watch the Story Evolve</h4>
          <h5 className="text-md">
            Your decisions influence characters, twists, and endings in real
            time.
          </h5>
          <img
            src={CardDecoration}
            className="absolute top-0 right-[-60px] h-full"
          />
        </div>
      </div>
    </div>
  );
}
