import { FaShieldAlt, FaSkull, FaGem, FaCrown } from "react-icons/fa";

export default function LeaderboardTable() {
  const players = [
    {
      id: 1,
      place: 4,
      name: "Rens",
      avatar: "/api/placeholder/40/40",
      wins: 42,
      losses: 21,
      winrate: 64,
      kda: 1.23,
      rank: "Challenger",
      rankIcon: "challenger",
      rankColor: "text-white",
    },
    {
      id: 2,
      place: 5,
      name: "Edwin",
      avatar: "/api/placeholder/40/40",
      wins: 42,
      losses: 21,
      winrate: 64,
      kda: 1.23,
      rank: "Challenger",
      rankIcon: "challenger",
      rankColor: "text-white",
    },
    {
      id: 3,
      place: 6,
      name: "FlyWithMe",
      avatar: "/api/placeholder/40/40",
      wins: 20,
      losses: 21,
      winrate: 49,
      kda: 5.23,
      rank: "Challenger",
      rankIcon: "challenger",
      rankColor: "text-white",
    },
    {
      id: 4,
      place: 8,
      name: "BigBob007",
      avatar: "/api/placeholder/40/40",
      wins: 20,
      losses: 21,
      winrate: 49,
      kda: 5.23,
      rank: "Grandmaster",
      rankIcon: "grandmaster",
      rankColor: "text-white",
    },
    {
      id: 5,
      place: 10,
      name: "Pudge",
      avatar: "/api/placeholder/40/40",
      wins: 20,
      losses: 21,
      winrate: 49,
      kda: 5.23,
      rank: "Master",
      rankIcon: "master",
      rankColor: "text-white",
    },
    {
      id: 6,
      place: 12,
      name: "n0nameplayer",
      avatar: "/api/placeholder/40/40",
      wins: 12,
      losses: 21,
      winrate: 34,
      kda: 1.23,
      rank: "Master",
      rankIcon: "master",
      rankColor: "text-white",
    },
    {
      id: 7,
      place: 13,
      name: "Kimberly Mastrangelo",
      avatar: "/api/placeholder/40/40",
      wins: 12,
      losses: 21,
      winrate: 34,
      kda: 1.23,
      rank: "Gold",
      rankIcon: "gold",
      rankColor: "text-white",
    },
  ];

  const getRankIcon = (rankIcon) => {
    switch (rankIcon) {
      case "challenger":
        return <FaShieldAlt className="text-white" />;
      case "grandmaster":
        return <FaSkull className="text-white" />;
      case "master":
        return <FaGem className="text-white" />;
      case "gold":
        return <FaCrown className="text-white" />;
      default:
        return <FaShieldAlt className="text-white" />;
    }
  };

  const getProgressBarColor = (type) => {
    if (type === "local") {
      return "bg-orange-500";
    } else if (type === "winrate") {
      return "bg-green-500";
    } else if (type === "kda") {
      return "bg-blue-500";
    }
    return "bg-gray-500";
  };

  const getProgressBarWidth = (type, value) => {
    if (type === "local") {
      const total = value.wins + value.losses;
      return (value.wins / total) * 100;
    } else if (type === "winrate") {
      return value;
    } else if (type === "kda") {
      return Math.min((value / 10) * 100, 100);
    }
    return 0;
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 border-b border-gray-700">
              <th className="text-left py-4 px-6 text-white font-semibold">
                Place
              </th>
              <th className="text-left py-4 px-6 text-white font-semibold">
                Player name
              </th>
              <th className="text-center py-4 px-6 text-white font-semibold">
                Local stats
              </th>
              <th className="text-center py-4 px-6 text-white font-semibold">
                Winrate
              </th>
              <th className="text-center py-4 px-6 text-white font-semibold">
                KDA
              </th>
              <th className="text-left py-4 px-6 text-white font-semibold">
                Rank
              </th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr
                key={player.id}
                className={`border-b border-gray-700 hover:bg-gray-800 transition-colors ${
                  index % 2 === 0 ? "bg-gray-900" : "bg-gray-850"
                }`}
              >
                <td className="py-4 px-6 text-white font-medium">
                  {player.place}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <img
                      src={player.avatar}
                      alt={player.name}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name}`;
                      }}
                    />
                    <span className="text-white font-medium">
                      {player.name}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-white font-medium mb-1">
                      {player.wins} - {player.losses}
                    </span>
                    <div className="w-16 h-1 bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getProgressBarColor("lokal")}`}
                        style={{
                          width: `${getProgressBarWidth("lokal", {
                            wins: player.wins,
                            losses: player.losses,
                          })}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-white font-medium mb-1">
                      {player.winrate}%
                    </span>
                    <div className="w-16 h-1 bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getProgressBarColor("winrate")}`}
                        style={{
                          width: `${getProgressBarWidth(
                            "winrate",
                            player.winrate
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-white font-medium mb-1">
                      {player.kda}
                    </span>
                    <div className="w-16 h-1 bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getProgressBarColor("kda")}`}
                        style={{
                          width: `${getProgressBarWidth("kda", player.kda)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    {getRankIcon(player.rankIcon)}
                    <span className={`font-medium ${player.rankColor}`}>
                      {player.rank}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
