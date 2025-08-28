const Story = require("../Model/Story");
const Chapter = require("../Model/Chapter");
const Review = require("../Model/Review");
const Category = require("../Model/Category");
const User = require("../Model/User");
const { validationResult } = require("express-validator");

// @desc    Get all stories
// @route   GET /api/stories
// @access  Public
const getAllStories = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      genre,
      status,
      sortBy = "createdAt",
      sortOrder = "desc",
      search,
    } = req.query;

    const query = { isDeleted: false, isPublished: true };

    // Apply filters
    if (category) query.category = category;
    if (genre) query.genre = genre;
    if (status) query.status = status;
    if (search) {
      query.$text = { $search: search };
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    const stories = await Story.find(query)
      .populate("author", "username displayName avatar avatarUrl")
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Story.countDocuments(query);

    res.json({
      success: true,
      data: {
        stories,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total,
      },
    });
  } catch (error) {
    console.error("Get all stories error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch stories",
      error: error.message,
    });
  }
};

// @desc    Get trending stories
// @route   GET /api/stories/trending
// @access  Public
const getTrendingStories = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const stories = await Story.find({
      isDeleted: false,
      isPublished: true,
    })
      .populate("author", "username displayName avatar avatarUrl")
      .sort({ totalViews: -1, rating: -1 }) // Sort by views first, then rating
      .limit(parseInt(limit))
      .exec();

    res.json({
      success: true,
      data: { stories },
    });
  } catch (error) {
    console.error("Get trending stories error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch trending stories",
      error: error.message,
    });
  }
};

// @desc    Get popular stories
// @route   GET /api/stories/popular
// @access  Public
const getPopularStories = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const stories = await Story.find({
      isDeleted: false,
      isPublished: true,
    })
      .populate("author", "username displayName avatar avatarUrl")
      .sort({ totalViews: -1, followers: -1 }) // Sort by views first, then followers
      .limit(parseInt(limit))
      .exec();

    res.json({
      success: true,
      data: { stories },
    });
  } catch (error) {
    console.error("Get popular stories error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch popular stories",
      error: error.message,
    });
  }
};

// @desc    Get featured stories
// @route   GET /api/stories/featured
// @access  Public
const getFeaturedStories = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const stories = await Story.find({
      isDeleted: false,
      isPublished: true,
    })
      .populate("author", "username displayName avatar avatarUrl")
      .sort({ rating: -1, totalViews: -1 }) // Sort by rating first, then views
      .limit(parseInt(limit))
      .exec();

    res.json({
      success: true,
      data: { stories },
    });
  } catch (error) {
    console.error("Get featured stories error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch featured stories",
      error: error.message,
    });
  }
};

// @desc    Get story by ID
// @route   GET /api/stories/:id
// @access  Public
const getStoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const story = await Story.findById(id)
      .populate("author", "username displayName avatar avatarUrl stats")
      .populate("contributors.user", "username displayName avatar avatarUrl")
      .populate("followers", "username displayName avatar avatarUrl");

    if (!story || story.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    // Increment views and update reading progress if user is authenticated
    if (req.user) {
      await story.incrementViews();
      
      // Update reading progress
      const user = await User.findById(req.user._id);
      if (user) {
        const storyId = story._id.toString();
        const currentProgress = user.readingProgress.get(storyId);
        
        if (currentProgress) {
          // Update last read time
          currentProgress.lastReadAt = new Date();
          user.readingProgress.set(storyId, currentProgress);
        } else {
          // If no progress exists, create new entry
          user.readingProgress.set(storyId, {
            currentChapter: 1,
            completed: false,
            lastReadAt: new Date(),
          });
        }
        await user.save();
      }
    }

    // Get chapters count
    const chaptersCount = await Chapter.countDocuments({
      story: id,
      isDeleted: false,
      isPublished: true,
    });

    // Get reviews
    const reviews = await Review.find({
      story: id,
      isDeleted: false,
    })
      .populate("user", "username displayName avatar avatarUrl")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(); // Convert to plain objects to avoid mongoose issues

    const storyData = story.toObject();
    storyData.chaptersCount = chaptersCount;
    storyData.reviews = reviews;

    res.json({
      success: true,
      data: { story: storyData },
    });
  } catch (error) {
    console.error("Get story by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch story",
      error: error.message,
    });
  }
};

// @desc    Create new story
// @route   POST /api/stories
// @access  Private
const createStory = async (req, res) => {
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
      title,
      alternativeTitles,
      coverImage,
      artist,
      genre,
      category,
      status,
      publicationYear,
      description,
      startingText,
      tags,
      isInteractive,
      readDirection,
      ageRating,
      language,
    } = req.body;

    const story = new Story({
      title,
      alternativeTitles,
      coverImage,
      author: req.user._id,
      artist,
      genre,
      category,
      status,
      publicationYear,
      description,
      startingText,
      tags,
      isInteractive,
      readDirection,
      ageRating,
      language,
      contributors: [
        {
          user: req.user._id,
          role: "Author",
        },
      ],
    });

    await story.save();

    // Update user stats
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { "stats.storiesWritten": 1 },
    });

    // Update category story count
    await Category.findOneAndUpdate(
      { name: category },
      { $inc: { storyCount: 1 } }
    );

    res.status(201).json({
      success: true,
      message: "Story created successfully",
      data: { story },
    });
  } catch (error) {
    console.error("Create story error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create story",
      error: error.message,
    });
  }
};

// @desc    Update story
// @route   PUT /api/stories/:id
// @access  Private
const updateStory = async (req, res) => {
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

    const story = await Story.findById(id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    // Check if user is author or contributor
    const isAuthor = story.author.toString() === req.user._id.toString();
    const isContributor = story.contributors.some(
      (c) => c.user.toString() === req.user._id.toString()
    );

    if (!isAuthor && !isContributor) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this story",
      });
    }

    // Update story
    Object.keys(updateData).forEach((key) => {
      if (key !== "author" && key !== "stats") {
        story[key] = updateData[key];
      }
    });

    story.lastUpdated = new Date();
    await story.save();

    res.json({
      success: true,
      message: "Story updated successfully",
      data: { story },
    });
  } catch (error) {
    console.error("Update story error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update story",
      error: error.message,
    });
  }
};

// @desc    Delete story
// @route   DELETE /api/stories/:id
// @access  Private
const deleteStory = async (req, res) => {
  try {
    const { id } = req.params;

    const story = await Story.findById(id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    // Check if user is author
    if (story.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this story",
      });
    }

    // Soft delete
    story.isDeleted = true;
    await story.save();

    // Update user stats
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { "stats.storiesWritten": -1 },
    });

    // Update category story count
    await Category.findOneAndUpdate(
      { name: story.category },
      { $inc: { storyCount: -1 } }
    );

    res.json({
      success: true,
      message: "Story deleted successfully",
    });
  } catch (error) {
    console.error("Delete story error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete story",
      error: error.message,
    });
  }
};

// @desc    Follow/Unfollow story
// @route   POST /api/stories/:id/follow
// @access  Private
const toggleFollowStory = async (req, res) => {
  try {
    const { id } = req.params;

    const story = await Story.findById(id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    const isFollowing = story.followers.includes(req.user._id);

    if (isFollowing) {
      await story.removeFollower(req.user._id);
      res.json({
        success: true,
        message: "Unfollowed story successfully",
        data: { isFollowing: false },
      });
    } else {
      await story.addFollower(req.user._id);
      res.json({
        success: true,
        message: "Followed story successfully",
        data: { isFollowing: true },
      });
    }
  } catch (error) {
    console.error("Toggle follow story error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle follow",
      error: error.message,
    });
  }
};

// @desc    Bookmark/Unbookmark story
// @route   POST /api/stories/:id/bookmark
// @access  Private
const toggleBookmarkStory = async (req, res) => {
  try {
    const { id } = req.params;

    const story = await Story.findById(id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    const user = await User.findById(req.user._id);
    const isBookmarked = user.bookmarks.includes(id);

    if (isBookmarked) {
      // Remove bookmark
      user.bookmarks = user.bookmarks.filter(
        (bookmarkId) => bookmarkId.toString() !== id
      );
      story.bookmarks = story.bookmarks.filter(
        (bookmarkId) => bookmarkId.toString() !== req.user._id.toString()
      );
    } else {
      // Add bookmark
      user.bookmarks.push(id);
      story.bookmarks.push(req.user._id);
    }

    await Promise.all([user.save(), story.save()]);

    res.json({
      success: true,
      message: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      data: { isBookmarked: !isBookmarked },
    });
  } catch (error) {
    console.error("Toggle bookmark story error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle bookmark",
      error: error.message,
    });
  }
};

module.exports = {
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
};
