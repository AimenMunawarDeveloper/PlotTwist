import TopBar from "../Components/TopBar";
import Footer from "../Components/Footer";
import UserInfo from "../Components/UserInfo";
import Achievements from "../Components/Achievements";
import MyStoriesCard from "../Components/MyStoriesCard";

export default function Profile() {
  return (
    <div className="flex flex-col gap-36">
      <div className="mx-24 my-12">
        <div className="w-full flex flex-col">
          <TopBar />
          <UserInfo />
          <Achievements />
          <h1 className="text-4xl font-bold text-center mt-14">My Stories</h1>
          <div className="mt-10 flex flex-col gap-10">
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
