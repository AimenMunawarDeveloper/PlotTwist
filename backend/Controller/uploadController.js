const {
  uploadImage,
  uploadAvatar,
  uploadStoryCover,
  deleteImage,
} = require("../Config/cloudinary");
const { validationResult } = require("express-validator");

// @desc    Upload general image
// @route   POST /api/upload/image
// @access  Private
const uploadGeneralImage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const { folder } = req.body;
    const result = await uploadImage(req.file.path, folder);

    res.json({
      success: true,
      message: "Image uploaded successfully",
      data: result,
    });
  } catch (error) {
    console.error("Upload image error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload image",
      error: error.message,
    });
  }
};

// @desc    Upload avatar
// @route   POST /api/upload/avatar
// @access  Private
const uploadUserAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await uploadAvatar(req.file.path);

    res.json({
      success: true,
      message: "Avatar uploaded successfully",
      data: result,
    });
  } catch (error) {
    console.error("Upload avatar error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload avatar",
      error: error.message,
    });
  }
};

// @desc    Upload story cover
// @route   POST /api/upload/story-cover
// @access  Private
const uploadStoryCoverImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await uploadStoryCover(req.file.path);

    res.json({
      success: true,
      message: "Story cover uploaded successfully",
      data: result,
    });
  } catch (error) {
    console.error("Upload story cover error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload story cover",
      error: error.message,
    });
  }
};

// @desc    Delete image
// @route   DELETE /api/upload/:publicId
// @access  Private
const deleteUploadedImage = async (req, res) => {
  try {
    const { publicId } = req.params;

    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: "Public ID is required",
      });
    }

    const result = await deleteImage(publicId);

    res.json({
      success: true,
      message: "Image deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Delete image error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete image",
      error: error.message,
    });
  }
};

// @desc    Upload multiple images
// @route   POST /api/upload/multiple
// @access  Private
const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    const { folder } = req.body;
    const uploadPromises = req.files.map((file) =>
      uploadImage(file.path, folder)
    );
    const results = await Promise.all(uploadPromises);

    res.json({
      success: true,
      message: "Images uploaded successfully",
      data: results,
    });
  } catch (error) {
    console.error("Upload multiple images error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload images",
      error: error.message,
    });
  }
};

module.exports = {
  uploadGeneralImage,
  uploadUserAvatar,
  uploadStoryCoverImage,
  deleteUploadedImage,
  uploadMultipleImages,
};
