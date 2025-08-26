import logoV3Transparent from "../assets/logoV4.png";
import logoV7 from "../assets/logoV7.png";
import {
  FaRegCopyright,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaDiscord,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="flex flex-col w-full shadow-black shadow-2xl bg-white ">
      <div className="w-full py-8 sm:py-12 lg:py-20 px-4 sm:px-8 lg:px-40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-8 lg:gap-0">
        <div className="flex justify-center items-center gap-2 sm:gap-4">
          <img
            src={logoV3Transparent}
            alt="plottwistlogoimage"
            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
          />
          <img
            src={logoV7}
            alt="plottwistlogotext"
            className="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36"
          />
        </div>
        <div className="flex flex-col gap-3 sm:gap-4 items-center">
          <h2 className="text-lg sm:text-xl font-semibold">Quick Links</h2>
          <Link
            to="/home"
            className={`hover:font-semibold text-sm sm:text-base ${
              currentPath === "/home" ? "border-b-2 border-black" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/stories"
            className={`hover:font-semibold text-sm sm:text-base ${
              currentPath === "/stories" ? "border-b-2 border-black" : ""
            }`}
          >
            Stories
          </Link>
          <Link
            to="/my-stories"
            className={`hover:font-semibold text-sm sm:text-base ${
              currentPath === "/my-stories" ? "border-b-2 border-black" : ""
            }`}
          >
            My Stories
          </Link>
          <Link
            to="/leaderboard"
            className={`hover:font-semibold text-sm sm:text-base ${
              currentPath === "/leaderboard" ? "border-b-2 border-black" : ""
            }`}
          >
            Leaderboard
          </Link>
        </div>
        <div className="flex flex-col gap-3 sm:gap-4 items-center sm:col-span-2 lg:col-span-1">
          <h2 className="text-lg sm:text-xl font-semibold">Stay Connected</h2>
          <div className="flex gap-3 sm:gap-4">
            <div className="bg-black p-2 sm:p-3 rounded-full cursor-pointer hover:bg-gray-800 transition-colors">
              <FaFacebook className="text-white w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="bg-black p-2 sm:p-3 rounded-full cursor-pointer hover:bg-gray-800 transition-colors">
              <FaInstagram className="text-white w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="bg-black p-2 sm:p-3 rounded-full cursor-pointer hover:bg-gray-800 transition-colors">
              <FaTwitter className="text-white w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="bg-black p-2 sm:p-3 rounded-full cursor-pointer hover:bg-gray-800 transition-colors">
              <FaDiscord className="text-white w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
        </div>
      </div>
      <span className="flex justify-center items-center gap-2 mb-4 sm:mb-8 text-sm sm:text-base">
        <FaRegCopyright /> 2025 PlotTwist
      </span>
    </div>
  );
}
