import TopBar from "../Components/TopBar";
import Herobg from "../assets/Herobg.svg";
import Hero from "../Components/Hero";
import HowItWorks from "../Components/HowItWorks";
import ContactUs from "../Components/ContactUs";
import Subscription from "../Components/Subscription";
import Footer from "../Components/Footer";
import Trending from "../Components/Trending";

export default function Home() {
  return (
    <div className="flex flex-col gap-36">
      <div className="mx-24 my-12">
        <div>
          <img
            src={Herobg}
            className="absolute top-0 right-0 z-0 pointer-events-none opacity-30"
          />
        </div>
        <div className="w-full flex flex-col gap-24">
          <TopBar />
          <Hero />
          <div className="flex flex-col gap-36 items-center">
            <HowItWorks />
            <Trending />
            <ContactUs />
            <Subscription />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
