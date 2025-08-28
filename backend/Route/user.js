const express = require("express");
const { auth } = require("../Middleware/auth");
const User = require("../Model/User");
const Story = require("../Model/Story");

const router = express.Router();

// @desc    Get user profile by ID
// @route   GET /api/users/:id
// @access  Public
const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .populate("following", "username displayName avatar avatarUrl")
      .populate("followers", "username displayName avatar avatarUrl");

    if (!user || !user.isActive) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: {
        user: user.getPublicProfile(),
      },
    });
  } catch (error) {
    console.error("Get user profile error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user profile",
      error: error.message,
    });
  }
};

// @desc    Get user's stories
// @route   GET /api/users/:id/stories
// @access  Public
const getUserStories = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const stories = await Story.find({
      author: id,
      isDeleted: false,
      isPublished: true,
    })
      .populate("author", "username displayName avatar avatarUrl")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Story.countDocuments({
      author: id,
      isDeleted: false,
      isPublished: true,
    });

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
    console.error("Get user stories error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user stories",
      error: error.message,
    });
  }
};

// @desc    Follow/Unfollow user
// @route   POST /api/users/:id/follow
// @access  Private
const toggleFollowUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (id === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

    const userToFollow = await User.findById(id);
    if (!userToFollow || !userToFollow.isActive) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const currentUser = await User.findById(req.user._id);
    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      // Unfollow
      currentUser.following = currentUser.following.filter(
        (userId) => userId.toString() !== id
      );
      userToFollow.followers = userToFollow.followers.filter(
        (userId) => userId.toString() !== req.user._id.toString()
      );

      currentUser.stats.following = Math.max(
        0,
        currentUser.stats.following - 1
      );
      userToFollow.stats.followers = Math.max(
        0,
        userToFollow.stats.followers - 1
      );
    } else {
      // Follow
      currentUser.following.push(id);
      userToFollow.followers.push(req.user._id);

      currentUser.stats.following += 1;
      userToFollow.stats.followers += 1;
    }

    await Promise.all([currentUser.save(), userToFollow.save()]);

    res.json({
      success: true,
      message: isFollowing
        ? "Unfollowed user successfully"
        : "Followed user successfully",
      data: { isFollowing: !isFollowing },
    });
  } catch (error) {
    console.error("Toggle follow user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle follow",
      error: error.message,
    });
  }
};

// @desc    Get user's bookmarks
// @route   GET /api/users/bookmarks
// @access  Private
const getUserBookmarks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const user = await User.findById(req.user._id).populate({
      path: "bookmarks",
      match: { isDeleted: false, isPublished: true },
      populate: {
        path: "author",
        select: "username displayName avatar avatarUrl",
      },
      options: {
        sort: { createdAt: -1 },
        limit: limit * 1,
        skip: (page - 1) * limit,
      },
    });

    const total = await Story.countDocuments({
      _id: { $in: user.bookmarks },
      isDeleted: false,
      isPublished: true,
    });

    res.json({
      success: true,
      data: {
        stories: user.bookmarks,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total,
      },
    });
  } catch (error) {
    console.error("Get user bookmarks error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookmarks",
      error: error.message,
    });
  }
};

// @desc    Get user's reading progress
// @route   GET /api/users/reading-progress
// @access  Private
const getUserReadingProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const storyIds = Array.from(user.readingProgress.keys());
    const stories = await Story.find({
      _id: { $in: storyIds },
      isDeleted: false,
      isPublished: true,
    }).populate("author", "username displayName avatar avatarUrl");

    const readingProgress = stories.map((story) => ({
      story,
      progress: user.readingProgress.get(story._id.toString()),
    }));

    res.json({
      success: true,
      data: { readingProgress },
    });
  } catch (error) {
    console.error("Get reading progress error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reading progress",
      error: error.message,
    });
  }
};

// @desc    Update reading progress
// @route   PUT /api/users/reading-progress/:storyId
// @access  Private
const updateReadingProgress = async (req, res) => {
  try {
    const { storyId } = req.params;
    const { currentChapter, completed } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update reading progress
    user.readingProgress.set(storyId, {
      currentChapter: currentChapter || 1,
      completed: completed || false,
      lastReadAt: new Date(),
    });

    await user.save();

    res.json({
      success: true,
      message: "Reading progress updated successfully",
    });
  } catch (error) {
    console.error("Update reading progress error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update reading progress",
      error: error.message,
    });
  }
};

// Routes
router.get("/bookmarks", auth, getUserBookmarks);
router.get("/reading-progress", auth, getUserReadingProgress);
router.put("/reading-progress/:storyId", auth, updateReadingProgress);
router.get("/:id", getUserProfile);
router.get("/:id/stories", getUserStories);
router.post("/:id/follow", auth, toggleFollowUser);

module.exports = router;
