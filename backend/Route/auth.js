const express = require("express");
const { body } = require("express-validator");
const { auth } = require("../Middleware/auth");
const {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  logout,
} = require("../Controller/authController");

const router = express.Router();

// Validation middleware
const registerValidation = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),
  body("displayName")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Display name must be between 1 and 50 characters"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("gender")
    .optional()
    .isIn(["Male", "Female", "Other", "Prefer not to say"])
    .withMessage("Invalid gender selection"),
  body("location")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Location cannot exceed 100 characters"),
  body("birthday")
    .optional()
    .custom((value) => {
      if (value === "" || value === null || value === undefined) {
        return true; // Allow empty values
      }
      if (!Date.parse(value)) {
        throw new Error("Invalid date format");
      }
      return true;
    })
    .withMessage("Invalid date format"),
  body("favoriteGenres")
    .optional()
    .isArray()
    .withMessage("Favorite genres must be an array"),
];

const loginValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

const updateProfileValidation = [
  body("displayName")
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Display name must be between 1 and 50 characters"),
  body("gender")
    .optional()
    .isIn(["Male", "Female", "Other", "Prefer not to say"])
    .withMessage("Invalid gender selection"),
  body("location")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Location cannot exceed 100 characters"),
  body("birthday")
    .optional()
    .custom((value) => {
      if (value === "" || value === null || value === undefined) {
        return true; // Allow empty values
      }
      if (!Date.parse(value)) {
        throw new Error("Invalid date format");
      }
      return true;
    })
    .withMessage("Invalid date format"),
  body("favoriteGenres")
    .optional()
    .isArray()
    .withMessage("Favorite genres must be an array"),
];

const changePasswordValidation = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters long"),
];

// Routes
router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/me", auth, getMe);
router.put("/profile", auth, updateProfileValidation, updateProfile);
router.put("/change-password", auth, changePasswordValidation, changePassword);
router.post("/logout", auth, logout);

module.exports = router;
