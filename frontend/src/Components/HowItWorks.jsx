import { FaBookOpen } from "react-icons/fa";
import { FaVoteYea } from "react-icons/fa";
import { GiMagicGate } from "react-icons/gi";
import CardDecoration from "../assets/CardDecoration.svg";

const cards = [
  {
    icon: FaBookOpen,
    step: 1,
    heading: "Read the Latest Chapter",
    subHeading:
      "Dive into the newest part of the story, written by our talented authors and shaped by the community.",
  },
  {
    icon: FaVoteYea,
    step: 2,
    heading: "Cast Your Vote",
    subHeading:
      "Choose what happens next — every vote helps decide the direction of the plot.",
  },
  {
    icon: GiMagicGate,
    step: 3,
    heading: "Watch the Story Evolve",
    subHeading:
      "Your decisions influence characters, twists, and endings in real time.",
  },
];
export default function HowItWorks() {
  return (
    <div className="w-full">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-0">
        How It Works
      </h1>
      <div className="w-full flex flex-col lg:flex-row justify-between gap-6 lg:gap-10 items-center px-4 lg:px-6 pt-8 lg:pt-14">
        {cards.length > 0
          ? cards.map((card, index) => {
              return (
                <div
                  className="flex flex-col justify-center items-center gap-3 lg:gap-4 relative w-full lg:w-1/4 text-center lg:text-justify border-1 border-[#B6B2B2] p-4 lg:p-4 rounded-md shadow-md shadow-slate-500"
                  key={index}
                >
                  <card.icon className="w-6 h-6 lg:w-8 lg:h-8" />
                  <h3 className="text-lg lg:text-xl font-semibold">
                    Step {card.step}
                  </h3>
                  <h4 className="text-base lg:text-lg">{card.heading}</h4>
                  <h5 className="text-sm lg:text-md">{card.subHeading}</h5>
                  {card.step === 3 ? (
                    <img
                      src={CardDecoration}
                      className="absolute top-0 right-[-60px] h-full hidden lg:block"
                    />
                  ) : (
                    ""
                  )}
                </div>
              );
            })
          : "No step available"}
      </div>
    </div>
  );
}
