import logoV3Transparent from "../assets/logoV4.png";
import logoV7 from "../assets/logoV7.png";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { FaUser, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

export default function TopBar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, logout, isAuthenticated } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setShowDropdown(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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

        {isAuthenticated ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 hover:font-semibold px-2 py-1 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <FaUser className="text-gray-600" />
                )}
              </div>
              <span className="hidden sm:inline">
                {user?.displayName || user?.username}
              </span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <Link
                    to="/profile"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <FaUserCircle className="text-gray-500" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-left"
                  >
                    <FaSignOutAlt className="text-gray-500" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/"
            className={`hover:font-semibold px-2 py-1 ${
              currentPath === "/" ? "border-b-2 border-black" : ""
            }`}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
