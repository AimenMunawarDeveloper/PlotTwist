import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post("/auth/register", userData),
  login: (credentials) => api.post("/auth/login", credentials),
  logout: () => api.post("/auth/logout"),
  getMe: () => api.get("/auth/me"),
  updateProfile: (profileData) => api.put("/auth/profile", profileData),
  changePassword: (passwordData) =>
    api.put("/auth/change-password", passwordData),
};

// User API calls
export const userAPI = {
  getProfile: (userId) => api.get(`/users/${userId}`),
  getUserStories: (userId, page = 1, limit = 10) =>
    api.get(`/users/${userId}/stories?page=${page}&limit=${limit}`),
  toggleFollow: (userId) => api.post(`/users/${userId}/follow`),
  getBookmarks: (page = 1, limit = 10) =>
    api.get(`/users/bookmarks?page=${page}&limit=${limit}`),
  getReadingProgress: () => api.get("/users/reading-progress"),
  updateReadingProgress: (storyId, progressData) =>
    api.put(`/users/reading-progress/${storyId}`, progressData),
};

// Story API calls
export const storyAPI = {
  getAllStories: (page = 1, limit = 10) =>
    api.get(`/stories?page=${page}&limit=${limit}`),
  getTrendingStories: () => api.get("/stories/trending"),
  getPopularStories: () => api.get("/stories/popular"),
  getFeaturedStories: () => api.get("/stories/featured"),
  getStoryById: (storyId) => api.get(`/stories/${storyId}`),
  createStory: (storyData) => api.post("/stories", storyData),
  updateStory: (storyId, storyData) =>
    api.put(`/stories/${storyId}`, storyData),
  deleteStory: (storyId) => api.delete(`/stories/${storyId}`),
  toggleFollowStory: (storyId) => api.post(`/stories/${storyId}/follow`),
  toggleBookmarkStory: (storyId) => api.post(`/stories/${storyId}/bookmark`),
};

// Chapter API calls
export const chapterAPI = {
  getChaptersByStory: (storyId, page = 1, limit = 10) =>
    api.get(`/chapters/story/${storyId}?page=${page}&limit=${limit}`),
  getChapterById: (chapterId) => api.get(`/chapters/${chapterId}`),
  createChapter: (chapterData) => api.post("/chapters", chapterData),
  updateChapter: (chapterId, chapterData) =>
    api.put(`/chapters/${chapterId}`, chapterData),
  deleteChapter: (chapterId) => api.delete(`/chapters/${chapterId}`),
  addBranch: (chapterId, branchData) =>
    api.post(`/chapters/${chapterId}/branches`, branchData),
  voteBranch: (chapterId, branchId) =>
    api.post(`/chapters/${chapterId}/branches/${branchId}/vote`),
};

// Category API calls
export const categoryAPI = {
  getAllCategories: () => api.get("/categories"),
  getCategoryById: (categoryId) => api.get(`/categories/${categoryId}`),
  getStoriesByCategory: (categoryId, page = 1, limit = 10) =>
    api.get(`/categories/${categoryId}/stories?page=${page}&limit=${limit}`),
  createCategory: (categoryData) => api.post("/categories", categoryData),
  updateCategory: (categoryId, categoryData) =>
    api.put(`/categories/${categoryId}`, categoryData),
  deleteCategory: (categoryId) => api.delete(`/categories/${categoryId}`),
};

// Leaderboard API calls
export const leaderboardAPI = {
  getLeaderboard: () => api.get("/leaderboard"),
  getTopAuthors: () => api.get("/leaderboard/authors"),
  getTopStories: () => api.get("/leaderboard/stories"),
  getUserAchievements: (userId) =>
    api.get(`/leaderboard/achievements/${userId}`),
};

// Upload API calls
export const uploadAPI = {
  uploadImage: (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    return api.post("/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  uploadAvatar: (avatarFile) => {
    const formData = new FormData();
    formData.append("avatar", avatarFile);
    return api.post("/upload/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  uploadStoryCover: (coverFile) => {
    const formData = new FormData();
    formData.append("cover", coverFile);
    return api.post("/upload/story-cover", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  uploadMultipleImages: (imageFiles) => {
    const formData = new FormData();
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });
    return api.post("/upload/multiple", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteUploadedImage: (publicId) => api.delete(`/upload/${publicId}`),
};

export default api;
