import { useState, useRef } from "react";
import {
  FaTimes,
  FaBookOpen,
  FaMagic,
  FaCloudUploadAlt,
  FaImage,
} from "react-icons/fa";

export default function StartStoryModal({ isOpen, onClose, onStartStory }) {
  const [storyData, setStoryData] = useState({
    title: "",
    category: "",
    startingText: "",
    genre: [],
    thumbnail: null,
  });
  const [isDragOver, setIsDragOver] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const fileInputRef = useRef(null);

  const categories = [
    "Romance",
    "Fantasy",
    "Drama",
    "Comedy",
    "Slice of Life",
    "Superhero",
    "Sci-fi",
    "Thriller",
    "Supernatural",
    "Mystery",
    "Sports",
    "Historical",
    "Heart-warming",
    "Horror",
    "Children",
  ];

  const genres = [
    "Adventure",
    "Mystery",
    "Romance",
    "Drama",
    "Comedy",
    "Fantasy",
    "Sci-fi",
    "Horror",
    "Slice of Life",
    "Historical",
    "Supernatural",
    "Thriller",
    "Sports",
    "Children",
    "Heart-warming",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (storyData.title && storyData.category && storyData.startingText) {
      onStartStory(storyData);
      setStoryData({
        title: "",
        category: "",
        startingText: "",
        genre: [],
        thumbnail: null,
      });
      setThumbnailPreview(null);
      onClose();
    }
  };

  const handleGenreToggle = (genre) => {
    setStoryData((prev) => ({
      ...prev,
      genre: prev.genre.includes(genre)
        ? prev.genre.filter((g) => g !== genre)
        : [...prev.genre, genre],
    }));
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      setStoryData((prev) => ({ ...prev, thumbnail: file }));
      const reader = new FileReader();
      reader.onload = (e) => setThumbnailPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const removeThumbnail = () => {
    setStoryData((prev) => ({ ...prev, thumbnail: null }));
    setThumbnailPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 p-4 sm:p-6 lg:p-8 rounded-lg border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white flex items-center gap-2">
            <FaBookOpen className="text-white w-5 h-5 sm:w-6 sm:h-6" />
            <span className="hidden sm:inline">Start a New Story</span>
            <span className="sm:hidden">New Story</span>
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-gray-300 mb-2 font-medium text-sm sm:text-base">
              Story Title *
            </label>
            <input
              type="text"
              value={storyData.title}
              onChange={(e) =>
                setStoryData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full p-2 sm:p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none text-sm sm:text-base"
              placeholder="Enter your story title..."
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2 font-medium text-sm sm:text-base">
              Story Thumbnail (Optional)
            </label>
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragOver
                  ? "border-white bg-gray-800"
                  : "border-gray-600 hover:border-gray-500"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {thumbnailPreview ? (
                <div className="relative">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="w-full h-32 sm:h-40 object-cover rounded-lg mx-auto"
                  />
                  <button
                    type="button"
                    onClick={removeThumbnail}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <FaCloudUploadAlt className="mx-auto text-4xl text-gray-400" />
                  <div>
                    <p className="text-gray-300 font-medium">
                      Drag and drop an image here, or{" "}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-white hover:text-gray-300 underline"
                      >
                        browse
                      </button>
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Supports: JPG, PNG, GIF (Max 5MB)
                    </p>
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Category *
            </label>
            <select
              value={storyData.category}
              onChange={(e) =>
                setStoryData((prev) => ({ ...prev, category: e.target.value }))
              }
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-white focus:outline-none"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Genres (Optional)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => handleGenreToggle(genre)}
                  className={`p-2 rounded text-sm transition-colors ${
                    storyData.genre.includes(genre)
                      ? "bg-white text-black"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Starting Text *
            </label>
            <textarea
              value={storyData.startingText}
              onChange={(e) =>
                setStoryData((prev) => ({
                  ...prev,
                  startingText: e.target.value,
                }))
              }
              className="w-full h-32 p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:border-white focus:outline-none"
              placeholder="Write the beginning of your story... This will be the first chapter that readers see."
              required
            />
            <p className="text-sm text-gray-400 mt-1">
              This will be the opening of your story. Make it engaging to draw
              readers in!
            </p>
          </div>
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <FaMagic className="text-white" />
              Start Story
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-medium text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
