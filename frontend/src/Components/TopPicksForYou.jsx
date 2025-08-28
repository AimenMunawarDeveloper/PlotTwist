import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function TopPicksForYou({ stories = [] }) {
  const { user } = useAuth();

  // Filter stories based on user's favorite genres
  const getPersonalizedStories = () => {
    if (!user || !user.favoriteGenres || user.favoriteGenres.length === 0) {
      return stories.slice(0, 5); // Return first 5 stories if no favorite genres
    }

    // Filter stories that match user's favorite genres
    const personalizedStories = stories.filter(
      (story) =>
        story.genre &&
        story.genre.some((genre) => user.favoriteGenres.includes(genre))
    );

    // If not enough personalized stories, add some random ones
    if (personalizedStories.length < 5) {
      const remainingStories = stories.filter(
        (story) =>
          !personalizedStories.some(
            (personalized) => personalized._id === story._id
          )
      );
      return [
        ...personalizedStories,
        ...remainingStories.slice(0, 5 - personalizedStories.length),
      ];
    }

    return personalizedStories.slice(0, 5);
  };

  const personalizedStories = getPersonalizedStories();

  if (!personalizedStories || personalizedStories.length === 0) {
    return (
      <div className="w-full">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center lg:text-left">
          Top Picks For You
        </h1>
        <div className="text-center py-8">
          <p className="text-gray-400">
            {user && user.favoriteGenres && user.favoriteGenres.length > 0
              ? "No stories match your favorite genres yet. Try exploring all categories!"
              : "Set your favorite genres in your profile to get personalized recommendations!"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center lg:text-left">
        Top Picks For You
        {user && user.favoriteGenres && user.favoriteGenres.length > 0 && (
          <span className="text-sm sm:text-base text-gray-400 block mt-2">
            Based on your favorite genres: {user.favoriteGenres.join(", ")}
          </span>
        )}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-10 pt-8 lg:pt-14">
        {personalizedStories.map((story) => (
          <Link
            to={`/story/${story._id}`}
            className="flex flex-col rounded-lg cursor-pointer hover:shadow-black hover:shadow-md overflow-hidden transition-all duration-300 hover:scale-105"
            key={story._id}
          >
            <img
              className="object-cover w-full aspect-[2/3]"
              src={story.coverImage}
              alt={story.title}
            />
            <div className="py-1">
              <p className="px-2 font-medium break-words text-sm sm:text-base">
                {story.title}
              </p>
              <p className="px-2 text-gray-400 text-xs sm:text-sm">
                {story.category}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
