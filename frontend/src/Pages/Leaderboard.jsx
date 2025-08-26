import TopBar from "../Components/TopBar";
import Footer from "../Components/Footer";
import TopThreeCards from "../Components/TopThreeCards";
import LeaderboardTable from "../Components/LeaderboardTable";

export default function Leaderboard() {
  return (
    <div className="flex flex-col gap-36">
      <div className="mx-24 my-12">
        <div className="w-full flex flex-col">
          <TopBar />
          <div className="flex flex-col w-full h-full justify-center items-center gap-14">
            <TopThreeCards />
            <LeaderboardTable />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
