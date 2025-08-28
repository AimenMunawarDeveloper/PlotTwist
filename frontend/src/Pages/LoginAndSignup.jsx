import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LightRays from "../animation/LightRays";
import { FaEye, FaEyeSlash, FaUser, FaUpload } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { uploadAPI } from "../services/api";
import { toast } from "react-toastify";

export default function LoginAndSignup() {
  const [loginOrSignup, setLoginOrSignup] = useState("login");
  const [showOrHidePassword, setShowOrHidePassword] = useState(false);
  const [signupStep, setSignupStep] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    email: "",
    password: "",
    gender: "Prefer not to say",
    location: "",
    birthday: "",
    favoriteGenres: [],
  });
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/home");
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Real-time validation
    validateField(name, value);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setAvatar(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setAvatar(null);
    setAvatarPreview(null);
  };

  const nextStep = () => {
    setSignupStep(2);
  };

  const prevStep = () => {
    setSignupStep(1);
  };

  const validateField = (fieldName, value) => {
    let error = "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    switch (fieldName) {
      case "username":
        if (value.length < 3) {
          error = "Username must be at least 3 characters long";
        } else if (value.length > 20) {
          error = "Username must be less than 20 characters";
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          error = "Username can only contain letters, numbers, and underscores";
        }
        break;

      case "displayName":
        if (value.length < 2) {
          error = "Display name must be at least 2 characters long";
        } else if (value.length > 50) {
          error = "Display name must be less than 50 characters";
        }
        break;

      case "email":
        if (!emailRegex.test(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "password":
        if (value.length < 6) {
          error = "Password must be at least 6 characters long";
        } else if (value.length > 100) {
          error = "Password must be less than 100 characters";
        }
        break;

      default:
        break;
    }

    setFieldErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const resetSignupForm = () => {
    setFormData({
      username: "",
      displayName: "",
      email: "",
      password: "",
      gender: "Prefer not to say",
      location: "",
      birthday: "",
      favoriteGenres: [],
    });
    setSignupStep(1);
    setFieldErrors({});
    setAvatar(null);
    setAvatarPreview(null);
  };

  const handleSignupStep = async () => {
    if (signupStep === 1) {
      nextStep();
    } else {
      await handleSubmission();
    }
  };

  const handleSubmission = async () => {
    setLoading(true);
    setFieldErrors({});

    try {
      if (loginOrSignup === "login") {
        const result = await login({
          email: formData.email,
          password: formData.password,
        });
        if (result.success) {
          navigate("/home");
        }
      } else {
        // Upload avatar if selected
        let avatarUrl = null;
        if (avatar) {
          try {
            const uploadResponse = await uploadAPI.uploadAvatar(avatar);
            avatarUrl = uploadResponse.data.data.avatarUrl;
          } catch (uploadError) {
            console.error("Error uploading avatar:", uploadError);
            toast.error("Failed to upload avatar. Please try again.");
            setLoading(false);
            return;
          }
        }

        // Filter out empty optional fields for registration
        const registrationData = {
          username: formData.username,
          displayName: formData.displayName,
          email: formData.email,
          password: formData.password,
          gender: formData.gender,
        };

        // Only include non-empty optional fields
        if (formData.location.trim()) {
          registrationData.location = formData.location;
        }
        if (formData.birthday) {
          registrationData.birthday = formData.birthday;
        }
        if (formData.favoriteGenres.length > 0) {
          registrationData.favoriteGenres = formData.favoriteGenres;
        }
        if (avatarUrl) {
          registrationData.avatar = avatarUrl;
        }

        const result = await register(registrationData);
        if (result.success) {
          navigate("/home");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative flex justify-center items-center w-full min-h-screen overflow-hidden py-10 sm:py-0">
      <div className="absolute inset-0 -z-10">
        <div className="relative w-full h-full">
          <LightRays
            raysOrigin="top-center"
            raysColor="#00000"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </div>
      </div>
      <div className="flex flex-col gap-6 sm:gap-10 p-4 sm:p-6 bg-black rounded-lg w-11/12 sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 shadow-lg shadow-black">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white">
          {loginOrSignup === "login" ? "Login" : "Signup"}
        </h2>
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmission();
          }}
        >
          {loginOrSignup === "signup" && (
            <>
              {/* Step indicator */}
              <div className="flex justify-center mb-4">
                <div className="flex space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      signupStep >= 1 ? "bg-white" : "bg-gray-600"
                    }`}
                  ></div>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      signupStep >= 2 ? "bg-white" : "bg-gray-600"
                    }`}
                  ></div>
                </div>
              </div>

              {signupStep === 1 ? (
                // Step 1: Basic Information
                <>
                  <label
                    htmlFor="username"
                    className="text-white text-sm sm:text-base"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`p-2 sm:p-3 bg-white rounded-md text-black text-sm sm:text-base ${
                      fieldErrors.username ? "border-2 border-red-500" : ""
                    }`}
                    required
                  />
                  {fieldErrors.username && (
                    <p className="text-red-400 text-xs mt-1">
                      {fieldErrors.username}
                    </p>
                  )}
                  <label
                    htmlFor="displayName"
                    className="text-white text-sm sm:text-base"
                  >
                    Display Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter display name"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    className={`p-2 sm:p-3 bg-white rounded-md text-black text-sm sm:text-base ${
                      fieldErrors.displayName ? "border-2 border-red-500" : ""
                    }`}
                    required
                  />
                  {fieldErrors.displayName && (
                    <p className="text-red-400 text-xs mt-1">
                      {fieldErrors.displayName}
                    </p>
                  )}
                  <label
                    htmlFor="email"
                    className="text-white text-sm sm:text-base"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`p-2 sm:p-3 bg-white rounded-md text-black text-sm sm:text-base ${
                      fieldErrors.email ? "border-2 border-red-500" : ""
                    }`}
                    required
                  />
                  {fieldErrors.email && (
                    <p className="text-red-400 text-xs mt-1">
                      {fieldErrors.email}
                    </p>
                  )}
                  <label
                    htmlFor="password"
                    className="text-white text-sm sm:text-base"
                  >
                    Password
                  </label>
                  <div className="relative w-full">
                    <input
                      type={showOrHidePassword ? "text" : "password"}
                      placeholder="Enter password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`p-2 sm:p-3 pr-10 bg-white rounded-md text-black w-full text-sm sm:text-base ${
                        fieldErrors.password ? "border-2 border-red-500" : ""
                      }`}
                      required
                    />
                    <span
                      onClick={() => setShowOrHidePassword(!showOrHidePassword)}
                      className="absolute right-3 flex items-center inset-y-0 cursor-pointer text-gray-600"
                    >
                      {showOrHidePassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {fieldErrors.password && (
                    <p className="text-red-400 text-xs mt-1">
                      {fieldErrors.password}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={handleSignupStep}
                    disabled={
                      !formData.username ||
                      !formData.displayName ||
                      !formData.email ||
                      !formData.password ||
                      fieldErrors.username ||
                      fieldErrors.displayName ||
                      fieldErrors.email ||
                      fieldErrors.password
                    }
                    className="bg-white text-black px-4 py-2 sm:py-3 rounded-md mt-4 text-sm sm:text-base hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next Step
                  </button>
                </>
              ) : (
                // Step 2: Additional Information
                <>
                  <label
                    htmlFor="gender"
                    className="text-white text-sm sm:text-base"
                  >
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="p-2 sm:p-3 bg-white rounded-md text-black text-sm sm:text-base"
                  >
                    <option value="Prefer not to say">Prefer not to say</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <label
                    htmlFor="location"
                    className="text-white text-sm sm:text-base"
                  >
                    Location (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="p-2 sm:p-3 bg-white rounded-md text-black text-sm sm:text-base"
                  />
                  <label
                    htmlFor="birthday"
                    className="text-white text-sm sm:text-base"
                  >
                    Birthday (Optional)
                  </label>
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleInputChange}
                    className="p-2 sm:p-3 bg-white rounded-md text-black text-sm sm:text-base"
                  />
                  <label
                    htmlFor="avatar"
                    className="text-white text-sm sm:text-base"
                  >
                    Avatar (Optional)
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <input
                        type="file"
                        id="avatar"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="avatar"
                        className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        <FaUpload />
                        Upload Avatar
                      </label>
                    </div>
                    {avatarPreview && (
                      <div className="flex items-center gap-2">
                        <img
                          src={avatarPreview}
                          alt="Avatar Preview"
                          className="w-12 h-12 rounded-full object-cover border-2 border-white"
                        />
                        <button
                          type="button"
                          onClick={removeAvatar}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="favoriteGenres"
                    className="text-white text-sm sm:text-base"
                  >
                    Favorite Genres (Optional)
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                    {[
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
                    ].map((genre) => (
                      <label
                        key={genre}
                        className="flex items-center text-white text-xs"
                      >
                        <input
                          type="checkbox"
                          value={genre}
                          checked={formData.favoriteGenres.includes(genre)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData((prev) => ({
                                ...prev,
                                favoriteGenres: [...prev.favoriteGenres, genre],
                              }));
                            } else {
                              setFormData((prev) => ({
                                ...prev,
                                favoriteGenres: prev.favoriteGenres.filter(
                                  (g) => g !== genre
                                ),
                              }));
                            }
                          }}
                          className="mr-2"
                        />
                        {genre}
                      </label>
                    ))}
                  </div>
                  <label
                    htmlFor="avatar"
                    className="text-white text-sm sm:text-base flex items-center cursor-pointer"
                  >
                    <FaUser className="mr-2" />
                    Avatar (Optional)
                    <input
                      type="file"
                      id="avatar"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                  {avatarPreview && (
                    <div className="mt-4 flex items-center">
                      <img
                        src={avatarPreview}
                        alt="Avatar Preview"
                        className="w-10 h-10 rounded-full object-cover mr-2"
                      />
                      <button
                        type="button"
                        onClick={removeAvatar}
                        className="text-red-400 hover:text-red-300"
                      >
                        <FaUpload />
                      </button>
                    </div>
                  )}
                  <div className="flex gap-2 mt-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-600 text-white px-4 py-2 sm:py-3 rounded-md text-sm sm:text-base hover:bg-gray-700 transition-colors flex-1"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={handleSignupStep}
                      disabled={
                        loading ||
                        fieldErrors.username ||
                        fieldErrors.displayName ||
                        fieldErrors.email ||
                        fieldErrors.password
                      }
                      className="bg-white text-black px-4 py-2 sm:py-3 rounded-md text-sm sm:text-base hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-1"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                          Signing up...
                        </span>
                      ) : (
                        "Sign Up"
                      )}
                    </button>
                  </div>
                </>
              )}
            </>
          )}
          {loginOrSignup === "login" && (
            <>
              <label
                htmlFor="email"
                className="text-white text-sm sm:text-base"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`p-2 sm:p-3 bg-white rounded-md text-black text-sm sm:text-base ${
                  fieldErrors.email ? "border-2 border-red-500" : ""
                }`}
                required
              />
              {fieldErrors.email && (
                <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>
              )}
              <label
                htmlFor="password"
                className="text-white text-sm sm:text-base"
              >
                Password
              </label>
              <div className="relative w-full">
                <input
                  type={showOrHidePassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`p-2 sm:p-3 pr-10 bg-white rounded-md text-black w-full text-sm sm:text-base ${
                    fieldErrors.password ? "border-2 border-red-500" : ""
                  }`}
                  required
                />
                <span
                  onClick={() => setShowOrHidePassword(!showOrHidePassword)}
                  className="absolute right-3 flex items-center inset-y-0 cursor-pointer text-gray-600"
                >
                  {showOrHidePassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {fieldErrors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {fieldErrors.password}
                </p>
              )}
            </>
          )}
          {loginOrSignup === "login" && (
            <button
              className="bg-white text-black px-4 py-2 sm:py-3 rounded-md mt-6 sm:mt-8 text-sm sm:text-base hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading || fieldErrors.email || fieldErrors.password}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          )}
          {loginOrSignup === "login" ? (
            <p className="text-white text-sm sm:text-base text-center">
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setLoginOrSignup("signup");
                  resetSignupForm();
                }}
                className="cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p className="text-white text-sm sm:text-base text-center">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setLoginOrSignup("login");
                  resetSignupForm();
                }}
                className="cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
