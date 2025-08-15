import logoV3Transparent from "../assets/logoV4.png";
import logoV7 from "../assets/logoV7.png";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function TopBar() {
  const [selected, setSelected] = useState("Home");
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
          to="/"
          className={`hover:font-semibold ${
            selected === "Home" ? "border-b-2 border-black" : ""
          }`}
          onClick={() => setSelected("Home")}
        >
          Home
        </Link>
        <Link
          to="/"
          className={`hover:font-semibold ${
            selected === "Stories" ? "border-b-2 border-black" : ""
          }`}
          onClick={() => setSelected("Stories")}
        >
          Stories
        </Link>
        <Link
          to="/"
          className={`hover:font-semibold ${
            selected === "My Stories" ? "border-b-2 border-black" : ""
          }`}
          onClick={() => setSelected("My Stories")}
        >
          My Stories
        </Link>
        <Link
          to="/"
          className={`hover:font-semibold ${
            selected === "Leaderboard" ? "border-b-2 border-black" : ""
          }`}
          onClick={() => setSelected("Leaderboard")}
        >
          Leaderboard
        </Link>
        <Link
          to="/"
          className={`hover:font-semibold ${
            selected === "Login" ? "border-b-2 border-black" : ""
          }`}
          onClick={() => setSelected("Login")}
        >
          Login
        </Link>
      </div>
    </div>
  );
}
