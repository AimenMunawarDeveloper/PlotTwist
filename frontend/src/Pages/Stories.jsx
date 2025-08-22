import TopBar from "../Components/TopBar";
import Footer from "../Components/Footer";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Categories from "../Components/Categories";
import TopPicksForYou from "../Components/TopPicksForYou";
import ContinueReading from "../Components/ContinueReading";
import TrendingAndPopular from "../Components/TrendingAndPopular";

export default function Stories() {
  const [searchQuery, setSearchQuery] = useState();
  return (
    <div className="flex flex-col gap-36">
      <div className="mx-24 my-12">
        <div className="w-full flex flex-col gap-14">
          <TopBar />
          <div className="flex flex-col w-full h-full justify-center items-center gap-20">
            <form className="w-2/3 bg-[#8c8c8c] h-16 rounded-md shadow-md shadow-black">
              <div className="w-full flex gap-2 items-center h-full border-1 border-white px-4 bg-[#8c8c8c] rounded-md">
                <FaSearch className="text-white" />
                <input
                  type="text"
                  name="search"
                  value={searchQuery}
                  className="bg-transparent h-full w-full text-white border-none outline-none placeholder-white"
                  placeholder="Search..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            <Categories />
            <TopPicksForYou />
            <ContinueReading />
            <TrendingAndPopular />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
