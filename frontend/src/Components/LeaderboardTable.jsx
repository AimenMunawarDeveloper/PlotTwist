import { FaShieldAlt, FaSkull, FaGem, FaCrown } from "react-icons/fa";
import { leaderboardData } from "../data/mockData";

export default function LeaderboardTable() {
  const players = leaderboardData;

  const getRankIcon = (rankIcon) => {
    switch (rankIcon) {
      case "challenger":
        return <FaCrown className="w-6 h-6 text-yellow-400" />;
      case "grandmaster":
        return <FaGem className="w-6 h-6 text-purple-400" />;
      case "master":
        return <FaShieldAlt className="w-6 h-6 text-blue-400" />;
      case "gold":
        return <FaSkull className="w-6 h-6 text-yellow-600" />;
      default:
        return <FaShieldAlt className="w-6 h-6 text-gray-400" />;
    }
  };
  return (
    <div className="w-full">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Player
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Wins
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Losses
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Win Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                KDA
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Rank
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {players.map((player) => (
              <tr key={player.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{player.place}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={player.avatar}
                        alt={player.name}
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold text-sm hidden">
                        {player.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {player.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {player.wins}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {player.losses}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {player.winrate}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {player.kda}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getRankIcon(player.rankIcon)}
                    <span className="ml-2 text-sm font-medium text-gray-900">
                      {player.rank}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden space-y-4">
        {players.map((player) => (
          <div
            key={player.id}
            className="bg-white rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="text-base sm:text-lg font-bold text-gray-900">
                  #{player.place}
                </div>
                <div className="relative">
                  <img
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
                    src={player.avatar}
                    alt={player.name}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold text-sm sm:text-base hidden">
                    {player.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                    {player.name}
                  </div>
                  <div className="flex items-center mt-1">
                    {getRankIcon(player.rankIcon)}
                    <span className="ml-1 sm:ml-2 text-xs text-gray-600 truncate">
                      {player.rank}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
              <div>
                <div className="text-xs text-gray-500">Wins</div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900">
                  {player.wins}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Losses</div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900">
                  {player.losses}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Win Rate</div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900">
                  {player.winrate}%
                </div>
              </div>
            </div>
            <div className="mt-2 sm:mt-3 text-center">
              <div className="text-xs text-gray-500">KDA</div>
              <div className="text-xs sm:text-sm font-semibold text-gray-900">
                {player.kda}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
