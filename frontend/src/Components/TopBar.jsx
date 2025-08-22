import logoV3Transparent from "../assets/logoV4.png";
import logoV7 from "../assets/logoV7.png";
import { Link, useLocation } from "react-router-dom";

export default function TopBar() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="w-full flex justify-between z-10 flex-wrap relative">
      <div className="flex justify-center items-center gap-4">
        <img
          src={logoV3Transparent}
          alt="plottwistlogoimage"
          className="w-16 h-16"
        />
        <img src={logoV7} alt="plottwistlogotext" className="w-24 h-24" />
      </div>
      <div className="flex justify-between items-center w-3/4 text-black">
        <Link
          to="/home"
          className={`hover:font-semibold ${
            currentPath === "/" ? "border-b-2 border-black" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/stories"
          className={`hover:font-semibold ${
            currentPath === "/stories" ? "border-b-2 border-black" : ""
          }`}
        >
          Stories
        </Link>
        <Link
          to="/"
          className={`hover:font-semibold ${
            currentPath === "/my-stories" ? "border-b-2 border-black" : ""
          }`}
        >
          My Stories
        </Link>
        <Link
          to="/"
          className={`hover:font-semibold ${
            currentPath === "/leaderboard" ? "border-b-2 border-black" : ""
          }`}
        >
          Leaderboard
        </Link>
        <Link
          to="/"
          className={`hover:font-semibold ${
            currentPath === "/" ? "border-b-2 border-black" : ""
          }`}
        >
          Login
        </Link>
      </div>
    </div>
  );
}
