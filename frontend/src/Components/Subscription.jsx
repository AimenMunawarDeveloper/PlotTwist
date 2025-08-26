import { FaEnvelope } from "react-icons/fa";
import ContactUsDecor1 from "../assets/ContactUsDecor1.svg";
import ContactUsDecor2 from "../assets/ContactUsDecor2.svg";

export default function Subscription() {
  return (
    <div className="w-full bg-[#d9d6d6] rounded-tl-[50px] sm:rounded-tl-[100px] rounded-tr-lg rounded-b-lg p-8 sm:p-16 lg:p-28 flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-10 relative shadow-md shadow-black">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black text-center px-4">
        Subscribe to get information, latest news and other interesting offers
        about Plottwist
      </h2>
      <form className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full justify-center items-center px-4">
        <div className="flex items-center gap-4 bg-white px-4 sm:px-6 rounded-md h-10 sm:h-12 w-full sm:w-1/2 lg:w-1/3">
          <FaEnvelope className="text-gray-500 text-sm sm:text-base" />
          <input
            type="email"
            placeholder="Enter email"
            className="outline-none flex-1 text-sm sm:text-base"
          />
        </div>
        <button className="w-full sm:w-auto bg-black text-white px-4 sm:px-6 rounded-md h-10 sm:h-12 flex items-center justify-center text-sm sm:text-base hover:bg-gray-800 transition-colors">
          Subscribe
        </button>
      </form>
      <img
        src={ContactUsDecor1}
        alt="contactusdecor1"
        className="absolute top-0 right-0 opacity-10 hidden lg:block"
      />
      <img
        src={ContactUsDecor2}
        alt="contactusdecor2"
        className="absolute bottom-0 -left-20 hidden lg:block"
      />
    </div>
  );
}
