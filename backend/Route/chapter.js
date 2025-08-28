const express = require("express");
const { body, validationResult } = require("express-validator");
const { auth, optionalAuth } = require("../Middleware/auth");
const Chapter = require("../Model/Chapter");
const Story = require("../Model/Story");
const User = require("../Model/User");

const router = express.Router();

// @desc    Get chapters by story ID
// @route   GET /api/chapters/story/:storyId
// @access  Public
const getChaptersByStory = async (req, res) => {
  try {
    const { storyId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const chapters = await Chapter.find({
      story: storyId,
      isDeleted: false,
      isPublished: true,
    })
      .populate("story", "title author")
      .sort({ chapterNumber: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Chapter.countDocuments({
      story: storyId,
      isDeleted: false,
      isPublished: true,
    });

    res.json({
      success: true,
      data: {
        chapters,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total,
      },
    });
  } catch (error) {
    console.error("Get chapters by story error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch chapters",
      error: error.message,
    });
  }
};

// @desc    Get chapter by ID
// @route   GET /api/chapters/:id
// @access  Public
const getChapterById = async (req, res) => {
  try {
    const { id } = req.params;

    const chapter = await Chapter.findById(id)
      .populate("story", "title author category genre")
      .populate("parentChapter", "title chapterNumber")
      .populate("branches.author", "username displayName avatar avatarUrl");

    if (!chapter || chapter.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Chapter not found",
      });
    }

    // Increment views and update reading progress if user is authenticated
    if (req.user) {
      await chapter.incrementViews();
      
      // Update reading progress
      const user = await User.findById(req.user._id);
      if (user) {
        const storyId = chapter.story._id || chapter.story;
        const currentProgress = user.readingProgress.get(storyId.toString());
        
        if (currentProgress) {
          // Update to current chapter if it's higher than stored progress
          if (chapter.chapterNumber > currentProgress.currentChapter) {
            currentProgress.currentChapter = chapter.chapterNumber;
          }
          currentProgress.lastReadAt = new Date();
          user.readingProgress.set(storyId.toString(), currentProgress);
        } else {
          // If no progress exists, create new entry
          user.readingProgress.set(storyId.toString(), {
            currentChapter: chapter.chapterNumber,
            completed: false,
            lastReadAt: new Date(),
          });
        }
        await user.save();
      }
    }

    res.json({
      success: true,
      data: { chapter },
    });
  } catch (error) {
    console.error("Get chapter by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch chapter",
      error: error.message,
    });
  }
};

// @desc    Create new chapter
// @route   POST /api/chapters
// @access  Private
const createChapter = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    const {
      storyId,
      title,
      content,
      chapterNumber,
      parentChapter,
      branchPath,
    } = req.body;

    // Check if user is author of the story
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    if (story.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to create chapters for this story",
      });
    }

    const chapter = new Chapter({
      story: storyId,
      title,
      content,
      chapterNumber,
      parentChapter,
      branchPath: branchPath || "main",
    });

    await chapter.save();

    // Update story stats
    await Story.findByIdAndUpdate(storyId, {
      $inc: { "stats.totalChapters": 1 },
      lastUpdated: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Chapter created successfully",
      data: { chapter },
    });
  } catch (error) {
    console.error("Create chapter error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create chapter",
      error: error.message,
    });
  }
};

// @desc    Update chapter
// @route   PUT /api/chapters/:id
// @access  Private
const updateChapter = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const updateData = req.body;

    const chapter = await Chapter.findById(id);
    if (!chapter) {
      return res.status(404).json({
        success: false,
        message: "Chapter not found",
      });
    }

    // Check if user is author of the story
    const story = await Story.findById(chapter.story);
    if (story.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this chapter",
      });
    }

    // Update chapter
    Object.keys(updateData).forEach((key) => {
      if (key !== "story" && key !== "stats") {
        chapter[key] = updateData[key];
      }
    });

    chapter.lastUpdated = new Date();
    await chapter.save();

    res.json({
      success: true,
      message: "Chapter updated successfully",
      data: { chapter },
    });
  } catch (error) {
    console.error("Update chapter error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update chapter",
      error: error.message,
    });
  }
};

// @desc    Delete chapter
// @route   DELETE /api/chapters/:id
// @access  Private
const deleteChapter = async (req, res) => {
  try {
    const { id } = req.params;

    const chapter = await Chapter.findById(id);
    if (!chapter) {
      return res.status(404).json({
        success: false,
        message: "Chapter not found",
      });
    }

    // Check if user is author of the story
    const story = await Story.findById(chapter.story);
    if (story.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this chapter",
      });
    }

    // Soft delete
    chapter.isDeleted = true;
    await chapter.save();

    // Update story stats
    await Story.findByIdAndUpdate(chapter.story, {
      $inc: { "stats.totalChapters": -1 },
      lastUpdated: new Date(),
    });

    res.json({
      success: true,
      message: "Chapter deleted successfully",
    });
  } catch (error) {
    console.error("Delete chapter error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete chapter",
      error: error.message,
    });
  }
};

// @desc    Add branch to chapter
// @route   POST /api/chapters/:id/branches
// @access  Private
const addBranch = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const { text, nextChapter } = req.body;

    const chapter = await Chapter.findById(id);
    if (!chapter) {
      return res.status(404).json({
        success: false,
        message: "Chapter not found",
      });
    }

    const branchData = {
      text,
      author: req.user._id,
      nextChapter,
    };

    await chapter.addBranch(branchData);

    res.json({
      success: true,
      message: "Branch added successfully",
      data: { chapter },
    });
  } catch (error) {
    console.error("Add branch error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add branch",
      error: error.message,
    });
  }
};

// @desc    Vote on branch
// @route   POST /api/chapters/:id/branches/:branchId/vote
// @access  Private
const voteBranch = async (req, res) => {
  try {
    const { id, branchId } = req.params;
    console.log("Vote request:", { id, branchId, userId: req.user._id });

    const chapter = await Chapter.findById(id);
    if (!chapter) {
      console.log("Chapter not found:", id);
      return res.status(404).json({
        success: false,
        message: "Chapter not found",
      });
    }

    console.log(
      "Chapter found, branches:",
      chapter.branches.map((b) => ({ id: b._id, text: b.text }))
    );

    await chapter.voteBranch(branchId, req.user._id);

    res.json({
      success: true,
      message: "Vote recorded successfully",
    });
  } catch (error) {
    console.error("Vote branch error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to record vote",
      error: error.message,
    });
  }
};

// Validation middleware
const createChapterValidation = [
  body("storyId").notEmpty().withMessage("Story ID is required"),
  body("title")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be between 1 and 100 characters"),
  body("content")
    .trim()
    .isLength({ min: 10, max: 10000 })
    .withMessage("Content must be between 10 and 10000 characters"),
  body("chapterNumber")
    .isInt({ min: 1 })
    .withMessage("Chapter number must be a positive integer"),
  body("parentChapter")
    .optional()
    .isMongoId()
    .withMessage("Invalid parent chapter ID"),
  body("branchPath")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Branch path cannot exceed 50 characters"),
];

const updateChapterValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be between 1 and 100 characters"),
  body("content")
    .optional()
    .trim()
    .isLength({ min: 10, max: 10000 })
    .withMessage("Content must be between 10 and 10000 characters"),
  body("chapterNumber")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Chapter number must be a positive integer"),
];

const addBranchValidation = [
  body("text")
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("Branch text must be between 1 and 500 characters"),
  body("nextChapter")
    .optional()
    .isMongoId()
    .withMessage("Invalid next chapter ID"),
];

// Routes
router.get("/story/:storyId", optionalAuth, getChaptersByStory);
router.get("/:id", optionalAuth, getChapterById);
router.post("/", auth, createChapterValidation, createChapter);
router.put("/:id", auth, updateChapterValidation, updateChapter);
router.delete("/:id", auth, deleteChapter);
router.post("/:id/branches", auth, addBranchValidation, addBranch);
router.post("/:id/branches/:branchId/vote", auth, voteBranch);

module.exports = router;
