import { useState, useMemo } from "react";
import MyStoriesCard from "../Components/MyStoriesCard";
import { FaSearch } from "react-icons/fa";
import TopBar from "../Components/TopBar";
import Footer from "../Components/Footer";
import {
  getStartedStories,
  getContributedStories,
  getReadStories,
} from "../data/mockData";
export default function MyStories() {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredStories = useMemo(() => {
    const startedStories = getStartedStories();
    const contributedStories = getContributedStories();
    const readStories = getReadStories();
    const allUserStories = [
      ...startedStories,
      ...contributedStories,
      ...readStories,
    ];
    if (!searchQuery.trim()) return allUserStories;
    const query = searchQuery.toLowerCase();
    return allUserStories.filter(
      (story) =>
        story.title.toLowerCase().includes(query) ||
        (typeof story.author === "string"
          ? story.author
          : story.author?.displayName || story.author?.username || ""
        )
          .toLowerCase()
          .includes(query) ||
        story.category.toLowerCase().includes(query) ||
        story.genre.some((genre) => genre.toLowerCase().includes(query)) ||
        story.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);
  return (
    <div className="flex flex-col gap-8 sm:gap-16 lg:gap-36">
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 my-4 sm:my-8 lg:my-12">
        <div className="w-full flex flex-col">
          <TopBar />
          <div className="flex flex-col w-full h-full justify-center items-center gap-8 sm:gap-10 lg:gap-14">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
              My Stories
            </h1>
            <div className="flex justify-center w-full">
              <form className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-[#8c8c8c] h-12 sm:h-14 lg:h-16 rounded-md shadow-md shadow-black">
                <div className="w-full flex gap-2 items-center h-full border-1 border-white px-3 sm:px-4 bg-[#8c8c8c] rounded-md">
                  <FaSearch className="text-white text-sm sm:text-base" />
                  <input
                    type="text"
                    name="search"
                    value={searchQuery}
                    className="bg-transparent h-full w-full text-white border-none outline-none placeholder-white text-sm sm:text-base"
                    placeholder="Search your stories..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>
            {searchQuery.trim() && (
              <div className="w-full sm:w-5/6 md:w-4/5 lg:w-2/3">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
                  Search Results ({filteredStories.length} stories found)
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredStories.map((story) => (
                    <div
                      key={story.id}
                      className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105"
                    >
                      <div className="relative">
                        <img
                          src={story.coverImage}
                          alt={story.title}
                          className="w-full h-32 sm:h-40 lg:h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded text-xs text-white">
                          {story.status}
                        </div>
                      </div>
                      <div className="p-3 sm:p-4">
                        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-2 line-clamp-2">
                          {story.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">
                          {typeof story.author === "string"
                            ? story.author
                            : story.author?.displayName ||
                              story.author?.username ||
                              "Unknown"}{" "}
                          / {story.artist}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 sm:line-clamp-3 mb-2 sm:mb-3">
                          {story.startingText}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>⭐ {story.rating}</span>
                          <span>👁️ {story.totalViews}</span>
                          <span>❤️ {story.followers}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {filteredStories.length === 0 && (
                  <div className="text-center py-8 sm:py-12">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                      No stories found
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400">
                      Try adjusting your search terms or browse your story
                      categories below.
                    </p>
                  </div>
                )}
              </div>
            )}
            {!searchQuery.trim() && (
              <>
                <MyStoriesCard heading="Started" />
                <MyStoriesCard heading="Contributed" />
                <MyStoriesCard heading="Read" />
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
