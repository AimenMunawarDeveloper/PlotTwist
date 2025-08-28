import { FaGift, FaEdit, FaUser } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";

export default function UserInfo() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatJoinDate = (dateString) => {
    if (!dateString) return "Recently";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
        Profile
      </h1>
      <div className="flex flex-col lg:flex-row p-6 sm:p-8 lg:p-14 w-11/12 sm:w-4/5 rounded-lg bg-black text-white mt-8 sm:mt-10 lg:mt-14 shadow-black shadow-lg gap-8 lg:gap-16">
        <div className="w-full lg:w-1/4 flex flex-col justify-center items-center gap-6 lg:gap-10">
          <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUser className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-white" />
            )}
          </div>
          <div className="text-center lg:text-left">
            <p className="mt-2 lg:mt-4 text-lg sm:text-xl font-semibold">
              {user.username}
            </p>
            <p className="text-xs sm:text-sm font-normal">
              {user.gender || "Not specified"},{" "}
              {user.location || "Not specified"}
            </p>
            {user.birthday && (
              <div className="flex gap-2 items-center mt-2 text-xs sm:text-sm font-normal justify-center lg:justify-start">
                <FaGift />
                Birth Day: {formatDate(user.birthday)}
              </div>
            )}
          </div>
        </div>
        <div className="w-full lg:w-3/4 flex flex-col gap-3 sm:gap-4">
          <div className="flex justify-between items-center">
            <p className="mt-2 lg:mt-4 text-lg sm:text-xl font-semibold">
              {user.displayName}
            </p>
            <FaEdit className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
          </div>
          <p className="mt-2 lg:mt-4 text-lg sm:text-xl font-semibold">
            Details
          </p>
          <p className="text-xs sm:text-sm font-normal">
            Joined in {formatJoinDate(user.createdAt)}
          </p>
          <p className="text-xs sm:text-sm font-normal">Email: {user.email}</p>
          <p className="mt-2 lg:mt-4 text-lg sm:text-xl font-semibold">
            Favorite Genres
          </p>
          <p className="text-xs sm:text-sm font-normal">
            {user.favoriteGenres && user.favoriteGenres.length > 0
              ? user.favoriteGenres.join(", ")
              : "No favorite genres set"}
          </p>
          <p className="mt-2 lg:mt-4 text-lg sm:text-xl font-semibold">
            My Stories
          </p>
          <div className="grid grid-cols-2 lg:flex lg:justify-between w-full lg:w-4/5 gap-3 lg:gap-0">
            <div className="w-full lg:w-28 bg-white text-black rounded-lg p-2 sm:p-3 flex flex-col gap-1 sm:gap-2 items-center justify-center">
              <p className="text-center text-xs sm:text-sm">Stories Written</p>
              <p className="text-gray-700 text-xs sm:text-sm">
                ({user.stats?.storiesWritten || 0})
              </p>
            </div>
            <div className="w-full lg:w-28 bg-white text-black rounded-lg p-2 sm:p-3 flex flex-col gap-1 sm:gap-2 items-center justify-center">
              <p className="text-center text-xs sm:text-sm">Stories Read</p>
              <p className="text-gray-700 text-xs sm:text-sm">
                ({user.stats?.storiesRead || 0})
              </p>
            </div>
            <div className="w-full lg:w-28 bg-white text-black rounded-lg p-2 sm:p-3 flex flex-col gap-1 sm:gap-2 items-center justify-center">
              <p className="text-center text-xs sm:text-sm">Followers</p>
              <p className="text-gray-700 text-xs sm:text-sm">
                ({user.stats?.followers || 0})
              </p>
            </div>
            <div className="w-full lg:w-28 bg-white text-black rounded-lg p-2 sm:p-3 flex flex-col gap-1 sm:gap-2 items-center justify-center">
              <p className="text-center text-xs sm:text-sm">Points</p>
              <p className="text-gray-700 text-xs sm:text-sm">
                ({user.stats?.points || 0})
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
