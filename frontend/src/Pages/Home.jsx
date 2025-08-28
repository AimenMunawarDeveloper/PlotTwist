import TopBar from "../Components/TopBar";
import Herobg from "../assets/Herobg.svg";
import Hero from "../Components/Hero";
import HowItWorks from "../Components/HowItWorks";
import ContactUs from "../Components/ContactUs";
import Subscription from "../Components/Subscription";
import Footer from "../Components/Footer";
import Trending from "../Components/Trending";
import ContinueReading from "../Components/ContinueReading";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 sm:gap-16 lg:gap-36">
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 my-4 sm:my-8 lg:my-12">
        <div>
          <img
            src={Herobg}
            className="absolute top-0 right-0 z-0 pointer-events-none opacity-20 sm:opacity-30 w-1/2 sm:w-auto"
          />
        </div>
                  <div className="w-full flex flex-col gap-8 sm:gap-16 lg:gap-24">
            <TopBar />
            <Hero />
            <ContinueReading />
            <div className="flex flex-col gap-8 sm:gap-16 lg:gap-36 items-center">
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
