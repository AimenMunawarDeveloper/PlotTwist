import logoV3Transparent from "../assets/logoV4.png";
import logoV7 from "../assets/logoV7.png";
import { Link, useLocation } from "react-router-dom";

export default function TopBar() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="w-full flex flex-col sm:flex-row justify-between items-center z-10 gap-4 sm:gap-0 relative">
      <div className="flex justify-center items-center gap-2 sm:gap-4">
        <img
          src={logoV3Transparent}
          alt="plottwistlogoimage"
          className="w-12 h-12 sm:w-16 sm:h-16"
        />
        <img
          src={logoV7}
          alt="plottwistlogotext"
          className="w-20 h-20 sm:w-24 sm:h-24"
        />
      </div>
      <div className="flex flex-wrap justify-center sm:justify-between items-center w-full sm:w-3/4 text-black gap-4 sm:gap-2 text-sm sm:text-base">
        <Link
          to="/home"
          className={`hover:font-semibold px-2 py-1 ${
            currentPath === "/home" ? "border-b-2 border-black" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/stories"
          className={`hover:font-semibold px-2 py-1 ${
            currentPath === "/stories" ? "border-b-2 border-black" : ""
          }`}
        >
          Stories
        </Link>
        <Link
          to="/my-stories"
          className={`hover:font-semibold px-2 py-1 ${
            currentPath === "/my-stories" ? "border-b-2 border-black" : ""
          }`}
        >
          <span className="hidden sm:inline">My Stories</span>
          <span className="sm:hidden">My</span>
        </Link>
        <Link
          to="/leaderboard"
          className={`hover:font-semibold px-2 py-1 ${
            currentPath === "/leaderboard" ? "border-b-2 border-black" : ""
          }`}
        >
          <span className="hidden sm:inline">Leaderboard</span>
          <span className="sm:hidden">Board</span>
        </Link>
        <Link
          to="/profile"
          className={`hover:font-semibold px-2 py-1 ${
            currentPath === "/profile" ? "border-b-2 border-black" : ""
          }`}
        >
          Profile
        </Link>
        <Link
          to="/"
          className={`hover:font-semibold px-2 py-1 ${
            currentPath === "/" ? "border-b-2 border-black" : ""
          }`}
        >
          Login
        </Link>
      </div>
    </div>
  );
}
