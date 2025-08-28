const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Story title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    alternativeTitles: [
      {
        type: String,
        trim: true,
        maxlength: [100, "Alternative title cannot exceed 100 characters"],
      },
    ],
    coverImage: {
      type: String,
      required: [true, "Cover image is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    artist: {
      type: String,
      trim: true,
      maxlength: [50, "Artist name cannot exceed 50 characters"],
    },
    genre: [
      {
        type: String,
        enum: [
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
        ],
        required: [true, "At least one genre is required"],
      },
    ],
    category: {
      type: String,
      enum: [
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
      ],
      required: [true, "Category is required"],
    },
    status: {
      type: String,
      enum: ["Ongoing", "Completed", "Hiatus", "Cancelled"],
      default: "Ongoing",
    },
    publicationYear: {
      type: String,
      required: [true, "Publication year is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    startingText: {
      type: String,
      required: [true, "Starting text is required"],
      maxlength: [500, "Starting text cannot exceed 500 characters"],
    },
    stats: {
      totalViews: {
        type: Number,
        default: 0,
      },
      followers: {
        type: Number,
        default: 0,
      },
      rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      totalRatings: {
        type: Number,
        default: 0,
      },
      totalChapters: {
        type: Number,
        default: 0,
      },
      totalComments: {
        type: Number,
        default: 0,
      },
    },
    ratingDistribution: {
      5: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      1: { type: Number, default: 0 },
    },
    tags: [
      {
        type: String,
        trim: true,
        maxlength: [20, "Tag cannot exceed 20 characters"],
      },
    ],
    isInteractive: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    readDirection: {
      type: String,
      enum: ["Left to Right", "Right to Left", "Top to Bottom"],
      default: "Top to Bottom",
    },
    ageRating: {
      type: String,
      enum: ["All Ages", "Teen", "Mature"],
      default: "All Ages",
    },
    language: {
      type: String,
      default: "English",
    },
    contributors: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["Author", "Artist", "Editor", "Translator"],
          default: "Author",
        },
        contributionDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isPublished: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
storySchema.index({ title: "text", description: "text" });
storySchema.index({ category: 1 });
storySchema.index({ genre: 1 });
storySchema.index({ status: 1 });
storySchema.index({ "stats.totalViews": -1 });
storySchema.index({ "stats.rating": -1 });
storySchema.index({ isFeatured: 1 });
storySchema.index({ isTrending: 1 });
storySchema.index({ isPopular: 1 });
storySchema.index({ author: 1 });
storySchema.index({ createdAt: -1 });
storySchema.index({ lastUpdated: -1 });

// Virtual for formatted stats
storySchema.virtual("formattedStats").get(function () {
  return {
    totalViews: this.formatNumber(this.stats?.totalViews),
    followers: this.formatNumber(this.stats?.followers),
    rating: this.stats?.rating ? this.stats.rating.toFixed(1) : "0.0",
    totalRatings: this.stats?.totalRatings || 0,
  };
});

// Method to format numbers (e.g., 1000 -> 1K)
storySchema.methods.formatNumber = function (num) {
  if (!num || isNaN(num)) {
    return "0";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

// Method to update rating
storySchema.methods.updateRating = function (newRating) {
  const oldRating = this.stats.rating;
  const totalRatings = this.stats.totalRatings;

  // Update total ratings
  this.stats.totalRatings += 1;

  // Update average rating
  this.stats.rating =
    (oldRating * totalRatings + newRating) / this.stats.totalRatings;

  // Update rating distribution
  if (newRating >= 1 && newRating <= 5) {
    this.ratingDistribution[Math.floor(newRating)] += 1;
  }

  return this.save();
};

// Method to increment views
storySchema.methods.incrementViews = function () {
  this.stats.totalViews += 1;
  this.lastUpdated = new Date();
  return this.save();
};

// Method to add follower
storySchema.methods.addFollower = function (userId) {
  if (!this.followers.includes(userId)) {
    this.followers.push(userId);
    this.stats.followers += 1;
    return this.save();
  }
  return Promise.resolve(this);
};

// Method to remove follower
storySchema.methods.removeFollower = function (userId) {
  const index = this.followers.indexOf(userId);
  if (index > -1) {
    this.followers.splice(index, 1);
    this.stats.followers = Math.max(0, this.stats.followers - 1);
    return this.save();
  }
  return Promise.resolve(this);
};

// Ensure virtual fields are serialized
storySchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Story", storySchema);
