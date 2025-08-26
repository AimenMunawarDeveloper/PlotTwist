import { FaCrown } from "react-icons/fa";
import { GiCutDiamond } from "react-icons/gi";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function TopThreeCards() {
  const topThree = [
    {
      id: 1,
      name: "Jane Smith",
      avatar: "/api/placeholder/150/150",
      points: 2500,
      rank: 1,
      prize: "100,000",
      medal: "gold",
      borderColor: "border-gray-600",
      rankColor: "bg-gray-600",
      trend: null,
    },
    {
      id: 2,
      name: "Sam Black",
      avatar: "/api/placeholder/150/150",
      points: 2200,
      rank: 2,
      prize: "50,000",
      medal: "silver",
      borderColor: "border-gray-500",
      rankColor: "bg-gray-500",
      trend: "up",
    },
    {
      id: 3,
      name: "Jessica Cher",
      avatar: "/api/placeholder/150/150",
      points: 2000,
      rank: 3,
      prize: "20,000",
      medal: "bronze",
      borderColor: "border-gray-400",
      rankColor: "bg-gray-400",
      trend: "down",
    },
  ];
  return (
    <div className="w-full relative overflow-hidden">
      <div className="relative z-10 w-full px-4 pt-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-black">Top Performers</h2>
          <p className="text-lg text-black">Leading the competition</p>
        </div>
        <div className="flex justify-center items-end gap-8 w-1/2 mx-auto pt-10">
          {topThree.map((participant) => (
            <div
              key={participant.id}
              className={`flex flex-col items-center transition-all duration-300 relative flex-1 ${
                participant.rank === 1
                  ? "transform scale-110 -translate-y-4 order-2"
                  : participant.rank === 2
                  ? "order-1"
                  : "order-3"
              }`}
            >
              <div className="relative mb-4">
                {participant.rank === 1 && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-20">
                    <FaCrown className="text-gray-600 text-2xl" />
                  </div>
                )}
                {participant.trend && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                    {participant.trend === "up" ? (
                      <FaArrowUp className="text-gray-600 text-sm" />
                    ) : (
                      <FaArrowDown className="text-gray-600 text-sm" />
                    )}
                  </div>
                )}
                <div
                  className={`w-32 h-32 rounded-full overflow-hidden border-4 shadow-lg ${
                    participant.rank === 1
                      ? "border-gray-600 shadow-gray-600/50"
                      : participant.borderColor
                  }`}
                >
                  <img
                    src={participant.avatar}
                    alt={participant.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${participant.name}`;
                    }}
                  />
                </div>
                <div
                  className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${participant.rankColor}`}
                >
                  {participant.rank}
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-center text-black">
                {participant.name}
              </h3>
              <p className="text-black text-sm mb-2">
                {participant.points.toLocaleString()} points
              </p>
              <div className="text-center text-black">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <GiCutDiamond className="text-gray-600" />
                  <span className="font-bold text-lg">{participant.prize}</span>
                </div>
                <div className="text-xs text-black">Prize</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
