const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    story: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
      required: [true, "Story is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },
    text: {
      type: String,
      required: [true, "Review text is required"],
      maxlength: [1000, "Review text cannot exceed 1000 characters"],
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    voters: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        vote: {
          type: String,
          enum: ["upvote", "downvote"],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isEdited: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    editedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Following", "Reading", "Completed", "Dropped"],
      default: "Reading",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
reviewSchema.index({ story: 1, createdAt: -1 });
reviewSchema.index({ user: 1, createdAt: -1 });
reviewSchema.index({ rating: 1 });
reviewSchema.index({ upvotes: -1 });
reviewSchema.index({ story: 1, user: 1 }, { unique: true });

// Virtual for vote count
reviewSchema.virtual("voteCount").get(function () {
  return this.upvotes - this.downvotes;
});

// Method to add vote
reviewSchema.methods.addVote = function (userId, voteType) {
  const existingVote = this.voters.find(
    (v) => v.user.toString() === userId.toString()
  );

  if (existingVote) {
    // Remove existing vote
    if (existingVote.vote === "upvote") {
      this.upvotes = Math.max(0, this.upvotes - 1);
    } else {
      this.downvotes = Math.max(0, this.downvotes - 1);
    }

    // Remove the vote from voters array
    this.voters = this.voters.filter(
      (v) => v.user.toString() !== userId.toString()
    );
  }

  // Add new vote
  if (voteType === "upvote") {
    this.upvotes += 1;
  } else if (voteType === "downvote") {
    this.downvotes += 1;
  }

  this.voters.push({
    user: userId,
    vote: voteType,
    createdAt: new Date(),
  });

  return this.save();
};

// Method to remove vote
reviewSchema.methods.removeVote = function (userId) {
  const existingVote = this.voters.find(
    (v) => v.user.toString() === userId.toString()
  );

  if (existingVote) {
    if (existingVote.vote === "upvote") {
      this.upvotes = Math.max(0, this.upvotes - 1);
    } else {
      this.downvotes = Math.max(0, this.downvotes - 1);
    }

    this.voters = this.voters.filter(
      (v) => v.user.toString() !== userId.toString()
    );
    return this.save();
  }

  return Promise.resolve(this);
};

// Ensure virtual fields are serialized
reviewSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Review", reviewSchema);
