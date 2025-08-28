const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    displayName: {
      type: String,
      required: [true, "Display name is required"],
      trim: true,
      maxlength: [50, "Display name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    avatar: {
      type: String,
      default: "👤",
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", "Prefer not to say"],
      default: "Prefer not to say",
    },
    location: {
      type: String,
      maxlength: [100, "Location cannot exceed 100 characters"],
    },
    birthday: {
      type: Date,
    },
    favoriteGenres: [
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
        ],
      },
    ],
    stats: {
      storiesWritten: {
        type: Number,
        default: 0,
      },
      storiesRead: {
        type: Number,
        default: 0,
      },
      followers: {
        type: Number,
        default: 0,
      },
      following: {
        type: Number,
        default: 0,
      },
      points: {
        type: Number,
        default: 0,
      },
      totalViews: {
        type: Number,
        default: 0,
      },
    },
    achievements: [
      {
        name: String,
        description: String,
        icon: String,
        unlockedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    readingProgress: {
      type: Map,
      of: {
        currentChapter: {
          type: Number,
          default: 1,
        },
        completed: {
          type: Boolean,
          default: false,
        },
        lastReadAt: {
          type: Date,
          default: Date.now,
        },
      },
      default: {},
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
        ref: "Story",
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance (username and email already have unique indexes from schema)
userSchema.index({ "stats.points": -1 });

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get public profile
userSchema.methods.getPublicProfile = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.email;
  return userObject;
};

// Virtual for join date
userSchema.virtual("joinDate").get(function () {
  if (!this.createdAt) {
    return "Unknown";
  }
  return this.createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// Ensure virtual fields are serialized
userSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", userSchema);
