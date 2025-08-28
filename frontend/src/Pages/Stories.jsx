import TopBar from "../Components/TopBar";
import Footer from "../Components/Footer";
import { useState, useMemo, useEffect } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Categories from "../Components/Categories";
import TopPicksForYou from "../Components/TopPicksForYou";
import ContinueReading from "../Components/ContinueReading";
import TrendingAndPopular from "../Components/TrendingAndPopular";
import StartStoryModal from "../Components/StartStoryModal";
import { storyAPI } from "../services/api";

export default function Stories() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showStartStoryModal, setShowStartStoryModal] = useState(false);
  const [stories, setStories] = useState([]);
  const [trendingStories, setTrendingStories] = useState([]);
  const [popularStories, setPopularStories] = useState([]);
  const [featuredStories, setFeaturedStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          storiesResponse,
          trendingResponse,
          popularResponse,
          featuredResponse,
        ] = await Promise.all([
          storyAPI.getAllStories(1, 50), // Get more stories for search
          storyAPI.getTrendingStories(),
          storyAPI.getPopularStories(),
          storyAPI.getFeaturedStories(),
        ]);

        setStories(storiesResponse.data.data.stories || []);
        setTrendingStories(trendingResponse.data.data.stories || []);
        setPopularStories(popularResponse.data.data.stories || []);
        setFeaturedStories(featuredResponse.data.data.stories || []);
      } catch (err) {
        console.error("Error fetching stories data:", err);
        setError("Failed to load stories. Please try again later.");
        toast.error("Failed to load stories");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredStories = useMemo(() => {
    if (!searchQuery.trim()) return stories;
    const query = searchQuery.toLowerCase();
    return stories.filter(
      (story) =>
        story.title.toLowerCase().includes(query) ||
        story.author.toLowerCase().includes(query) ||
        story.category.toLowerCase().includes(query) ||
        story.genre.some((genre) => genre.toLowerCase().includes(query)) ||
        story.description.toLowerCase().includes(query)
    );
  }, [searchQuery, stories]);

  const handleStartStory = async (storyData) => {
    try {
      const response = await storyAPI.createStory(storyData);
      toast.success(
        `Story "${response.data.data.story.title}" has been created successfully!`
      );
      setShowStartStoryModal(false);

      // Refresh stories list
      const storiesResponse = await storyAPI.getAllStories(1, 50);
      setStories(storiesResponse.data.data.stories || []);
    } catch (error) {
      console.error("Error creating story:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to create story";
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Error</h1>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 sm:gap-16 lg:gap-36">
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 my-4 sm:my-8 lg:my-12">
        <div className="w-full flex flex-col gap-8 sm:gap-10 lg:gap-14">
          <TopBar />
          <div className="flex flex-col w-full h-full justify-center items-center gap-8 sm:gap-12 lg:gap-20">
            <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-4 sm:gap-6">
              <form className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-[#8c8c8c] h-12 sm:h-14 lg:h-16 rounded-md shadow-md shadow-black">
                <div className="w-full flex gap-2 items-center h-full border-1 border-white px-3 sm:px-4 bg-[#8c8c8c] rounded-md">
                  <FaSearch className="text-white text-sm sm:text-base" />
                  <input
                    type="text"
                    name="search"
                    value={searchQuery}
                    className="bg-transparent h-full w-full text-white border-none outline-none placeholder-white text-sm sm:text-base"
                    placeholder="Search stories..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
              <button
                onClick={() => setShowStartStoryModal(true)}
                className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white px-4 sm:px-6 py-3 h-12 sm:h-14 lg:h-16 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <FaPlus className="text-white" />
                <span className="hidden sm:inline">Start New Story</span>
                <span className="sm:hidden">Start Story</span>
              </button>
            </div>
            {searchQuery.trim() && (
              <div className="w-full sm:w-5/6 md:w-4/5 lg:w-2/3">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
                  Search Results ({filteredStories.length} stories found)
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredStories.map((story) => (
                    <div
                      key={story._id}
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
                          <span>⭐ {story.stats?.rating || 0}</span>
                          <span>👁️ {story.stats?.totalViews || 0}</span>
                          <span>❤️ {story.followers || 0}</span>
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
                      Try adjusting your search terms or browse all categories
                      below.
                    </p>
                  </div>
                )}
              </div>
            )}
            <Categories />
            <TopPicksForYou stories={featuredStories} />
            <ContinueReading />
            <TrendingAndPopular
              trendingStories={trendingStories}
              popularStories={popularStories}
            />
          </div>
        </div>
      </div>
      <Footer />
      <StartStoryModal
        isOpen={showStartStoryModal}
        onClose={() => setShowStartStoryModal(false)}
        onStartStory={handleStartStory}
      />
    </div>
  );
}
