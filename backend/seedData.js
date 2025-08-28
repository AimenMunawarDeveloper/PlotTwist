const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Import models
const User = require("./Model/User");
const Story = require("./Model/Story");
const Chapter = require("./Model/Chapter");
const Category = require("./Model/Category");
const Review = require("./Model/Review");

// Mock data
const mockUsers = [
  {
    username: "john_doe",
    displayName: "John Doe",
    email: "john@example.com",
    password: "password123",
    gender: "Male",
    location: "New York, USA",
    birthday: "1990-05-15",
    favoriteGenres: ["Fantasy", "Adventure", "Romance"],
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    stats: {
      storiesWritten: 5,
      storiesRead: 25,
      followers: 120,
      points: 850,
    },
  },
  {
    username: "jane_smith",
    displayName: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    gender: "Female",
    location: "Los Angeles, USA",
    birthday: "1992-08-22",
    favoriteGenres: ["Romance", "Drama", "Slice of Life"],
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    stats: {
      storiesWritten: 3,
      storiesRead: 18,
      followers: 85,
      points: 620,
    },
  },
  {
    username: "mike_wilson",
    displayName: "Mike Wilson",
    email: "mike@example.com",
    password: "password123",
    gender: "Male",
    location: "Chicago, USA",
    birthday: "1988-12-10",
    favoriteGenres: ["Sci-fi", "Thriller", "Mystery"],
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    stats: {
      storiesWritten: 8,
      storiesRead: 42,
      followers: 200,
      points: 1200,
    },
  },
];

const mockCategories = [
  {
    name: "Romance",
    description: "Love stories and romantic relationships",
    icon: "💕",
    color: "text-pink-500",
    isActive: true,
    order: 1,
  },
  {
    name: "Fantasy",
    description: "Magical worlds and supernatural elements",
    icon: "🐉",
    color: "text-purple-500",
    isActive: true,
    order: 2,
  },
  {
    name: "Drama",
    description: "Emotional and character-driven stories",
    icon: "🎭",
    color: "text-blue-500",
    isActive: true,
    order: 3,
  },
  {
    name: "Comedy",
    description: "Humorous and light-hearted stories",
    icon: "😂",
    color: "text-yellow-500",
    isActive: true,
    order: 4,
  },
  {
    name: "Slice of Life",
    description: "Everyday life and realistic stories",
    icon: "🏕️",
    color: "text-orange-500",
    isActive: true,
    order: 5,
  },
  {
    name: "Superhero",
    description: "Superhero and comic book style stories",
    icon: "🛡️",
    color: "text-blue-600",
    isActive: true,
    order: 6,
  },
  {
    name: "Sci-fi",
    description: "Science fiction and futuristic stories",
    icon: "🚀",
    color: "text-green-500",
    isActive: true,
    order: 7,
  },
  {
    name: "Thriller",
    description: "Suspenseful and exciting stories",
    icon: "😱",
    color: "text-red-500",
    isActive: true,
    order: 8,
  },
  {
    name: "Supernatural",
    description: "Ghosts, spirits, and supernatural elements",
    icon: "👻",
    color: "text-purple-600",
    isActive: true,
    order: 9,
  },
  {
    name: "Mystery",
    description: "Detective and puzzle-solving stories",
    icon: "🔍",
    color: "text-indigo-500",
    isActive: true,
    order: 10,
  },
  {
    name: "Sports",
    description: "Sports and athletic stories",
    icon: "🏀",
    color: "text-orange-600",
    isActive: true,
    order: 11,
  },
  {
    name: "Historical",
    description: "Historical and period stories",
    icon: "🏛️",
    color: "text-amber-600",
    isActive: true,
    order: 12,
  },
  {
    name: "Heart-warming",
    description: "Feel-good and heartwarming stories",
    icon: "💝",
    color: "text-pink-400",
    isActive: true,
    order: 13,
  },
  {
    name: "Horror",
    description: "Scary and horror stories",
    icon: "🏚️",
    color: "text-red-600",
    isActive: true,
    order: 14,
  },
  {
    name: "Children",
    description: "Stories suitable for children",
    icon: "👶",
    color: "text-green-400",
    isActive: true,
    order: 15,
  },
  {
    name: "Adventure",
    description: "Action-packed and adventurous stories",
    icon: "🗺️",
    color: "text-orange-500",
    isActive: true,
    order: 16,
  },
];

const mockStories = [
  {
    title: "The Lost Kingdom",
    alternativeTitles: ["Lost Kingdom", "Kingdom Quest"],
    coverImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    author: "John Doe",
    artist: "John Doe",
    genre: ["Fantasy", "Adventure"],
    category: "Fantasy",
    status: "Ongoing",
    publicationYear: "2024",
    description:
      "A young prince discovers a hidden kingdom and must navigate political intrigue while uncovering ancient secrets.",
    startingText:
      "The ancient scrolls spoke of a kingdom lost to time, hidden behind veils of magic and mystery...",
    tags: ["prince", "kingdom", "magic", "adventure"],
    isInteractive: true,
    readDirection: "Top to Bottom",
    totalViews: 15420,
    rating: 4.8,
    totalRatings: 342,
    followers: 892,
    bookmarks: 156,
    ratingDistribution: {
      5: 65,
      4: 25,
      3: 8,
      2: 1,
      1: 1,
    },
  },
  {
    title: "Love in the City",
    alternativeTitles: ["City Love", "Urban Romance"],
    coverImage:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=600&fit=crop",
    author: "Jane Smith",
    artist: "Jane Smith",
    genre: ["Romance", "Drama"],
    category: "Romance",
    status: "Completed",
    publicationYear: "2023",
    description:
      "Two strangers meet in a bustling city and find love in unexpected places.",
    startingText:
      "The rain poured down as Sarah hurried through the crowded streets of Manhattan...",
    tags: ["romance", "city", "love", "drama"],
    isInteractive: false,
    readDirection: "Top to Bottom",
    totalViews: 8920,
    rating: 4.5,
    totalRatings: 198,
    followers: 456,
    bookmarks: 89,
    ratingDistribution: {
      5: 55,
      4: 30,
      3: 12,
      2: 2,
      1: 1,
    },
  },
  {
    title: "Cyber Dreams",
    alternativeTitles: ["Digital Dreams", "Neo Tokyo"],
    coverImage:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
    author: "Mike Wilson",
    artist: "Mike Wilson",
    genre: ["Sci-fi", "Thriller"],
    category: "Sci-fi",
    status: "Ongoing",
    publicationYear: "2024",
    description:
      "In a dystopian future, a hacker discovers a conspiracy that could change the world.",
    startingText:
      "Neon lights flickered in the rain as Alex navigated through the digital labyrinth...",
    tags: ["cyberpunk", "hacker", "conspiracy", "future"],
    isInteractive: true,
    readDirection: "Top to Bottom",
    totalViews: 12350,
    rating: 4.7,
    totalRatings: 267,
    followers: 678,
    bookmarks: 134,
    ratingDistribution: {
      5: 60,
      4: 28,
      3: 10,
      2: 1,
      1: 1,
    },
  },
  {
    title: "The Detective's Case",
    alternativeTitles: ["Mystery Files", "Private Eye"],
    coverImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    author: "John Doe",
    artist: "John Doe",
    genre: ["Mystery", "Thriller"],
    category: "Mystery",
    status: "Completed",
    publicationYear: "2023",
    description:
      "A brilliant detective solves complex cases while dealing with personal demons.",
    startingText:
      "The crime scene was meticulously arranged, every detail telling a story...",
    tags: ["detective", "mystery", "crime", "investigation"],
    isInteractive: false,
    readDirection: "Top to Bottom",
    totalViews: 9870,
    rating: 4.6,
    totalRatings: 223,
    followers: 534,
    bookmarks: 112,
    ratingDistribution: {
      5: 58,
      4: 27,
      3: 12,
      2: 2,
      1: 1,
    },
  },
  {
    title: "Comedy Central",
    alternativeTitles: ["Funny Business", "Laugh Factory"],
    coverImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    author: "Jane Smith",
    artist: "Jane Smith",
    genre: ["Comedy", "Slice of Life"],
    category: "Comedy",
    status: "Ongoing",
    publicationYear: "2024",
    description:
      "A group of friends navigate life's absurdities with humor and heart.",
    startingText:
      "Life has a way of throwing curveballs, but sometimes the best response is to laugh...",
    tags: ["comedy", "friends", "humor", "life"],
    isInteractive: true,
    readDirection: "Top to Bottom",
    totalViews: 7560,
    rating: 4.3,
    totalRatings: 145,
    followers: 345,
    bookmarks: 67,
    ratingDistribution: {
      5: 50,
      4: 35,
      3: 12,
      2: 2,
      1: 1,
    },
  },
  {
    title: "The Guardian",
    alternativeTitles: ["Hero's Journey", "Power Within"],
    coverImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    author: "John Doe",
    artist: "John Doe",
    genre: ["Superhero", "Adventure"],
    category: "Superhero",
    status: "Ongoing",
    publicationYear: "2024",
    description:
      "A young man discovers he has extraordinary powers and must learn to use them responsibly.",
    startingText:
      "The accident changed everything. One moment I was just a regular college student...",
    tags: ["superhero", "powers", "responsibility", "adventure"],
    isInteractive: true,
    readDirection: "Top to Bottom",
    totalViews: 8900,
    rating: 4.4,
    totalRatings: 178,
    followers: 423,
    bookmarks: 89,
    ratingDistribution: {
      5: 52,
      4: 32,
      3: 13,
      2: 2,
      1: 1,
    },
  },
  {
    title: "Daily Life",
    alternativeTitles: ["Ordinary Days", "Life's Moments"],
    coverImage:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
    author: "Jane Smith",
    artist: "Jane Smith",
    genre: ["Slice of Life", "Drama"],
    category: "Slice of Life",
    status: "Ongoing",
    publicationYear: "2024",
    description:
      "A collection of everyday moments that make life beautiful and meaningful.",
    startingText:
      "Sometimes the most extraordinary stories happen in the most ordinary places...",
    tags: ["slice of life", "everyday", "moments", "realistic"],
    isInteractive: false,
    readDirection: "Top to Bottom",
    totalViews: 6540,
    rating: 4.2,
    totalRatings: 134,
    followers: 298,
    bookmarks: 56,
    ratingDistribution: {
      5: 48,
      4: 36,
      3: 13,
      2: 2,
      1: 1,
    },
  },
  {
    title: "The Haunted Manor",
    alternativeTitles: ["Ghost Stories", "Spirit World"],
    coverImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    author: "Mike Wilson",
    artist: "Mike Wilson",
    genre: ["Supernatural", "Mystery"],
    category: "Supernatural",
    status: "Ongoing",
    publicationYear: "2024",
    description:
      "A family moves into an old manor only to discover it's inhabited by friendly spirits.",
    startingText:
      "The manor had stood empty for decades, its windows like hollow eyes watching the world...",
    tags: ["supernatural", "ghosts", "family", "mystery"],
    isInteractive: true,
    readDirection: "Top to Bottom",
    totalViews: 11200,
    rating: 4.6,
    totalRatings: 245,
    followers: 567,
    bookmarks: 123,
    ratingDistribution: {
      5: 58,
      4: 28,
      3: 11,
      2: 2,
      1: 1,
    },
  },
];

const mockChapters = [
  {
    title: "Chapter 1: The Beginning",
    content:
      "This is the beginning of our story. The protagonist finds themselves in an unfamiliar world...",
    chapterNumber: 1,
    views: 1200,
    comments: 45,
    branches: [
      {
        text: "The protagonist chooses to explore the mysterious forest.",
        votes: 25,
        author: "user1",
      },
      {
        text: "The protagonist decides to stay in the village and gather information.",
        votes: 18,
        author: "user2",
      },
    ],
  },
  {
    title: "Chapter 2: The Journey Begins",
    content: "With the decision made, our hero embarks on their journey...",
    chapterNumber: 2,
    views: 980,
    comments: 32,
    branches: [
      {
        text: "The protagonist takes the high road through the mountains.",
        votes: 22,
        author: "user3",
      },
      {
        text: "The protagonist follows the river downstream.",
        votes: 15,
        author: "user4",
      },
    ],
  },
];

const mockReviews = [
  {
    rating: 5,
    text: "Absolutely amazing! The story is captivating and the characters are well-developed. I can't wait to see what happens next!",
    status: "Following",
  },
  {
    rating: 4,
    text: "Great story with interesting plot twists. The writing style is engaging and keeps me hooked. Looking forward to more chapters!",
    status: "Reading",
  },
  {
    rating: 5,
    text: "This is one of the best stories I've read in a while. The world-building is incredible and the pacing is perfect.",
    status: "Following",
  },
  {
    rating: 4,
    text: "Really enjoying this story so far. The characters feel real and the plot is intriguing. Can't wait for the next update!",
    status: "Reading",
  },
  {
    rating: 3,
    text: "It's a decent story with some good moments. The pacing could be a bit better, but overall it's worth reading.",
    status: "Reading",
  },
  {
    rating: 5,
    text: "Fantastic storytelling! The author has created a compelling narrative that keeps me coming back for more.",
    status: "Following",
  },
  {
    rating: 4,
    text: "I'm really enjoying this story. The plot is well thought out and the characters are relatable. Great work!",
    status: "Reading",
  },
  {
    rating: 5,
    text: "This story exceeded my expectations! The writing is beautiful and the story is so engaging. Highly recommended!",
    status: "Following",
  },
];

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/plottwist"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

// Clear existing data
async function clearData() {
  try {
    await User.deleteMany({});
    await Story.deleteMany({});
    await Chapter.deleteMany({});
    await Category.deleteMany({});
    await Review.deleteMany({});
    console.log("Cleared existing data");
  } catch (error) {
    console.error("Error clearing data:", error);
  }
}

// Seed users
async function seedUsers() {
  try {
    const hashedUsers = await Promise.all(
      mockUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 12),
      }))
    );

    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`Seeded ${createdUsers.length} users`);
    return createdUsers;
  } catch (error) {
    console.error("Error seeding users:", error);
    return [];
  }
}

// Seed categories
async function seedCategories() {
  try {
    const createdCategories = await Category.insertMany(mockCategories);
    console.log(`Seeded ${createdCategories.length} categories`);
    return createdCategories;
  } catch (error) {
    console.error("Error seeding categories:", error);
    return [];
  }
}

// Seed stories
async function seedStories(users) {
  try {
    const storiesWithAuthors = mockStories.map((story, index) => {
      const user = users[index % users.length];
      return {
        title: story.title,
        alternativeTitles: story.alternativeTitles,
        coverImage: story.coverImage,
        author: user._id, // Use ObjectId instead of string
        artist: story.artist,
        genre: story.genre,
        category: story.category,
        status: story.status,
        publicationYear: story.publicationYear,
        description: story.description,
        startingText: story.startingText,
        tags: story.tags,
        isInteractive: story.isInteractive,
        readDirection: story.readDirection,
        stats: {
          totalViews: story.totalViews,
          followers: story.followers,
          rating: story.rating,
          totalRatings: story.totalRatings,
          totalChapters: 0,
          totalComments: 0,
        },
        ratingDistribution: story.ratingDistribution,
        followers: [], // Empty array of ObjectIds
        bookmarks: [], // Empty array of ObjectIds
      };
    });

    const createdStories = await Story.insertMany(storiesWithAuthors);
    console.log(`Seeded ${createdStories.length} stories`);
    return createdStories;
  } catch (error) {
    console.error("Error seeding stories:", error);
    return [];
  }
}

// Seed chapters
async function seedChapters(stories, users) {
  try {
    const chaptersWithStories = [];

    stories.forEach((story, storyIndex) => {
      mockChapters.forEach((chapter, chapterIndex) => {
        // Fix branches to use proper ObjectIds for authors
        const fixedBranches = chapter.branches.map((branch, branchIndex) => ({
          text: branch.text,
          votes: branch.votes,
          author: users[branchIndex % users.length]._id, // Use actual user ObjectId
          voters: [], // Empty array of ObjectIds
        }));

        chaptersWithStories.push({
          title: chapter.title,
          content: chapter.content,
          chapterNumber: chapterIndex + 1,
          story: story._id, // Use 'story' field, not 'storyId'
          branches: fixedBranches,
          stats: {
            views: chapter.views,
            comments: chapter.comments,
            votes: 0,
          },
        });
      });
    });

    const createdChapters = await Chapter.insertMany(chaptersWithStories);
    console.log(`Seeded ${createdChapters.length} chapters`);
    return createdChapters;
  } catch (error) {
    console.error("Error seeding chapters:", error);
    return [];
  }
}

// Seed reviews
async function seedReviews(stories, users) {
  try {
    const reviewsWithStories = [];

    stories.forEach((story, storyIndex) => {
      // Add reviews per story, but ensure each user only reviews each story once
      const numReviews = Math.min(
        users.length,
        Math.floor(Math.random() * 3) + 3
      ); // 3-5 reviews, but not more than users

      // Create a shuffled array of user indices to ensure random user selection
      const userIndices = Array.from({ length: users.length }, (_, i) => i);
      for (let i = userIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [userIndices[i], userIndices[j]] = [userIndices[j], userIndices[i]];
      }

      for (let i = 0; i < numReviews; i++) {
        const review = mockReviews[i % mockReviews.length];
        const userIndex = userIndices[i];
        const user = users[userIndex];

        reviewsWithStories.push({
          story: story._id,
          user: user._id,
          rating: review.rating,
          text: review.text,
          status: review.status,
          upvotes: Math.floor(Math.random() * 20), // Random upvotes 0-19
          downvotes: Math.floor(Math.random() * 5), // Random downvotes 0-4
          voters: [], // Empty array of ObjectIds
        });
      }
    });

    const createdReviews = await Review.insertMany(reviewsWithStories);
    console.log(`Seeded ${createdReviews.length} reviews`);

    // Update story ratings based on reviews
    await updateStoryRatings(stories, createdReviews);

    return createdReviews;
  } catch (error) {
    console.error("Error seeding reviews:", error);
    return [];
  }
}

// Update story ratings based on reviews
async function updateStoryRatings(stories, reviews) {
  try {
    for (const story of stories) {
      const storyReviews = reviews.filter(
        (review) => review.story.toString() === story._id.toString()
      );

      if (storyReviews.length > 0) {
        const totalRating = storyReviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        const averageRating = totalRating / storyReviews.length;

        // Calculate rating distribution
        const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        storyReviews.forEach((review) => {
          ratingDistribution[review.rating]++;
        });

        // Convert to percentages
        const totalReviews = storyReviews.length;
        Object.keys(ratingDistribution).forEach((rating) => {
          ratingDistribution[rating] = Math.round(
            (ratingDistribution[rating] / totalReviews) * 100
          );
        });

        // Update story with new rating data
        await Story.findByIdAndUpdate(story._id, {
          "stats.rating": Math.round(averageRating * 10) / 10, // Round to 1 decimal place
          "stats.totalRatings": totalReviews,
          ratingDistribution: ratingDistribution,
        });
      }
    }

    console.log("Updated story ratings based on reviews");
  } catch (error) {
    console.error("Error updating story ratings:", error);
  }
}

// Main seeding function
async function seedDatabase() {
  try {
    await connectDB();
    await clearData();

    const users = await seedUsers();
    const categories = await seedCategories();
    const stories = await seedStories(users);
    const chapters = await seedChapters(stories, users);
    const reviews = await seedReviews(stories, users);

    console.log("Database seeded successfully!");
    console.log(
      `Created: ${users.length} users, ${categories.length} categories, ${stories.length} stories, ${chapters.length} chapters, ${reviews.length} reviews`
    );

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

// Run the seeding
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
