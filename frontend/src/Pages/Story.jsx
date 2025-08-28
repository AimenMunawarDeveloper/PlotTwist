import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TopBar from "../Components/TopBar";
import Footer from "../Components/Footer";
import { storyAPI, chapterAPI } from "../services/api";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";
import {
  FaHeart,
  FaBookmark,
  FaComment,
  FaEye,
  FaStar,
  FaTrash,
  FaEllipsisH,
} from "react-icons/fa";

export default function Story() {
  const { id } = useParams();
  const { user } = useAuth();
  const [story, setStory] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        setLoading(true);
        const [storyResponse, chaptersResponse] = await Promise.all([
          storyAPI.getStoryById(id),
          chapterAPI.getChaptersByStory(id, 1, 50),
        ]);

        setStory(storyResponse.data.data.story);
        setChapters(chaptersResponse.data.data.chapters || []);
        setReviews(storyResponse.data.data.story.reviews || []);

        // Check if user is following/bookmarked
        if (user) {
          setIsFollowing(
            storyResponse.data.data.story.followers?.includes(user._id) || false
          );
          setIsBookmarked(
            storyResponse.data.data.story.bookmarks?.includes(user._id) || false
          );
        }
      } catch (err) {
        console.error("Error fetching story:", err);
        setError("Failed to load story. Please try again later.");
        toast.error("Failed to load story");
      } finally {
        setLoading(false);
      }
    };

    fetchStoryData();
  }, [id, user]);

  const handleToggleFollow = async () => {
    if (!user) {
      toast.error("Please login to follow stories");
      return;
    }

    try {
      await storyAPI.toggleFollowStory(id);
      setIsFollowing(!isFollowing);
      toast.success(isFollowing ? "Unfollowed story" : "Followed story");

      // Update story data
      const response = await storyAPI.getStoryById(id);
      setStory(response.data.data.story);
    } catch (error) {
      console.error("Error toggling follow:", error);
      toast.error("Failed to update follow status");
    }
  };

  const handleToggleBookmark = async () => {
    if (!user) {
      toast.error("Please login to bookmark stories");
      return;
    }

    try {
      await storyAPI.toggleBookmarkStory(id);
      setIsBookmarked(!isBookmarked);
      toast.success(
        isBookmarked ? "Removed from bookmarks" : "Added to bookmarks"
      );
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      toast.error("Failed to update bookmark status");
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < rating ? "text-white" : "text-gray-600"}>
        <FaStar />
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen text-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Story Not Found</h1>
          <p className="text-gray-400 mb-4">
            {error || "The story you're looking for doesn't exist."}
          </p>
          <Link to="/home" className="text-gray-300 hover:text-white underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-black">
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 my-4 sm:my-8 lg:my-12">
        <TopBar />
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-6 lg:mt-8">
          <div className="w-full lg:w-1/3">
            <div className="relative">
              <img
                src={story.coverImage}
                alt={story.title}
                className="w-full h-64 sm:h-80 lg:h-[500px] object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute top-4 right-4 bg-black bg-opacity-70 px-3 py-1 rounded-full text-sm text-white">
                {story.status}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/3">
            <div className="space-y-4 lg:space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-black">
                  {story.title}
                </h1>
                <p className="text-gray-500 text-sm sm:text-base lg:text-lg mb-4">
                  {story.alternativeTitles
                    ? story.alternativeTitles.join(" / ")
                    : ""}
                </p>
                <p className="text-gray-500 text-sm sm:text-base">
                  {typeof story.author === "string"
                    ? story.author
                    : story.author?.displayName ||
                      story.author?.username ||
                      "Unknown"}{" "}
                  / {story.artist}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 lg:gap-6 text-sm">
                <button
                  onClick={handleToggleFollow}
                  className={`flex items-center gap-2 transition-colors ${
                    isFollowing
                      ? "text-red-500"
                      : "text-gray-500 hover:text-red-400"
                  }`}
                >
                  <FaHeart className={isFollowing ? "text-red-500" : ""} />
                  <span>{story.followers?.length || 0}</span>
                </button>
                <button
                  onClick={handleToggleBookmark}
                  className={`flex items-center gap-2 transition-colors ${
                    isBookmarked
                      ? "text-blue-500"
                      : "text-gray-500 hover:text-blue-400"
                  }`}
                >
                  <FaBookmark className={isBookmarked ? "text-blue-500" : ""} />
                  <span>{story.bookmarks?.length || 0}</span>
                </button>
                <div className="flex items-center gap-2">
                  <FaComment className="text-gray-500" />
                  <span className="text-gray-500">{reviews.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEye className="text-gray-500" />
                  <span className="text-gray-500">
                    {story.stats?.totalViews || 0}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  {story.genre?.join(", ")}
                </p>
              </div>
              <div className="text-sm text-gray-500">
                <p>
                  Original Publication: {story.status?.toUpperCase()} /{" "}
                  {story.publicationYear}-?
                </p>
                <p>Read Direction: Top to Bottom ↓</p>
              </div>
              <div className="bg-gray-900 p-4 sm:p-6 rounded-lg border border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    {story.stats?.rating || 0}
                  </div>
                  <div className="flex text-lg sm:text-2xl">
                    {renderStars(Math.floor(story.stats?.rating || 0))}
                  </div>
                  <div className="text-sm text-gray-300">
                    {story.stats?.totalRatings || 0} votes
                  </div>
                </div>
                {story.ratingDistribution && (
                  <div className="space-y-2">
                    {Object.entries(story.ratingDistribution)
                      .reverse()
                      .map(([stars, percentage]) => (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="w-8 text-gray-300 flex items-center gap-1">
                            {stars}
                            <FaStar />
                          </span>
                          <div className="flex-1 bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-white h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="w-12 text-sm text-gray-300">
                            {percentage}%
                          </span>
                        </div>
                      ))}
                  </div>
                )}
                <div className="flex gap-4 mt-4 pt-4 border-t border-gray-700">
                  {["😍", "😂", "😱", "😡", "😢"].map((emoji, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <span className="text-2xl">{emoji}</span>
                      <span className="text-xs text-gray-400">0</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-8 lg:space-y-12 mt-8 lg:mt-12">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">
              Overview
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4 text-black">
                  Description
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {story.description}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-black">
                  Extra Info
                </h3>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-300">
                    Our discord server:{" "}
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white underline"
                    >
                      https://discord.gg/PlotTwist
                    </a>
                  </p>
                  <p className="text-sm text-gray-300 mt-2">
                    Instagram: plot_twist_stories
                  </p>
                  <p className="text-sm text-gray-300 mt-2">Resource links:</p>
                  <p className="text-sm text-gray-300">
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white underline"
                    >
                      https://plottwist.com/story/{story._id}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-black">
                Chapters ({chapters.length})
              </h2>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-800 rounded text-gray-300 hover:text-white">
                  ↑
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {chapters.map((chapter) => (
                <Link
                  key={chapter._id}
                  to={`/story/${story._id}/chapter/${chapter._id}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-900 rounded-lg hover:bg-gray-800 border border-gray-700 transition-colors gap-3 sm:gap-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 min-w-0 flex-1">
                    <span className="text-gray-300 font-medium truncate">
                      {chapter.title}
                    </span>
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-400">
                      <span className="whitespace-nowrap">
                        👥{" "}
                        {typeof story.author === "string"
                          ? story.author
                          : story.author?.displayName ||
                            story.author?.username ||
                            "Unknown"}
                      </span>
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <FaComment className="text-gray-400" />
                        {chapter.stats?.comments || 0}
                      </span>
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <FaEye className="text-gray-400" />
                        {chapter.stats?.views || 0}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                    <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">
                      {new Date(chapter.createdAt).toLocaleDateString()}
                    </span>
                    {user &&
                      (user._id ===
                        (typeof story.author === "string"
                          ? story.author
                          : story.author?._id) ||
                        user.role === "admin") && (
                        <button className="p-2 hover:bg-gray-700 rounded text-gray-400 hover:text-white">
                          <FaTrash />
                        </button>
                      )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-black">
                Reviews ({reviews.length})
              </h2>
              <button className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg font-medium text-white transition-colors">
                Write My Review
              </button>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-6">
              <button className="px-3 sm:px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition-colors text-sm">
                Upvotes
              </button>
              <button className="px-3 sm:px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition-colors text-sm">
                Newest
              </button>
              <button className="px-3 sm:px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition-colors text-sm">
                Oldest
              </button>
            </div>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gray-900 p-4 sm:p-6 rounded-lg border border-gray-700"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="text-2xl sm:text-3xl flex-shrink-0">
                      {typeof review.user?.avatar === "string" &&
                      review.user.avatar ? (
                        <img
                          src={review.user.avatar}
                          alt={
                            review.user?.displayName ||
                            review.user?.username ||
                            "User"
                          }
                          className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover"
                        />
                      ) : (
                        "👤"
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-gray-300 font-medium truncate">
                          {review.user?.displayName ||
                            review.user?.username ||
                            "Anonymous"}
                        </span>
                        <div className="flex text-white flex-shrink-0">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-gray-400 text-xs sm:text-sm flex-shrink-0">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-4 text-sm sm:text-base break-words">
                        {review.text}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                        <div className="flex items-center gap-2 sm:gap-4">
                          <span className="text-xs sm:text-sm text-gray-300">
                            {review.upvotes || 0}
                          </span>
                          <button className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white">
                            ↑
                          </button>
                          <button className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white">
                            ↓
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white">
                            <FaEllipsisH />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
