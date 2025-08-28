const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Branch text is required"],
    maxlength: [500, "Branch text cannot exceed 500 characters"],
  },
  votes: {
    type: Number,
    default: 0,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Branch author is required"],
  },
  nextChapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
  voters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const chapterSchema = new mongoose.Schema(
  {
    story: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
      required: [true, "Story is required"],
    },
    title: {
      type: String,
      required: [true, "Chapter title is required"],
      trim: true,
      maxlength: [100, "Chapter title cannot exceed 100 characters"],
    },
    chapterNumber: {
      type: Number,
      required: [true, "Chapter number is required"],
      min: 1,
    },
    content: {
      type: String,
      required: [true, "Chapter content is required"],
      maxlength: [10000, "Chapter content cannot exceed 10000 characters"],
    },
    branches: [branchSchema],
    stats: {
      views: {
        type: Number,
        default: 0,
      },
      comments: {
        type: Number,
        default: 0,
      },
      votes: {
        type: Number,
        default: 0,
      },
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    parentChapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
    },
    branchPath: {
      type: String,
      default: "main",
    },
    readingTime: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
chapterSchema.index({ story: 1, chapterNumber: 1 });
chapterSchema.index({ story: 1, publishedAt: -1 });
chapterSchema.index({ "stats.views": -1 });
chapterSchema.index({ "stats.comments": -1 });
chapterSchema.index({ isPublished: 1 });
chapterSchema.index({ parentChapter: 1 });

// Virtual for formatted stats
chapterSchema.virtual("formattedStats").get(function () {
  return {
    views: this.formatNumber(this.stats.views),
    comments: this.stats.comments,
    votes: this.stats.votes,
  };
});

// Method to format numbers (e.g., 1000 -> 1K)
chapterSchema.methods.formatNumber = function (num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

// Method to increment views
chapterSchema.methods.incrementViews = function () {
  this.stats.views += 1;
  this.lastUpdated = new Date();
  return this.save();
};

// Method to add branch
chapterSchema.methods.addBranch = function (branchData) {
  this.branches.push(branchData);
  return this.save();
};

// Method to vote on branch
chapterSchema.methods.voteBranch = function (branchId, userId) {
  console.log("voteBranch called with:", { branchId, userId });
  console.log(
    "Available branches:",
    this.branches.map((b) => ({ id: b._id, text: b.text }))
  );

  const branch = this.branches.id(branchId);
  console.log("Found branch:", branch);

  if (branch) {
    if (!branch.voters.includes(userId)) {
      branch.votes += 1;
      branch.voters.push(userId);
      this.stats.votes += 1;
      console.log("Vote added successfully");
      return this.save();
    } else {
      console.log("User already voted for this branch");
    }
  } else {
    console.log("Branch not found with ID:", branchId);
  }
  return Promise.resolve(this);
};

// Method to accept branch
chapterSchema.methods.acceptBranch = function (branchId) {
  const branch = this.branches.id(branchId);
  if (branch) {
    branch.isAccepted = true;
    return this.save();
  }
  return Promise.resolve(this);
};

// Method to calculate reading time
chapterSchema.methods.calculateReadingTime = function () {
  const wordsPerMinute = 200;
  const wordCount = this.content.split(/\s+/).length;
  this.readingTime = Math.ceil(wordCount / wordsPerMinute);
  return this.save();
};

// Pre-save middleware to calculate reading time
chapterSchema.pre("save", function (next) {
  if (this.isModified("content")) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    this.readingTime = Math.ceil(wordCount / wordsPerMinute);
  }
  next();
});

// Ensure virtual fields are serialized
chapterSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Chapter", chapterSchema);
