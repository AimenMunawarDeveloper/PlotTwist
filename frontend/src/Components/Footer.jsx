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
      <div className="w-full py-20 px-40 grid grid-cols-3 items-start">
        <div className="flex justify-center items-center gap-4">
          <img
            src={logoV3Transparent}
            alt="plottwistlogoimage"
            className="w-24 h-24"
          />
          <img src={logoV7} alt="plottwistlogotext" className="w-36 h-36" />
        </div>
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-xl font-semibold">Quick Links</h2>
          <Link
            to="/"
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
              currentPath === "leaderboard" ? "border-b-2 border-black" : ""
            }`}
          >
            Leaderboard
          </Link>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-xl font-semibold">Stay Connected</h2>
          <div className="flex gap-4">
            <div className="bg-black p-3 rounded-full cursor-pointer">
              <FaFacebook className="text-white w-5 h-5" />
            </div>
            <div className="bg-black p-3 rounded-full cursor-pointer">
              <FaInstagram className="text-white w-5 h-5" />
            </div>
            <div className="bg-black p-3 rounded-full cursor-pointer">
              <FaTwitter className="text-white w-5 h-5" />
            </div>
            <div className="bg-black p-3 rounded-full cursor-pointer">
              <FaDiscord className="text-white w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
      <span className="flex justify-center items-center gap-2 mb-8 ">
        <FaRegCopyright /> 2025 PlotTwist
      </span>
    </div>
  );
}
