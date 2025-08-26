import { FaCircle, FaArrowRight } from "react-icons/fa";

export default function StoryTree({
  branches,
  selectedBranch,
  onBranchSelect,
}) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6">Story Branches</h2>
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-600"></div>
        <div className="space-y-6">
          {branches.map((branch) => (
            <div key={branch.id} className="relative">
              <div className="absolute left-8 top-6 w-4 h-0.5 bg-gray-600"></div>
              <div className="absolute left-6 top-5">
                <FaCircle
                  className={`w-4 h-4 ${
                    selectedBranch === branch.id
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                />
              </div>
              <div
                className={`ml-16 p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                  selectedBranch === branch.id
                    ? "border-white bg-gray-800 shadow-lg"
                    : "border-gray-700 hover:border-gray-600 hover:bg-gray-800"
                }`}
                onClick={() => onBranchSelect(branch.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-300 mb-3 leading-relaxed">
                      {branch.text}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaArrowRight className="text-gray-400" />
                        By: {branch.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCircle className="text-gray-400 w-2 h-2" />
                        {branch.votes} votes
                      </span>
                      {branch.nextChapter && (
                        <span className="text-blue-400">
                          → Chapter {branch.nextChapter}
                        </span>
                      )}
                    </div>
                  </div>
                  {selectedBranch === branch.id && (
                    <div className="ml-4 text-white">
                      <FaCircle className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute left-6 bottom-0">
          <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
