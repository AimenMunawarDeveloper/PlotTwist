const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      maxlength: [50, "Category name cannot exceed 50 characters"],
    },
    icon: {
      type: String,
      required: [true, "Category icon is required"],
    },
    color: {
      type: String,
      default: "text-white",
    },
    description: {
      type: String,
      maxlength: [200, "Description cannot exceed 200 characters"],
    },
    storyCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance (name already has unique index from schema)
categorySchema.index({ isActive: 1 });
categorySchema.index({ order: 1 });

// Method to increment story count
categorySchema.methods.incrementStoryCount = function () {
  this.storyCount += 1;
  return this.save();
};

// Method to decrement story count
categorySchema.methods.decrementStoryCount = function () {
  this.storyCount = Math.max(0, this.storyCount - 1);
  return this.save();
};

module.exports = mongoose.model("Category", categorySchema);
