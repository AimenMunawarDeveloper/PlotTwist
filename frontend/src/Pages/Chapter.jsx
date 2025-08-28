import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TopBar from "../Components/TopBar";
import Footer from "../Components/Footer";
import StoryTree from "../Components/StoryTree";
import { storyAPI, chapterAPI } from "../services/api";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";
import {
  FaEye,
  FaComment,
  FaCalendarAlt,
  FaMagic,
  FaBookOpen,
  FaVoteYea,
  FaCheck,
  FaStar,
} from "react-icons/fa";

export default function Chapter() {
  const { storyId, chapterId } = useParams();
  const { user } = useAuth();
  const [showBranchForm, setShowBranchForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [story, setStory] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [chapterContent, setChapterContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [branchText, setBranchText] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        setLoading(true);
        const [storyResponse, chapterResponse] = await Promise.all([
          storyAPI.getStoryById(storyId),
          chapterAPI.getChapterById(chapterId),
        ]);

        setStory(storyResponse.data.data.story);
        setChapter(chapterResponse.data.data.chapter);
        setChapterContent(chapterResponse.data.data.chapter);
      } catch (err) {
        console.error("Error fetching chapter:", err);
        setError("Failed to load chapter. Please try again later.");
        toast.error("Failed to load chapter");
      } finally {
        setLoading(false);
      }
    };

    fetchChapterData();
  }, [storyId, chapterId]);

  const handleCreateBranch = async () => {
    if (!user) {
      toast.error("Please login to create branches");
      return;
    }

    if (!branchText.trim()) {
      toast.error("Please enter branch text");
      return;
    }

    try {
      await chapterAPI.addBranch(chapterId, {
        text: branchText,
        author: user._id,
      });

      toast.success("Branch created successfully!");
      setShowBranchForm(false);
      setBranchText("");

      // Refresh chapter content
      const chapterResponse = await chapterAPI.getChapterById(chapterId);
      setChapterContent(chapterResponse.data.data.chapter);
    } catch (error) {
      console.error("Error creating branch:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to create branch";
      toast.error(errorMessage);
    }
  };

  const handleVoteBranch = async () => {
    if (!user) {
      toast.error("Please login to vote");
      return;
    }

    if (!selectedBranch) {
      toast.error("Please select a branch to vote for");
      return;
    }

    try {
      await chapterAPI.voteBranch(chapterId, selectedBranch._id);
      toast.success("Vote submitted successfully!");
      setSelectedBranch(null);

      // Refresh chapter content
      const chapterResponse = await chapterAPI.getChapterById(chapterId);
      setChapterContent(chapterResponse.data.data.chapter);
    } catch (error) {
      console.error("Error voting for branch:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to submit vote";
      toast.error(errorMessage);
    }
  };

  const handleSubmitReview = async () => {
    if (!user) {
      toast.error("Please login to write reviews");
      return;
    }

    if (!reviewText.trim()) {
      toast.error("Please enter review text");
      return;
    }

    if (reviewRating === 0) {
      toast.error("Please select a rating");
      return;
    }

    try {
      // This would need to be implemented in the backend
      // For now, we'll just show a success message
      toast.success("Review submitted successfully!");
      setShowReviewForm(false);
      setReviewText("");
      setReviewRating(0);
    } catch (error) {
      console.error("Error submitting review:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to submit review";
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

  if (error || !story || !chapter) {
    return (
      <div className="min-h-screen text-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Chapter Not Found</h1>
          <p className="text-gray-400 mb-4">
            {error || "The chapter you're looking for doesn't exist."}
          </p>
          <Link to="/home" className="text-gray-300 hover:text-black underline">
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
        <div className="mt-6 lg:mt-8 mb-6 lg:mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              to={`/story/${storyId}`}
              className="text-gray-500 hover:text-black underline text-sm sm:text-base"
            >
              ← Back to{" "}
              {typeof story.title === "string" ? story.title : "Story"}
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">
            {typeof chapter.title === "string" ? chapter.title : "Chapter"}
          </h1>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <FaEye className="text-gray-500" />
              {chapter.stats?.views || chapter.views || 0}
            </span>
            <span className="flex items-center gap-1">
              <FaComment className="text-gray-500" />
              {chapter.stats?.comments || chapter.comments || 0}
            </span>
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-gray-500" />
              {new Date(chapter.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="bg-gray-900 p-4 sm:p-6 lg:p-8 rounded-lg border border-gray-700 mb-6 lg:mb-8">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg whitespace-pre-line">
              {chapterContent?.content ||
                chapter.content ||
                "Chapter content not available."}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 lg:mb-8">
          <button
            onClick={() => setShowBranchForm(true)}
            className="bg-gray-700 hover:bg-gray-600 px-4 sm:px-6 py-3 rounded-lg font-medium text-white transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <FaMagic className="text-white" />
            <span className="hidden sm:inline">Create Branch</span>
            <span className="sm:hidden">Branch</span>
          </button>
          <button
            onClick={() => setShowReviewForm(true)}
            className="bg-gray-700 hover:bg-gray-600 px-4 sm:px-6 py-3 rounded-lg font-medium text-white transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <FaComment className="text-white" />
            <span className="hidden sm:inline">Write Review</span>
            <span className="sm:hidden">Review</span>
          </button>
        </div>
        {chapterContent?.branches && chapterContent.branches.length > 0 && (
          <StoryTree
            branches={chapterContent.branches}
            selectedBranch={selectedBranch}
            onBranchSelect={(branch) => setSelectedBranch(branch)}
          />
        )}
        {selectedBranch && (
          <div className="mb-6 lg:mb-8 flex justify-center">
            <button
              onClick={handleVoteBranch}
              className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white px-4 sm:px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <FaVoteYea className="text-white" />
              Submit Vote
            </button>
          </div>
        )}
        {showBranchForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 p-4 sm:p-6 lg:p-8 rounded-lg border border-gray-700 max-w-2xl w-full">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4">
                Create New Branch
              </h3>
              <textarea
                value={branchText}
                onChange={(e) => setBranchText(e.target.value)}
                className="w-full h-32 p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none"
                placeholder="Write your branch continuation here..."
              />
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
                <button
                  onClick={handleCreateBranch}
                  className="bg-white hover:bg-gray-200 text-black px-4 sm:px-6 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Submit Branch
                </button>
                <button
                  onClick={() => {
                    setShowBranchForm(false);
                    setBranchText("");
                  }}
                  className="bg-gray-700 hover:bg-gray-600 px-4 sm:px-6 py-3 rounded-lg font-medium text-white transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {showReviewForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 p-4 sm:p-6 lg:p-8 rounded-lg border border-gray-700 max-w-2xl w-full">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4">
                Write a Review
              </h3>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2 text-sm sm:text-base">
                  Rating:
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className={`text-xl sm:text-2xl ${
                        star <= reviewRating
                          ? "text-yellow-400"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full h-24 sm:h-32 p-3 sm:p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none text-sm sm:text-base"
                placeholder="Write your review here..."
              />
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
                <button
                  onClick={handleSubmitReview}
                  className="bg-white hover:bg-gray-200 text-black px-4 sm:px-6 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Submit Review
                </button>
                <button
                  onClick={() => {
                    setShowReviewForm(false);
                    setReviewText("");
                    setReviewRating(0);
                  }}
                  className="bg-gray-700 hover:bg-gray-600 px-4 sm:px-6 py-3 rounded-lg font-medium text-white transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
