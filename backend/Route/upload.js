const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { auth } = require("../Middleware/auth");
const {
  uploadGeneralImage,
  uploadUserAvatar,
  uploadStoryCoverImage,
  deleteUploadedImage,
  uploadMultipleImages,
} = require("../Controller/uploadController");

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// File filter for images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: fileFilter,
});

// Error handling middleware for multer
const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum size is 5MB.",
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  next();
};

// Routes
router.post(
  "/image",
  auth,
  upload.single("image"),
  handleMulterError,
  uploadGeneralImage
);
router.post(
  "/avatar",
  auth,
  upload.single("avatar"),
  handleMulterError,
  uploadUserAvatar
);
router.post(
  "/story-cover",
  auth,
  upload.single("cover"),
  handleMulterError,
  uploadStoryCoverImage
);
router.post(
  "/multiple",
  auth,
  upload.array("images", 10),
  handleMulterError,
  uploadMultipleImages
);
router.delete("/:publicId", auth, deleteUploadedImage);

// Cleanup uploaded files after processing
router.use((req, res, next) => {
  if (req.file) {
    // Delete file after upload to Cloudinary
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting file:", err);
    });
  }

  if (req.files) {
    // Delete multiple files after upload to Cloudinary
    req.files.forEach((file) => {
      fs.unlink(file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    });
  }

  next();
});

module.exports = router;
