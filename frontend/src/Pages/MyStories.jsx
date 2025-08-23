import { useState } from "react";
import MyStoriesCard from "../Components/MyStoriesCard";
import { FaSearch } from "react-icons/fa";
import TopBar from "../Components/TopBar";
import Footer from "../Components/Footer";
export default function MyStories() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="flex flex-col gap-36">
      <div className="mx-24 my-12">
        <div className="w-full flex flex-col">
          <TopBar />
          <div className="flex flex-col w-full h-full justify-center items-center gap-14">
            <h1 className="text-4xl font-bold text-center">My Stories</h1>
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
            <MyStoriesCard heading="Started" />
            <MyStoriesCard heading="Contributed" />
            <MyStoriesCard heading="Read" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
