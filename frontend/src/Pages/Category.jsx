import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TopBar from "../Components/TopBar";
import Footer from "../Components/Footer";
import { categories } from "../data/mockData";
import { categoryAPI } from "../services/api";
import { FaEye, FaHeart, FaComment, FaStar } from "react-icons/fa";

export default function Category() {
  const { categoryName } = useParams();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const category = categories.find((cat) => cat.name === categoryName);

  useEffect(() => {
    const fetchStoriesByCategory = async () => {
      if (!category) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await categoryAPI.getStoriesByCategory(
          categoryName,
          page,
          12
        );
        const newStories = response.data.data.stories || [];

        if (page === 1) {
          setStories(newStories);
        } else {
          setStories((prev) => [...prev, ...newStories]);
        }

        setHasMore(newStories.length === 12);
      } catch (err) {
        console.error("Error fetching category stories:", err);
        setError("Failed to load stories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStoriesByCategory();
  }, [category, categoryName, page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  if (!category) {
    return (
      <div className="min-h-screen text-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <Link to="/home" className="text-gray-300 hover:text-black underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = category.icon;

  return (
    <div className="min-h-screen text-black">
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 my-4 sm:my-8 lg:my-12">
        <TopBar />
        <div className="mt-8 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div
              className={`p-4 rounded-lg bg-gray-900 border border-gray-700 ${category.color}`}
            >
              <IconComponent className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-black">{category.name}</h1>
              <p className="text-gray-500 text-lg">
                {loading
                  ? "Loading..."
                  : `${stories.length} ${
                      stories.length === 1 ? "story" : "stories"
                    }`}{" "}
                available
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="text-center py-8">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200"
            >
              Try Again
            </button>
          </div>
        )}

        {loading && page === 1 ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {stories.map((story) => (
                <Link
                  key={story._id}
                  to={`/story/${story._id}`}
                  className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105"
                >
                  <div className="relative">
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded text-xs text-white">
                      {story.status}
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 px-2 py-1 rounded text-xs text-white flex items-center gap-1">
                      <FaStar className="text-white" />
                      {story.stats?.rating || 0}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3">
                      {typeof story.author === "string"
                        ? story.author
                        : story.author?.displayName ||
                          story.author?.username ||
                          "Unknown"}{" "}
                      / {story.artist}
                    </p>
                    <p className="text-sm text-gray-300 line-clamp-3 mb-3">
                      {story.startingText}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaEye className="text-gray-400" />
                        {story.stats?.totalViews || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaHeart className="text-gray-400" />
                        {story.followers?.length || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaComment className="text-gray-400" />
                        {story.stats?.totalRatings || 0}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {hasMore && (
              <div className="text-center py-8">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Loading..." : "Load More Stories"}
                </button>
              </div>
            )}

            {stories.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className={`text-6xl mb-4 ${category.color}`}>
                  <IconComponent />
                </div>
                <h2 className="text-2xl font-bold text-black mb-2">
                  No Stories Yet
                </h2>
                <p className="text-gray-300 mb-6">
                  There are no stories in the {category.name} category yet.
                </p>
                <Link
                  to="/home"
                  className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-medium text-white transition-colors"
                >
                  Browse Other Categories
                </Link>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
