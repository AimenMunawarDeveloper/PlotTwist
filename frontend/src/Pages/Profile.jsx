import TopBar from "../Components/TopBar";
import Footer from "../Components/Footer";
import UserInfo from "../Components/UserInfo";
import Achievements from "../Components/Achievements";
import MyStoriesCard from "../Components/MyStoriesCard";

export default function Profile() {
  return (
    <div className="flex flex-col gap-8 sm:gap-16 lg:gap-36">
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 my-4 sm:my-8 lg:my-12">
        <div className="w-full flex flex-col">
          <TopBar />
          <UserInfo />
          <Achievements />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mt-8 sm:mt-10 lg:mt-14">My Stories</h1>
          <div className="mt-6 sm:mt-8 lg:mt-10 flex flex-col gap-6 sm:gap-8 lg:gap-10">
            <MyStoriesCard heading="Started" />
            <MyStoriesCard heading="Contributed" />
            <MyStoriesCard heading="Read" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
