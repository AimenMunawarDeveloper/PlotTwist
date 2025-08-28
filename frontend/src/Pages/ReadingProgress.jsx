import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TopBar from "../Components/TopBar";
import Footer from "../Components/Footer";
import { userAPI } from "../services/api";
import { useAuth } from "../Context/AuthContext";
import { FaBookOpen, FaEye, FaStar, FaCalendarAlt } from "react-icons/fa";

export default function ReadingProgress() {
  const { user } = useAuth();
  const [readingProgress, setReadingProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReadingProgress = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await userAPI.getReadingProgress();
        setReadingProgress(response.data.data.readingProgress);
      } catch (error) {
        console.error("Error fetching reading progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReadingProgress();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen text-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <p className="text-gray-400 mb-4">
            You need to be logged in to view your reading progress.
          </p>
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen text-black">
        <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 my-4 sm:my-8 lg:my-12">
          <TopBar />
          <div className="mt-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-black">
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 my-4 sm:my-8 lg:my-12">
        <TopBar />
        <div className="mt-8">
          <h1 className="text-3xl font-bold mb-8">My Reading Progress</h1>

          {readingProgress.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h2 className="text-2xl font-semibold mb-4">
                No Reading Progress Yet
              </h2>
              <p className="text-gray-600 mb-6">
                Start reading stories to see your progress here!
              </p>
              <Link
                to="/stories"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Browse Stories
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {readingProgress
                .sort(
                  (a, b) =>
                    new Date(b.progress.lastReadAt) -
                    new Date(a.progress.lastReadAt)
                )
                .map((item) => (
                  <div
                    key={item.story._id}
                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <img
                          src={item.story.coverImage}
                          alt={item.story.title}
                          className="w-20 h-28 object-cover rounded-lg shadow-sm"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                              {item.story.title}
                            </h3>
                            <p className="text-gray-600">
                              by{" "}
                              {typeof item.story.author === "string"
                                ? item.story.author
                                : item.story.author?.displayName ||
                                  item.story.author?.username ||
                                  "Unknown"}
                            </p>
                          </div>
                          <Link
                            to={`/story/${item.story._id}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Continue Reading
                          </Link>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <FaBookOpen />
                            Chapter {item.progress.currentChapter}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaEye />
                            {item.story.stats?.totalViews || 0} views
                          </span>
                          <span className="flex items-center gap-1">
                            <FaStar />
                            {item.story.stats?.rating || 0} rating
                          </span>
                          <span className="flex items-center gap-1">
                            <FaCalendarAlt />
                            {new Date(
                              item.progress.lastReadAt
                            ).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="text-sm text-gray-600">
                          <p className="mb-2">{item.story.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {item.story.category}
                            </span>
                            {item.story.genre?.map((genre, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                              >
                                {genre}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
