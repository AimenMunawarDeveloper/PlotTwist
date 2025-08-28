const express = require("express");
const { optionalAuth } = require("../Middleware/auth");
const User = require("../Model/User");
const Story = require("../Model/Story");

const router = express.Router();

// @desc    Get leaderboard
// @route   GET /api/leaderboard
// @access  Public
const getLeaderboard = async (req, res) => {
  try {
    const { page = 1, limit = 20, sortBy = "points" } = req.query;

    let sortOptions = {};
    switch (sortBy) {
      case "points":
        sortOptions = { "stats.points": -1 };
        break;
      case "storiesWritten":
        sortOptions = { "stats.storiesWritten": -1 };
        break;
      case "followers":
        sortOptions = { "stats.followers": -1 };
        break;
      case "totalViews":
        sortOptions = { "stats.totalViews": -1 };
        break;
      default:
        sortOptions = { "stats.points": -1 };
    }

    const users = await User.find({ isActive: true })
      .select("username displayName avatar avatarUrl stats achievements")
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await User.countDocuments({ isActive: true });

    // Add ranking information
    const usersWithRanking = users.map((user, index) => {
      const rank = (page - 1) * limit + index + 1;
      const rankInfo = getRankInfo(user.stats.points);

      return {
        ...user.toObject(),
        rank,
        rankTitle: rankInfo.title,
        rankIcon: rankInfo.icon,
        rankColor: rankInfo.color,
      };
    });

    res.json({
      success: true,
      data: {
        users: usersWithRanking,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total,
        sortBy,
      },
    });
  } catch (error) {
    console.error("Get leaderboard error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch leaderboard",
      error: error.message,
    });
  }
};

// @desc    Get top authors
// @route   GET /api/leaderboard/authors
// @access  Public
const getTopAuthors = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const authors = await User.find({
      isActive: true,
      "stats.storiesWritten": { $gt: 0 },
    })
      .select("username displayName avatar avatarUrl stats")
      .sort({ "stats.storiesWritten": -1, "stats.points": -1 })
      .limit(parseInt(limit))
      .exec();

    const authorsWithRanking = authors.map((author, index) => {
      const rank = index + 1;
      const rankInfo = getRankInfo(author.stats.points);

      return {
        ...author.toObject(),
        rank,
        rankTitle: rankInfo.title,
        rankIcon: rankInfo.icon,
        rankColor: rankInfo.color,
      };
    });

    res.json({
      success: true,
      data: { authors: authorsWithRanking },
    });
  } catch (error) {
    console.error("Get top authors error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch top authors",
      error: error.message,
    });
  }
};

// @desc    Get top stories
// @route   GET /api/leaderboard/stories
// @access  Public
const getTopStories = async (req, res) => {
  try {
    const { limit = 10, sortBy = "rating" } = req.query;

    let sortOptions = {};
    switch (sortBy) {
      case "rating":
        sortOptions = { "stats.rating": -1, "stats.totalRatings": -1 };
        break;
      case "views":
        sortOptions = { "stats.totalViews": -1 };
        break;
      case "followers":
        sortOptions = { "stats.followers": -1 };
        break;
      default:
        sortOptions = { "stats.rating": -1, "stats.totalRatings": -1 };
    }

    const stories = await Story.find({
      isDeleted: false,
      isPublished: true,
    })
      .populate("author", "username displayName avatar avatarUrl")
      .sort(sortOptions)
      .limit(parseInt(limit))
      .exec();

    const storiesWithRanking = stories.map((story, index) => {
      const rank = index + 1;
      return {
        ...story.toObject(),
        rank,
      };
    });

    res.json({
      success: true,
      data: { stories: storiesWithRanking },
    });
  } catch (error) {
    console.error("Get top stories error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch top stories",
      error: error.message,
    });
  }
};

// @desc    Get user achievements
// @route   GET /api/leaderboard/achievements/:userId
// @access  Public
const getUserAchievements = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select(
      "username displayName avatar avatarUrl achievements stats"
    );

    if (!user || !user.isActive) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Calculate potential achievements
    const potentialAchievements = calculatePotentialAchievements(user.stats);

    // Combine existing and potential achievements
    const allAchievements = [...user.achievements, ...potentialAchievements];

    res.json({
      success: true,
      data: {
        user: {
          username: user.username,
          displayName: user.displayName,
          avatar: user.avatar,
          avatarUrl: user.avatarUrl,
          stats: user.stats,
        },
        achievements: allAchievements,
      },
    });
  } catch (error) {
    console.error("Get user achievements error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user achievements",
      error: error.message,
    });
  }
};

// Helper function to get rank information
const getRankInfo = (points) => {
  if (points >= 10000) {
    return {
      title: "Story Master",
      icon: "challenger",
      color: "text-white",
    };
  } else if (points >= 5000) {
    return {
      title: "Grandmaster",
      icon: "grandmaster",
      color: "text-white",
    };
  } else if (points >= 2000) {
    return {
      title: "Master",
      icon: "master",
      color: "text-white",
    };
  } else if (points >= 1000) {
    return {
      title: "Storyteller",
      icon: "gold",
      color: "text-white",
    };
  } else if (points >= 500) {
    return {
      title: "Novice",
      icon: "silver",
      color: "text-white",
    };
  } else {
    return {
      title: "Beginner",
      icon: "bronze",
      color: "text-white",
    };
  }
};

// Helper function to calculate potential achievements
const calculatePotentialAchievements = (stats) => {
  const achievements = [];

  // Story writing achievements
  if (stats.storiesWritten >= 1) {
    achievements.push({
      name: "First Story",
      description: "Published your first story",
      icon: "📝",
      unlockedAt: new Date(),
      isUnlocked: true,
    });
  }

  if (stats.storiesWritten >= 5) {
    achievements.push({
      name: "Story Creator",
      description: "Published 5 stories",
      icon: "📚",
      unlockedAt: new Date(),
      isUnlocked: true,
    });
  }

  if (stats.storiesWritten >= 10) {
    achievements.push({
      name: "Prolific Writer",
      description: "Published 10 stories",
      icon: "✍️",
      unlockedAt: new Date(),
      isUnlocked: true,
    });
  }

  // Follower achievements
  if (stats.followers >= 10) {
    achievements.push({
      name: "Rising Star",
      description: "Gained 10 followers",
      icon: "⭐",
      unlockedAt: new Date(),
      isUnlocked: true,
    });
  }

  if (stats.followers >= 100) {
    achievements.push({
      name: "Popular Author",
      description: "Gained 100 followers",
      icon: "🌟",
      unlockedAt: new Date(),
      isUnlocked: true,
    });
  }

  // Points achievements
  if (stats.points >= 1000) {
    achievements.push({
      name: "Point Collector",
      description: "Earned 1000 points",
      icon: "🏆",
      unlockedAt: new Date(),
      isUnlocked: true,
    });
  }

  if (stats.points >= 5000) {
    achievements.push({
      name: "Point Master",
      description: "Earned 5000 points",
      icon: "👑",
      unlockedAt: new Date(),
      isUnlocked: true,
    });
  }

  return achievements;
};

// Routes
router.get("/", optionalAuth, getLeaderboard);
router.get("/authors", optionalAuth, getTopAuthors);
router.get("/stories", optionalAuth, getTopStories);
router.get("/achievements/:userId", optionalAuth, getUserAchievements);

module.exports = router;
