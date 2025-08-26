// Import all story images
import StoryThumbnail1 from "../assets/StoryThumbnail1.jpg";
import StoryThumbnail2 from "../assets/StoryThumbnail2.jpg";
import StoryThumbnail3 from "../assets/StoryThumbnail3.jpg";
import first from "../assets/ContinueReading/1.jpg";
import second from "../assets/ContinueReading/2.jpg";
import third from "../assets/ContinueReading/3.jpg";
import fourth from "../assets/ContinueReading/4.jpg";
import fifth from "../assets/ContinueReading/5.jpg";
import sixth from "../assets/TopPicksForYou/1.jpg";
import seventh from "../assets/TopPicksForYou/2.jpg";
import eighth from "../assets/TopPicksForYou/3.jpg";
import ninth from "../assets/TopPicksForYou/4.jpg";
import tenth from "../assets/TopPicksForYou/5.jpg";
import eleventh from "../assets/TopPicksForYou/6.jpg";

import {
  FaHeart,
  FaDragon,
  FaTheaterMasks,
  FaLaugh,
  FaShieldAlt,
  FaRobot,
  FaEye,
  FaSearch,
  FaBasketballBall,
  FaLandmark,
  FaHandHoldingHeart,
  FaChild,
} from "react-icons/fa";

import { GiCampfire, GiGhost, GiSpookyHouse } from "react-icons/gi";

export const categories = [
  { id: 1, name: "Romance", icon: FaHeart, color: "text-white" },
  { id: 2, name: "Fantasy", icon: FaDragon, color: "text-white" },
  { id: 3, name: "Drama", icon: FaTheaterMasks, color: "text-white" },
  { id: 4, name: "Comedy", icon: FaLaugh, color: "text-white" },
  { id: 5, name: "Slice of Life", icon: GiCampfire, color: "text-white" },
  { id: 6, name: "Superhero", icon: FaShieldAlt, color: "text-white" },
  { id: 7, name: "Sci-fi", icon: FaRobot, color: "text-white" },
  { id: 8, name: "Thriller", icon: FaEye, color: "text-white" },
  { id: 9, name: "Supernatural", icon: GiGhost, color: "text-white" },
  { id: 10, name: "Mystery", icon: FaSearch, color: "text-white" },
  { id: 11, name: "Sports", icon: FaBasketballBall, color: "text-white" },
  { id: 12, name: "Historical", icon: FaLandmark, color: "text-white" },
  {
    id: 13,
    name: "Heart-warming",
    icon: FaHandHoldingHeart,
    color: "text-white",
  },
  { id: 14, name: "Horror", icon: GiSpookyHouse, color: "text-white" },
  { id: 15, name: "Children", icon: FaChild, color: "text-white" },
];
export const allStories = [
  {
    id: "1",
    title: "The Forgotten Gate",
    alternativeTitles: [
      "The Gate of Memories",
      "Beyond the Threshold",
      "The Lost Portal",
    ],
    coverImage: StoryThumbnail1,
    author: "Sarah Chen",
    artist: "Marcus Rodriguez",
    genre: ["Fantasy", "Adventure", "Mystery", "Interactive"],
    status: "Ongoing",
    publicationYear: "2023",
    totalViews: "185.4K",
    followers: "3.8K",
    rating: 4.5,
    totalRatings: 119,
    ranking: 1,
    category: "Fantasy",
    startingText:
      "On the edge of the silent woods, a shimmering gate appeared overnight. No one knew who built it, or where it led… until you stepped closer.",
    description:
      "On the edge of the silent woods, a shimmering gate appeared overnight. No one knew who built it, or where it led… until you stepped closer. As the protagonist, you must navigate through mysterious realms, uncover ancient secrets, and make choices that will determine the fate of multiple worlds.",
    chapters: [
      {
        id: 1,
        title: "Chapter 1: The Discovery",
        views: "7.3K+27.9K",
        comments: 101,
        date: "1193 days ago",
      },
      {
        id: 2,
        title: "Chapter 2: First Steps",
        views: "5.4K+18K",
        comments: 31,
        date: "1192 days ago",
      },
      {
        id: 3,
        title: "Chapter 3: The Guardian",
        views: "5.6K+18.9K",
        comments: 59,
        date: "1191 days ago",
      },
      {
        id: 4,
        title: "Chapter 4: The Choice",
        views: "5.2K+17.1K",
        comments: 40,
        date: "1190 days ago",
      },
      {
        id: 5,
        title: "Chapter 5: Consequences",
        views: "4.2K+14.4K",
        comments: 22,
        date: "1189 days ago",
      },
      {
        id: 6,
        title: "Chapter 6: New Allies",
        views: "4.3K+14.4K",
        comments: 45,
        date: "1188 days ago",
      },
      {
        id: 7,
        title: "Chapter 7: The Truth",
        views: "5.2K+17.3K",
        comments: 105,
        date: "1187 days ago",
      },
      {
        id: 8,
        title: "Chapter 8: The Final Decision",
        views: "4.9K+19.6K",
        comments: 89,
        date: "1186 days ago",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "Astralla",
        avatar: "👩",
        rating: 5,
        status: "Following",
        text: "Oh my! This is absolutely amazing. The interactive elements are so well done and the story is captivating. I've been following this for months and it keeps getting better!",
        upvotes: 62,
        date: "1191 days ago",
      },
      {
        id: 2,
        user: "fullshiguro",
        avatar: "👨",
        rating: 4,
        status: "Reading",
        text: "Great concept and execution. The branching storylines are well thought out. Sometimes the choices feel a bit limited, but overall very enjoyable.",
        upvotes: 38,
        date: "1189 days ago",
      },
      {
        id: 3,
        user: "StoryWeaver",
        avatar: "👩",
        rating: 5,
        status: "Following",
        text: "The world-building is incredible! Each choice feels meaningful and the consequences are well-developed. Can't wait for the next chapter!",
        upvotes: 45,
        date: "1187 days ago",
      },
    ],
    ratingDistribution: {
      5: 63.9,
      4: 26.9,
      3: 7.6,
      2: 0.8,
      1: 0.8,
    },
  },
  {
    id: "2",
    title: "Shadows Over the Kingdom",
    alternativeTitles: ["Kingdom's Shadow", "The Dark Crown", "Royal Secrets"],
    coverImage: StoryThumbnail2,
    author: "Michael Torres",
    artist: "Elena Vasquez",
    genre: ["Fantasy", "Drama", "Historical", "Mystery"],
    status: "Ongoing",
    publicationYear: "2023",
    totalViews: "142.7K",
    followers: "2.9K",
    rating: 4.3,
    totalRatings: 87,
    ranking: 2,
    category: "Fantasy",
    startingText:
      "The kingdom celebrated peace for a hundred years—until a shadow returned to the castle walls, whispering of old betrayals.",
    description:
      "The kingdom celebrated peace for a hundred years—until a shadow returned to the castle walls, whispering of old betrayals. As the royal advisor, you must navigate court politics, uncover ancient secrets, and protect the kingdom from threats both within and without.",
    chapters: [
      {
        id: 1,
        title: "Chapter 1: The Return",
        views: "6.1K+22.3K",
        comments: 78,
        date: "1156 days ago",
      },
      {
        id: 2,
        title: "Chapter 2: Court Politics",
        views: "5.8K+19.7K",
        comments: 45,
        date: "1155 days ago",
      },
      {
        id: 3,
        title: "Chapter 3: The Shadow",
        views: "5.3K+18.2K",
        comments: 67,
        date: "1154 days ago",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "KingdomFan",
        avatar: "👨",
        rating: 4,
        status: "Following",
        text: "Excellent world-building and political intrigue. The choices really matter in this story!",
        upvotes: 34,
        date: "1150 days ago",
      },
    ],
    ratingDistribution: {
      5: 58.2,
      4: 31.8,
      3: 8.2,
      2: 1.2,
      1: 0.6,
    },
  },
  {
    id: "3",
    title: "The Vanishing Hour",
    alternativeTitles: ["2:13 AM", "The Frozen Moment", "Time Stands Still"],
    coverImage: StoryThumbnail3,
    author: "Jessica Park",
    artist: "David Kim",
    genre: ["Mystery", "Thriller", "Supernatural", "Horror"],
    status: "Ongoing",
    publicationYear: "2023",
    totalViews: "98.3K",
    followers: "2.1K",
    rating: 4.7,
    totalRatings: 156,
    ranking: 3,
    category: "Mystery",
    startingText:
      "At exactly 2:13 a.m., the town clock stopped—and so did the people. Only you remained awake.",
    description:
      "At exactly 2:13 a.m., the town clock stopped—and so did the people. Only you remained awake. You have one hour to solve the mystery before time resumes and the consequences become permanent.",
    chapters: [
      {
        id: 1,
        title: "Chapter 1: The Stop",
        views: "8.2K+31.5K",
        comments: 134,
        date: "1123 days ago",
      },
      {
        id: 2,
        title: "Chapter 2: The Investigation",
        views: "7.1K+26.8K",
        comments: 89,
        date: "1122 days ago",
      },
      {
        id: 3,
        title: "Chapter 3: The Truth",
        views: "6.9K+25.1K",
        comments: 112,
        date: "1121 days ago",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "MysteryLover",
        avatar: "👩",
        rating: 5,
        status: "Following",
        text: "Absolutely terrifying and brilliant! The time pressure makes every choice feel urgent.",
        upvotes: 89,
        date: "1118 days ago",
      },
    ],
    ratingDistribution: {
      5: 72.1,
      4: 22.3,
      3: 4.1,
      2: 1.0,
      1: 0.5,
    },
  },
  {
    id: "4",
    title: "Summer Nights",
    coverImage: first,
    author: "Lisa Wang",
    artist: "Carlos Mendez",
    genre: ["Slice of Life", "Romance", "Drama"],
    status: "Ongoing",
    publicationYear: "2023",
    totalViews: "76.2K",
    followers: "1.8K",
    rating: 4.2,
    totalRatings: 94,
    category: "Slice of Life",
    startingText:
      "A summer romance that changes everything. Will you choose love or your dreams?",
    description:
      "A summer romance that changes everything. Will you choose love or your dreams? Experience the warmth of summer nights and the difficult choices that come with growing up.",
    chapters: [
      {
        id: 1,
        title: "Chapter 1: First Meeting",
        views: "5.2K+18.9K",
        comments: 67,
        date: "1089 days ago",
      },
      {
        id: 2,
        title: "Chapter 2: Growing Closer",
        views: "4.8K+16.7K",
        comments: 45,
        date: "1088 days ago",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "SummerDreamer",
        avatar: "👩",
        rating: 4,
        status: "Reading",
        text: "Beautiful and nostalgic. Reminds me of my own summer romance!",
        upvotes: 23,
        date: "1085 days ago",
      },
    ],
    ratingDistribution: {
      5: 45.2,
      4: 38.7,
      3: 12.1,
      2: 2.8,
      1: 1.2,
    },
  },
  {
    id: "5",
    title: "The Lantern Keeper",
    coverImage: second,
    author: "Hiroshi Tanaka",
    artist: "Yuki Sato",
    genre: ["Supernatural", "Mystery", "Drama"],
    status: "Ongoing",
    publicationYear: "2023",
    totalViews: "89.4K",
    followers: "2.3K",
    rating: 4.6,
    totalRatings: 127,
    category: "Supernatural",
    startingText:
      "You inherit an old lantern shop and discover that each lantern holds a different story.",
    description:
      "You inherit an old lantern shop and discover that each lantern holds a different story. As the new lantern keeper, you must help lost souls find their way while uncovering the mysteries of your own past.",
    chapters: [
      {
        id: 1,
        title: "Chapter 1: The Inheritance",
        views: "6.7K+24.1K",
        comments: 89,
        date: "1056 days ago",
      },
      {
        id: 2,
        title: "Chapter 2: The First Lantern",
        views: "6.2K+21.8K",
        comments: 67,
        date: "1055 days ago",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "GhostHunter",
        avatar: "👨",
        rating: 5,
        status: "Following",
        text: "Hauntingly beautiful. The supernatural elements are perfectly balanced with human emotion.",
        upvotes: 56,
        date: "1052 days ago",
      },
    ],
    ratingDistribution: {
      5: 68.9,
      4: 25.2,
      3: 4.5,
      2: 1.0,
      1: 0.4,
    },
  },
  {
    id: "6",
    title: "Beyond the Court",
    coverImage: third,
    author: "Marcus Johnson",
    artist: "Sarah Lee",
    genre: ["Sports", "Drama", "Slice of Life"],
    status: "Ongoing",
    publicationYear: "2023",
    totalViews: "67.8K",
    followers: "1.6K",
    rating: 4.1,
    totalRatings: 78,
    category: "Sports",
    startingText:
      "A basketball prodigy must choose between family expectations and following their dreams.",
    description:
      "A basketball prodigy must choose between family expectations and following their dreams. Navigate the pressures of high school sports, family dynamics, and personal growth.",
    chapters: [
      {
        id: 1,
        title: "Chapter 1: The Tryout",
        views: "4.9K+17.3K",
        comments: 56,
        date: "1023 days ago",
      },
      {
        id: 2,
        title: "Chapter 2: The Team",
        views: "4.5K+15.9K",
        comments: 43,
        date: "1022 days ago",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "SportsFan",
        avatar: "👨",
        rating: 4,
        status: "Reading",
        text: "Great representation of sports culture and family dynamics. Very relatable!",
        upvotes: 34,
        date: "1019 days ago",
      },
    ],
    ratingDistribution: {
      5: 42.3,
      4: 41.2,
      3: 13.8,
      2: 2.1,
      1: 0.6,
    },
  },
  {
    id: "7",
    title: "Empire's Fall",
    coverImage: fourth,
    author: "Isabella Rodriguez",
    artist: "Ahmed Hassan",
    genre: ["Historical", "Drama", "Romance"],
    status: "Ongoing",
    publicationYear: "2023",
    totalViews: "94.1K",
    followers: "2.4K",
    rating: 4.4,
    totalRatings: 113,
    category: "Historical",
    startingText:
      "In the dying days of the Roman Empire, a young noble must navigate politics and love.",
    description:
      "In the dying days of the Roman Empire, a young noble must navigate politics and love. Experience the grandeur and danger of ancient Rome through the eyes of someone trying to save what they love.",
    chapters: [
      {
        id: 1,
        title: "Chapter 1: The Senate",
        views: "7.1K+25.6K",
        comments: 78,
        date: "990 days ago",
      },
      {
        id: 2,
        title: "Chapter 2: The Conspiracy",
        views: "6.8K+23.4K",
        comments: 65,
        date: "989 days ago",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "HistoryBuff",
        avatar: "👩",
        rating: 4,
        status: "Following",
        text: "Excellent historical accuracy combined with compelling storytelling. Love the political intrigue!",
        upvotes: 45,
        date: "986 days ago",
      },
    ],
    ratingDistribution: {
      5: 52.1,
      4: 35.8,
      3: 9.7,
      2: 1.8,
      1: 0.6,
    },
  },
  {
    id: "8",
    title: "The Forgotten Asylum",
    coverImage: fifth,
    author: "Thomas Blackwood",
    artist: "Emma Chen",
    genre: ["Horror", "Mystery", "Thriller"],
    status: "Ongoing",
    publicationYear: "2023",
    totalViews: "112.6K",
    followers: "2.8K",
    rating: 4.8,
    totalRatings: 189,
    category: "Horror",
    startingText:
      "You wake up in an abandoned asylum with no memory of how you got there.",
    description:
      "You wake up in an abandoned asylum with no memory of how you got there. As you explore the dark corridors, you uncover the asylum's horrifying past and must escape before it's too late.",
    chapters: [
      {
        id: 1,
        title: "Chapter 1: Awakening",
        views: "8.9K+32.1K",
        comments: 134,
        date: "957 days ago",
      },
      {
        id: 2,
        title: "Chapter 2: The Corridors",
        views: "8.3K+29.7K",
        comments: 112,
        date: "956 days ago",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "HorrorFan",
        avatar: "👨",
        rating: 5,
        status: "Following",
        text: "Absolutely terrifying! The atmosphere is perfect and the choices are genuinely scary.",
        upvotes: 78,
        date: "953 days ago",
      },
    ],
    ratingDistribution: {
      5: 75.3,
      4: 20.1,
      3: 3.8,
      2: 0.6,
      1: 0.2,
    },
  },
  {
    id: "9",
    title: "The House on Black Hill",
    coverImage: sixth,
    author: "Victoria Night",
    artist: "James Dark",
    genre: ["Horror", "Mystery", "Supernatural"],
    status: "Ongoing",
    publicationYear: "2023",
    totalViews: "134.2K",
    followers: "3.2K",
    rating: 4.7,
    totalRatings: 203,
    category: "Horror",
    startingText:
      "A family moves into a house with a dark history, and you must uncover its secrets.",
    description:
      "A family moves into a house with a dark history, and you must uncover its secrets. Every choice affects the family's fate as you explore the house's mysterious past.",
    chapters: [
      {
        id: 1,
        title: "Chapter 1: Moving In",
        views: "9.8K+35.2K",
        comments: 156,
        date: "924 days ago",
      },
      {
        id: 2,
        title: "Chapter 2: The Basement",
        views: "9.2K+32.8K",
        comments: 134,
        date: "923 days ago",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "SpookyReader",
        avatar: "👩",
        rating: 5,
        status: "Following",
        text: "Chilling and atmospheric. The house feels like a character itself!",
        upvotes: 92,
        date: "920 days ago",
      },
    ],
    ratingDistribution: {
      5: 71.8,
      4: 23.5,
      3: 3.9,
      2: 0.6,
      1: 0.2,
    },
  },
  {
    id: "10",
    title: "The Misadventures of Milo",
    coverImage: seventh,
    author: "Alex Rivera",
    artist: "Maya Patel",
    genre: ["Comedy", "Adventure", "Slice of Life"],
    status: "Ongoing",
    publicationYear: "2023",
    totalViews: "87.3K",
    followers: "2.1K",
    rating: 4.3,
    totalRatings: 145,
    category: "Comedy",
    startingText:
      "A clumsy wizard's apprentice gets into hilarious trouble while learning magic.",
    description:
      "A clumsy wizard's apprentice gets into hilarious trouble while learning magic. Every spell casting attempt leads to unexpected and often comical results.",
    chapters: [
      {
        id: 1,
        title: "Chapter 1: The Apprentice",
        views: "6.4K+23.1K",
        comments: 89,
        date: "891 days ago",
      },
      {
        id: 2,
        title: "Chapter 2: The First Spell",
        views: "6.1K+21.7K",
        comments: 76,
        date: "890 days ago",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "ComedyLover",
        avatar: "👨",
        rating: 4,
        status: "Following",
        text: "Hilarious! Milo's misadventures never fail to make me laugh.",
        upvotes: 67,
        date: "887 days ago",
      },
    ],
    ratingDistribution: {
      5: 48.9,
      4: 38.2,
      3: 10.1,
      2: 2.1,
      1: 0.7,
    },
  },
  {
    id: "11",
    title: "Beneath the Broken Sky",
    coverImage: eighth,
    author: "Sophie Williams",
    artist: "Lucas Brown",
    genre: ["Drama", "Romance", "Slice of Life"],
    status: "Ongoing",
    publicationYear: "2023",
    totalViews: "73.5K",
    followers: "1.9K",
    rating: 4.5,
    totalRatings: 167,
    category: "Drama",
    startingText:
      "Two broken souls find healing and love in a world that seems determined to tear them apart.",
    description:
      "Two broken souls find healing and love in a world that seems determined to tear them apart. A touching story about healing, forgiveness, and the power of human connection.",
    chapters: [
      {
        id: 1,
        title: "Chapter 1: The Meeting",
        views: "5.8K+20.4K",
        comments: 78,
        date: "858 days ago",
      },
      {
        id: 2,
        title: "Chapter 2: The Healing",
        views: "5.5K+19.1K",
        comments: 65,
        date: "857 days ago",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "HeartHealer",
        avatar: "👩",
        rating: 5,
        status: "Following",
        text: "Beautiful and touching. This story helped me through a difficult time.",
        upvotes: 89,
        date: "854 days ago",
      },
    ],
    ratingDistribution: {
      5: 62.4,
      4: 29.8,
      3: 6.2,
      2: 1.2,
      1: 0.4,
    },
  },
  {
    id: "12",
    title: "The Little Cloud Who Could",
    coverImage: ninth,
    author: "Emma Thompson",
    artist: "David Wilson",
    genre: ["Children", "Adventure", "Heart-warming"],
    status: "Ongoing",
    publicationYear: "2023",
    totalViews: "45.2K",
    followers: "1.2K",
    rating: 4.9,
    totalRatings: 234,
    category: "Children",
    startingText:
      "A small cloud learns that even the smallest beings can make a big difference.",
    description:
      "A small cloud learns that even the smallest beings can make a big difference. A heartwarming tale about self-confidence, friendship, and the power of believing in yourself.",
    chapters: [
      {
        id: 1,
        title: "Chapter 1: The Little Cloud",
        views: "4.2K+15.8K",
        comments: 45,
        date: "825 days ago",
      },
      {
        id: 2,
        title: "Chapter 2: The Journey",
        views: "4.0K+14.6K",
        comments: 38,
        date: "824 days ago",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "CloudWatcher",
        avatar: "👩",
        rating: 5,
        status: "Following",
        text: "Perfect for children and adults alike. Such a beautiful message!",
        upvotes: 156,
        date: "821 days ago",
      },
    ],
    ratingDistribution: {
      5: 89.2,
      4: 9.1,
      3: 1.3,
      2: 0.3,
      1: 0.1,
    },
  },
  {
    id: "13",
    title: "Sailing Beyond the Horizon",
    coverImage: tenth,
    author: "Captain Maria Santos",
    artist: "Jake Anderson",
    genre: ["Adventure", "Fantasy", "Romance"],
    status: "Ongoing",
    publicationYear: "2023",
    totalViews: "68.9K",
    followers: "1.7K",
    rating: 4.2,
    totalRatings: 123,
    category: "Adventure",
    startingText:
      "A young sailor discovers a map to a legendary island that holds the secret to eternal youth.",
    description:
      "A young sailor discovers a map to a legendary island that holds the secret to eternal youth. Navigate treacherous waters, face mythical creatures, and make choices that will determine the fate of your crew.",
    chapters: [
      {
        id: 1,
        title: "Chapter 1: The Map",
        views: "5.3K+18.9K",
        comments: 67,
        date: "792 days ago",
      },
      {
        id: 2,
        title: "Chapter 2: Setting Sail",
        views: "5.0K+17.4K",
        comments: 54,
        date: "791 days ago",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "SeaAdventurer",
        avatar: "👨",
        rating: 4,
        status: "Reading",
        text: "Great adventure story with beautiful world-building. Love the nautical themes!",
        upvotes: 45,
        date: "788 days ago",
      },
    ],
    ratingDistribution: {
      5: 46.8,
      4: 39.2,
      3: 11.3,
      2: 2.1,
      1: 0.6,
    },
  },
  {
    id: "14",
    title: "When Petals Fall",
    coverImage: eleventh,
    author: "Yuki Tanaka",
    artist: "Sakura Kim",
    genre: ["Romance", "Drama", "Slice of Life"],
    status: "Ongoing",
    publicationYear: "2023",
    totalViews: "92.7K",
    followers: "2.3K",
    rating: 4.6,
    totalRatings: 178,
    category: "Romance",
    startingText:
      "A cherry blossom season brings two people together in ways they never expected.",
    description:
      "A cherry blossom season brings two people together in ways they never expected. Experience the beauty of spring and the delicate nature of love in this touching romance.",
    chapters: [
      {
        id: 1,
        title: "Chapter 1: Cherry Blossoms",
        views: "7.2K+25.8K",
        comments: 98,
        date: "759 days ago",
      },
      {
        id: 2,
        title: "Chapter 2: The Meeting",
        views: "6.8K+23.9K",
        comments: 87,
        date: "758 days ago",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "RomanceReader",
        avatar: "👩",
        rating: 5,
        status: "Following",
        text: "Absolutely beautiful! The cherry blossom imagery is stunning and the romance is perfect.",
        upvotes: 78,
        date: "755 days ago",
      },
    ],
    ratingDistribution: {
      5: 65.7,
      4: 27.8,
      3: 5.2,
      2: 1.0,
      1: 0.3,
    },
  },
];
export const users = [
  {
    id: 1,
    username: "Aimen Munawar",
    displayName: "Amy Munawar",
    email: "amy.munawar@example.com",
    avatar: "👩",
    gender: "Female",
    location: "Islamabad, Pakistan",
    birthday: "16/04/2005",
    joinDate: "August 14, 2025",
    favoriteGenres: ["Romance", "Superhero", "Comedy"],
    stats: {
      storiesWritten: 4,
      storiesRead: 10,
      followers: 5,
      points: 1000,
    },
    readingProgress: {
      1: { currentChapter: 3, completed: false },
      4: { currentChapter: 1, completed: false },
      5: { currentChapter: 2, completed: false },
      6: { currentChapter: 1, completed: false },
      7: { currentChapter: 1, completed: false },
      8: { currentChapter: 1, completed: false },
    },
  },
  {
    id: 2,
    username: "Astralla",
    displayName: "Astralla",
    email: "astralla@example.com",
    avatar: "👩",
    gender: "Female",
    location: "New York, USA",
    birthday: "22/07/1998",
    joinDate: "March 10, 2023",
    favoriteGenres: ["Fantasy", "Romance", "Adventure"],
    stats: {
      storiesWritten: 2,
      storiesRead: 15,
      followers: 12,
      points: 2500,
    },
  },
  {
    id: 3,
    username: "fullshiguro",
    displayName: "Full Shiguro",
    email: "fullshiguro@example.com",
    avatar: "👨",
    gender: "Male",
    location: "Tokyo, Japan",
    birthday: "15/11/1995",
    joinDate: "January 5, 2023",
    favoriteGenres: ["Mystery", "Thriller", "Horror"],
    stats: {
      storiesWritten: 1,
      storiesRead: 8,
      followers: 3,
      points: 800,
    },
  },
];
export const leaderboardData = [
  {
    id: 1,
    place: 4,
    name: "Rens",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    wins: 42,
    losses: 21,
    winrate: 64,
    kda: 1.23,
    rank: "Challenger",
    rankIcon: "challenger",
    rankColor: "text-white",
  },
  {
    id: 2,
    place: 5,
    name: "Edwin",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    wins: 42,
    losses: 21,
    winrate: 64,
    kda: 1.23,
    rank: "Challenger",
    rankIcon: "challenger",
    rankColor: "text-white",
  },
  {
    id: 3,
    place: 6,
    name: "FlyWithMe",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    wins: 20,
    losses: 21,
    winrate: 49,
    kda: 5.23,
    rank: "Challenger",
    rankIcon: "challenger",
    rankColor: "text-white",
  },
  {
    id: 4,
    place: 8,
    name: "BigBob007",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    wins: 20,
    losses: 21,
    winrate: 49,
    kda: 5.23,
    rank: "Grandmaster",
    rankIcon: "grandmaster",
    rankColor: "text-white",
  },
  {
    id: 5,
    place: 10,
    name: "Pudge",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    wins: 20,
    losses: 21,
    winrate: 49,
    kda: 5.23,
    rank: "Master",
    rankIcon: "master",
    rankColor: "text-white",
  },
  {
    id: 6,
    place: 12,
    name: "n0nameplayer",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    wins: 12,
    losses: 21,
    winrate: 34,
    kda: 1.23,
    rank: "Master",
    rankIcon: "master",
    rankColor: "text-white",
  },
  {
    id: 7,
    place: 13,
    name: "Kimberly Mastrangelo",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    wins: 12,
    losses: 21,
    winrate: 34,
    kda: 1.23,
    rank: "Gold",
    rankIcon: "gold",
    rankColor: "text-white",
  },
];
export const getTrendingStories = () => allStories.slice(0, 3);
export const getContinueReadingStories = () => allStories.slice(3, 8);
export const getTopPicksStories = () => allStories.slice(8, 14);
export const getStartedStories = () => allStories.slice(3, 8);
export const getContributedStories = () => allStories.slice(8, 13);
export const getReadStories = () => allStories.slice(8, 13);
export const getTrendingAndPopularStories = () => {
  const trending = allStories
    .slice(3, 8)
    .map((story, index) => ({ ...story, ranking: index + 1 }));
  const popular = allStories
    .slice(8, 13)
    .map((story, index) => ({ ...story, ranking: index + 1 }));
  return { trending, popular };
};

export const getStoryById = (id) => allStories.find((story) => story.id === id);
export const getStoriesByCategory = (category) =>
  allStories.filter((story) => story.category === category);
export const getStoriesByGenre = (genre) =>
  allStories.filter((story) => story.genre.includes(genre));
export const chapterContentData = {
  1: {
    1: {
      text: `Chapter 1: The Discovery

      The ancient gate stood before you, its surface shimmering with an otherworldly light. The air around it seemed to hum with energy, and you could feel the weight of centuries pressing down on your shoulders. 

      As you stepped closer, the ground beneath your feet began to glow with intricate runes that had been hidden for generations. The gate's surface rippled like water, and you could see glimpses of what lay beyond - a world of endless possibilities and untold dangers.

      Your hand trembled as you reached out to touch the gate. The moment your fingertips made contact, a surge of energy coursed through your body, and you knew that your life would never be the same again. The gate was calling to you, and you had to decide whether to answer that call or turn away from the unknown.

      What will you do? The choice is yours, and the consequences will ripple through the fabric of reality itself.`,
      branches: [
        {
          id: 1,
          text: "Step through the gate without hesitation, embracing the unknown and whatever adventures await on the other side.",
          votes: 42,
          author: "StoryWeaver",
          nextChapter: "2",
        },
        {
          id: 2,
          text: "Take a moment to study the runes and try to understand what they mean before making any decisions.",
          votes: 28,
          author: "CautiousReader",
          nextChapter: "3",
        },
        {
          id: 3,
          text: "Call out to see if anyone or anything responds from beyond the gate, testing the waters before committing.",
          votes: 35,
          author: "TeamPlayer",
          nextChapter: "4",
        },
      ],
    },
    2: {
      text: `Chapter 2: First Steps

      You stepped through the gate, and the world around you dissolved into a kaleidoscope of colors and sensations. When your vision cleared, you found yourself in a realm unlike anything you had ever imagined.

      The sky above was a swirling mass of purple and gold clouds, and the ground beneath your feet seemed to pulse with life. Strange plants with bioluminescent flowers swayed gently in a breeze that carried the scent of ancient magic.

      In the distance, you could see the silhouette of a magnificent castle floating in the sky, its towers reaching toward the heavens. But closer to you, a dark forest loomed, its shadows seeming to move and whisper secrets of their own.

      You had entered a world of wonder and danger, and now you had to choose your path forward.`,
      branches: [
        {
          id: 1,
          text: "Head toward the floating castle, drawn by its majesty and the promise of knowledge it might contain.",
          votes: 38,
          author: "AdventureSeeker",
          nextChapter: "5",
        },
        {
          id: 2,
          text: "Explore the mysterious forest first, intrigued by its secrets and the possibility of hidden treasures.",
          votes: 45,
          author: "MysteryLover",
          nextChapter: "6",
        },
        {
          id: 3,
          text: "Stay where you are and try to understand your surroundings better before moving in any direction.",
          votes: 22,
          author: "CarefulExplorer",
          nextChapter: "7",
        },
      ],
    },
  },
};
export const getChapterContent = (storyId, chapterId) => {
  return chapterContentData[storyId]?.[chapterId] || null;
};
