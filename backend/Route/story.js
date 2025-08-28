const express = require("express");
const { body } = require("express-validator");
const { auth, optionalAuth } = require("../Middleware/auth");
const {
  getAllStories,
  getTrendingStories,
  getPopularStories,
  getFeaturedStories,
  getStoryById,
  createStory,
  updateStory,
  deleteStory,
  toggleFollowStory,
  toggleBookmarkStory,
} = require("../Controller/storyController");

const router = express.Router();

// Validation middleware
const createStoryValidation = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be between 1 and 100 characters"),
  body("alternativeTitles")
    .optional()
    .isArray()
    .withMessage("Alternative titles must be an array"),
  body("coverImage").notEmpty().withMessage("Cover image is required"),
  body("artist")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Artist name cannot exceed 50 characters"),
  body("genre")
    .isArray({ min: 1 })
    .withMessage("At least one genre is required"),
  body("genre.*")
    .isIn([
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
      "Adventure",
      "Interactive",
    ])
    .withMessage("Invalid genre"),
  body("category")
    .isIn([
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
      "Adventure",
    ])
    .withMessage("Invalid category"),
  body("status")
    .optional()
    .isIn(["Ongoing", "Completed", "Hiatus", "Cancelled"])
    .withMessage("Invalid status"),
  body("publicationYear")
    .notEmpty()
    .withMessage("Publication year is required"),
  body("description")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters"),
  body("startingText")
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Starting text must be between 10 and 500 characters"),
  body("tags").optional().isArray().withMessage("Tags must be an array"),
  body("isInteractive")
    .optional()
    .isBoolean()
    .withMessage("isInteractive must be a boolean"),
  body("readDirection")
    .optional()
    .isIn(["Left to Right", "Right to Left", "Top to Bottom"])
    .withMessage("Invalid read direction"),
  body("ageRating")
    .optional()
    .isIn(["All Ages", "Teen", "Mature"])
    .withMessage("Invalid age rating"),
  body("language")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Language cannot exceed 20 characters"),
];

const updateStoryValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be between 1 and 100 characters"),
  body("alternativeTitles")
    .optional()
    .isArray()
    .withMessage("Alternative titles must be an array"),
  body("coverImage")
    .optional()
    .notEmpty()
    .withMessage("Cover image cannot be empty"),
  body("artist")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Artist name cannot exceed 50 characters"),
  body("genre")
    .optional()
    .isArray({ min: 1 })
    .withMessage("At least one genre is required"),
  body("genre.*")
    .optional()
    .isIn([
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
      "Adventure",
      "Interactive",
    ])
    .withMessage("Invalid genre"),
  body("category")
    .optional()
    .isIn([
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
      "Adventure",
    ])
    .withMessage("Invalid category"),
  body("status")
    .optional()
    .isIn(["Ongoing", "Completed", "Hiatus", "Cancelled"])
    .withMessage("Invalid status"),
  body("publicationYear")
    .optional()
    .notEmpty()
    .withMessage("Publication year cannot be empty"),
  body("description")
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters"),
  body("startingText")
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Starting text must be between 10 and 500 characters"),
  body("tags").optional().isArray().withMessage("Tags must be an array"),
  body("isInteractive")
    .optional()
    .isBoolean()
    .withMessage("isInteractive must be a boolean"),
  body("readDirection")
    .optional()
    .isIn(["Left to Right", "Right to Left", "Top to Bottom"])
    .withMessage("Invalid read direction"),
  body("ageRating")
    .optional()
    .isIn(["All Ages", "Teen", "Mature"])
    .withMessage("Invalid age rating"),
  body("language")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Language cannot exceed 20 characters"),
];

// Public routes
router.get("/", optionalAuth, getAllStories);
router.get("/trending", optionalAuth, getTrendingStories);
router.get("/popular", optionalAuth, getPopularStories);
router.get("/featured", optionalAuth, getFeaturedStories);
router.get("/:id", optionalAuth, getStoryById);

// Protected routes
router.post("/", auth, createStoryValidation, createStory);
router.put("/:id", auth, updateStoryValidation, updateStory);
router.delete("/:id", auth, deleteStory);
router.post("/:id/follow", auth, toggleFollowStory);
router.post("/:id/bookmark", auth, toggleBookmarkStory);

module.exports = router;
