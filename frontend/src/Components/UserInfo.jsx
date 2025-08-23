import { FaGift, FaEdit, FaUser } from "react-icons/fa";

export default function UserInfo() {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-center">Profile</h1>
      <div className="flex p-14 w-4/5 rounded-lg bg-black text-white mt-14 shadow-black shadow-lg gap-16">
        <div className="w-1/4 flex flex-col justify-center items-center gap-10">
          <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center">
            <FaUser className="w-16 h-16 text-white" />
          </div>
          <div>
            <p className="mt-4 text-xl font-semibold">Aimen Munawar</p>
            <p className="text-sm font-normal">Female, Islamabad, Pakistan</p>
            <div className="flex gap-2 items-center mt-2 text-sm font-normal">
              <FaGift />
              Birth Day: 16/04/2005
            </div>
          </div>
        </div>
        <div className="w-3/4 flex flex-col gap-4">
          <div className="flex justify-between">
            {" "}
            <p className="mt-4 text-xl font-semibold">Amy Munawar</p>
            <FaEdit className="w-6 h-6 cursor-pointer" />
          </div>
          <p className="mt-4 text-xl font-semibold">Details</p>
          <p className="text-sm font-normal">Joined in August 14,2025</p>
          <p className="mt-4 text-xl font-semibold">Favorite Genres</p>
          <p className="text-sm font-normal">
            Romance, Supehero, Comedy{" "}
            <span className="text-xs cursor-pointer hover:underline">
              +5 more
            </span>
          </p>
          <p className="mt-4 text-xl font-semibold">My Stories</p>
          <div className="flex justify-between w-4/5">
            <div className="w-28 bg-white text-black rounded-lg p-3 flex flex-col gap-2 items-center justify-center">
              <p className="text-center">Stories Written</p>
              <p className="text-gray-700">(4)</p>
            </div>
            <div className="w-28 bg-white text-black rounded-lg p-3 flex flex-col gap-2 items-center justify-center">
              <p className="text-center">Stories Read</p>
              <p className="text-gray-700">(10)</p>
            </div>
            <div className="w-28 bg-white text-black rounded-lg p-3 flex flex-col gap-2 items-center justify-center">
              <p className="text-center">Followers</p>
              <p className="text-gray-700">(5)</p>
            </div>
            <div className="w-28 bg-white text-black rounded-lg p-3 flex flex-col gap-2 items-center justify-center">
              <p className="text-center">Points</p>
              <p className="text-gray-700">(1000)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
