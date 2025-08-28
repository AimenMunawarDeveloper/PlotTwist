import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userAPI } from "../services/api";
import { useAuth } from "../Context/AuthContext";
import { FaBookOpen, FaEye, FaStar } from "react-icons/fa";

export default function ContinueReading() {
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
    return null;
  }

  if (loading) {
    return (
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-800 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (readingProgress.length === 0) {
    return (
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Continue Reading</h2>
        <p className="text-gray-400">No stories in progress. Start reading to see them here!</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6">Continue Reading</h2>
      <div className="space-y-4">
        {readingProgress
          .sort((a, b) => new Date(b.progress.lastReadAt) - new Date(a.progress.lastReadAt))
          .slice(0, 5)
          .map((item) => (
            <Link
              key={item.story._id}
              to={`/story/${item.story._id}`}
              className="block bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={item.story.coverImage}
                    alt={item.story.title}
                    className="w-16 h-20 object-cover rounded"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white mb-1 truncate">
                    {item.story.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {typeof item.story.author === 'string' 
                      ? item.story.author 
                      : item.story.author?.displayName || item.story.author?.username || 'Unknown'}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <FaBookOpen />
                      Chapter {item.progress.currentChapter}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaEye />
                      {item.story.stats?.totalViews || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaStar />
                      {item.story.stats?.rating || 0}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Last read: {new Date(item.progress.lastReadAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
      {readingProgress.length > 5 && (
        <div className="mt-4 text-center">
          <Link
            to="/reading-progress"
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            View all ({readingProgress.length})
          </Link>
        </div>
      )}
    </div>
  );
}
