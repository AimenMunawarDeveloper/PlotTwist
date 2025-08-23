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
        <h1 className="text-4xl font-bold text-center">Badges</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 mt-14">
          {badgesList.length > 0
            ? badgesList.map((badge, index) => {
                return (
                  <div
                    className="flex flex-col gap-2 border-2 border-black items-center justify-center p-2 rounded-lg text-center"
                    key={index}
                  >
                    {<badge.icon />}
                    <p className="text-lg">{badge.name}</p>
                    <p className="text-sm">{badge.condition}</p>
                  </div>
                );
              })
            : "No current badges"}
        </div>
      </div>
    </div>
  );
}
