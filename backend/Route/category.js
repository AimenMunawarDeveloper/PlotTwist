const express = require("express");
const { body, validationResult } = require("express-validator");
const { auth, optionalAuth } = require("../Middleware/auth");
const Category = require("../Model/Category");
const Story = require("../Model/Story");

const router = express.Router();

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({
      order: 1,
      name: 1,
    });

    res.json({
      success: true,
      data: { categories },
    });
  } catch (error) {
    console.error("Get all categories error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};

// @desc    Get category by ID
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category || !category.isActive) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      data: { category },
    });
  } catch (error) {
    console.error("Get category by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch category",
      error: error.message,
    });
  }
};

// @desc    Get stories by category
// @route   GET /api/categories/:id/stories
// @access  Public
const getStoriesByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Try to find category by ID first, then by name
    let category;
    try {
      category = await Category.findById(id);
    } catch (error) {
      // If ID is not a valid ObjectId, try to find by name
      category = await Category.findOne({ name: id });
    }

    if (!category) {
      // If still not found, try to find by name as fallback
      category = await Category.findOne({ name: id });
    }

    if (!category || !category.isActive) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    const stories = await Story.find({
      category: category.name,
      isDeleted: false,
      isPublished: true,
    })
      .populate("author", "username displayName avatar avatarUrl")
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Story.countDocuments({
      category: category.name,
      isDeleted: false,
      isPublished: true,
    });

    res.json({
      success: true,
      data: {
        category,
        stories,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total,
      },
    });
  } catch (error) {
    console.error("Get stories by category error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch stories by category",
      error: error.message,
    });
  }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private (Admin only)
const createCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    const { name, icon, color, description, order } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = new Category({
      name,
      icon,
      color,
      description,
      order,
    });

    await category.save();

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: { category },
    });
  } catch (error) {
    console.error("Create category error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create category",
      error: error.message,
    });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private (Admin only)
const updateCategory = async (req, res) => {
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

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check if name is being changed and if it already exists
    if (updateData.name && updateData.name !== category.name) {
      const existingCategory = await Category.findOne({
        name: updateData.name,
      });
      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: "Category name already exists",
        });
      }
    }

    // Update category
    Object.keys(updateData).forEach((key) => {
      category[key] = updateData[key];
    });

    await category.save();

    res.json({
      success: true,
      message: "Category updated successfully",
      data: { category },
    });
  } catch (error) {
    console.error("Update category error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update category",
      error: error.message,
    });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private (Admin only)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check if category has stories
    const storyCount = await Story.countDocuments({
      category: category.name,
      isDeleted: false,
    });

    if (storyCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category. It has ${storyCount} stories.`,
      });
    }

    // Soft delete
    category.isActive = false;
    await category.save();

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Delete category error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete category",
      error: error.message,
    });
  }
};

// Validation middleware
const createCategoryValidation = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Category name must be between 1 and 50 characters"),
  body("icon").notEmpty().withMessage("Category icon is required"),
  body("color")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Color cannot exceed 20 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Description cannot exceed 200 characters"),
  body("order")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Order must be a non-negative integer"),
];

const updateCategoryValidation = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Category name must be between 1 and 50 characters"),
  body("icon")
    .optional()
    .notEmpty()
    .withMessage("Category icon cannot be empty"),
  body("color")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Color cannot exceed 20 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Description cannot exceed 200 characters"),
  body("order")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Order must be a non-negative integer"),
];

// Routes
router.get("/", optionalAuth, getAllCategories);
router.get("/:id", optionalAuth, getCategoryById);
router.get("/:id/stories", optionalAuth, getStoriesByCategory);
router.post("/", auth, createCategoryValidation, createCategory);
router.put("/:id", auth, updateCategoryValidation, updateCategory);
router.delete("/:id", auth, deleteCategory);

module.exports = router;
