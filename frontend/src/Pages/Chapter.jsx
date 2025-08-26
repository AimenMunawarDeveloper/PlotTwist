import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import TopBar from "../Components/TopBar";
import Footer from "../Components/Footer";
import StoryTree from "../Components/StoryTree";
import { getStoryById, getChapterContent } from "../data/mockData";
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
  const [showBranchForm, setShowBranchForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const story = getStoryById(storyId);
  const chapter = story?.chapters.find((ch) => ch.id === parseInt(chapterId));
  const chapterContent = getChapterContent(storyId, chapterId) || {
    text: `This is the content of ${
      chapter?.title || "Chapter"
    }. The story continues here with an engaging narrative that draws readers in. 

    As the protagonist faces their challenges, they must make difficult decisions that will shape the course of their journey. The choices they make here will have lasting consequences throughout the rest of the story.

    The world around them is rich with detail, from the subtle sounds of the environment to the complex emotions of the characters they encounter. Every moment is filled with potential for new developments and unexpected twists.

    What will happen next? The fate of the story lies in the hands of the readers, who will vote on the direction the narrative should take.`,
    branches: [
      {
        id: 1,
        text: "The protagonist chooses to confront the challenge head-on, showing courage and determination.",
        votes: 42,
        author: "StoryWeaver",
      },
      {
        id: 2,
        text: "The protagonist decides to take a more cautious approach, gathering more information before acting.",
        votes: 28,
        author: "CautiousReader",
      },
      {
        id: 3,
        text: "The protagonist seeks help from allies, recognizing the value of teamwork and friendship.",
        votes: 35,
        author: "TeamPlayer",
      },
    ],
  };
  if (!story || !chapter) {
    return (
      <div className="min-h-screen text-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Chapter Not Found</h1>
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
              ← Back to {story.title}
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">
            {chapter.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <FaEye className="text-gray-500" />
              {chapter.views}
            </span>
            <span className="flex items-center gap-1">
              <FaComment className="text-gray-500" />
              {chapter.comments}
            </span>
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-gray-500" />
              {chapter.date}
            </span>
          </div>
        </div>
        <div className="bg-gray-900 p-4 sm:p-6 lg:p-8 rounded-lg border border-gray-700 mb-6 lg:mb-8">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg whitespace-pre-line">
              {chapterContent.text}
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
        <StoryTree
          branches={chapterContent.branches}
          selectedBranch={selectedBranch}
          onBranchSelect={setSelectedBranch}
        />
        {selectedBranch && (
          <div className="mb-6 lg:mb-8 flex justify-center">
            <button className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white px-4 sm:px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
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
                className="w-full h-32 p-4 bg-gray-800 border border-gray-600 rounded-lg text-black placeholder-gray-400 resize-none"
                placeholder="Write your branch continuation here..."
              />
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
                <button className="bg-white hover:bg-gray-200 text-black px-4 sm:px-6 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base">
                  Submit Branch
                </button>
                <button
                  onClick={() => setShowBranchForm(false)}
                  className="bg-gray-700 hover:bg-gray-600 px-4 sm:px-6 py-3 rounded-lg font-medium text-black transition-colors text-sm sm:text-base"
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
                      className="text-xl sm:text-2xl text-gray-400 hover:text-white"
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                className="w-full h-24 sm:h-32 p-3 sm:p-4 bg-gray-800 border border-gray-600 rounded-lg text-black placeholder-gray-400 resize-none text-sm sm:text-base"
                placeholder="Write your review here..."
              />
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
                <button className="bg-white hover:bg-gray-200 text-black px-4 sm:px-6 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base">
                  Submit Review
                </button>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="bg-gray-700 hover:bg-gray-600 px-4 sm:px-6 py-3 rounded-lg font-medium text-black transition-colors text-sm sm:text-base"
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
