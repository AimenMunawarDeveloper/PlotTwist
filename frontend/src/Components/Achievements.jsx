import {
  FaFeatherAlt,
  FaCommentDots,
  FaVoteYea,
  FaStar,
  FaFire,
  FaBookOpen,
  FaMedal,
} from "react-icons/fa";
import { GiTreeBranch, GiLaurelCrown } from "react-icons/gi";
import { MdAutoGraph } from "react-icons/md";
const badgesList = [
  {
    name: "New Quill",
    condition: "Create your first story",
    icon: FaFeatherAlt,
  },
  {
    name: "Branch Crafter",
    condition: "Add your first branch to any story",
    icon: GiTreeBranch,
  },
  {
    name: "Pathfinder",
    condition: "Your branch wins a vote",
    icon: FaVoteYea,
  },
  {
    name: "Choice Maker",
    condition: "Cast 10 votes",
    icon: FaStar,
  },
  {
    name: "Story Streak",
    condition: "Write on 3 consecutive days",
    icon: FaFire,
  },
  {
    name: "Marathon Reader",
    condition: "Read 10 chapters in a day",
    icon: FaBookOpen,
  },
  {
    name: "First Applause",
    condition: "Reach 50 reads on a story",
    icon: MdAutoGraph,
  },
  {
    name: "Rising Star",
    condition: "Reach 200 reads + 20 votes",
    icon: FaMedal,
  },
  {
    name: "Master Storyweaver",
    condition: "Publish 5 stories with 3+ branches each",
    icon: GiLaurelCrown,
  },
  {
    name: "Community Voice",
    condition: "Post 10 constructive comments",
    icon: FaCommentDots,
  },
];
export default function Achievements() {
  return (
    <div className="w-full">
      <div className="flex flex-col">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
          Badges
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-10 mt-8 sm:mt-10 lg:mt-14">
          {badgesList.length > 0
            ? badgesList.map((badge, index) => {
                return (
                  <div
                    className="flex flex-col gap-2 border-2 border-black items-center justify-center p-3 sm:p-4 rounded-lg text-center"
                    key={index}
                  >
                    {<badge.icon className="w-6 h-6 sm:w-8 sm:h-8" />}
                    <p className="text-sm sm:text-base lg:text-lg font-semibold">
                      {badge.name}
                    </p>
                    <p className="text-xs sm:text-sm">{badge.condition}</p>
                  </div>
                );
              })
            : "No current badges"}
        </div>
      </div>
    </div>
  );
}
