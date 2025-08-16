import { FaEnvelope } from "react-icons/fa";
import ContactUsDecor1 from "../assets/ContactUsDecor1.svg";
import ContactUsDecor2 from "../assets/ContactUsDecor2.svg";

export default function Subscription() {
  return (
    <div className="w-full bg-[#d9d6d6] rounded-tl-[100px] rounded-tr-lg rounded-b-lg p-28 flex flex-col items-center justify-center gap-10 relative shadow-md shadow-black">
      <h2 className="text-3xl font-bold text-black text-center">
        Subscribe to get information, latest news and other interesting offers
        about Plottwist
      </h2>
      <form className="flex gap-2 w-full justify-center items-center">
        <div className="flex items-center gap-4 bg-white px-6 rounded-md h-12 w-1/3">
          <FaEnvelope className="text-gray-500" />
          <input
            type="email"
            placeholder="Enter email"
            className="outline-none flex-1"
          />
        </div>
        <button className="bg-black text-white px-6 rounded-md h-12 flex items-center">
          Subscribe
        </button>
      </form>
      <img
        src={ContactUsDecor1}
        alt="contactusdecor1"
        className="absolute top-0 right-0 opacity-10"
      />
      <img
        src={ContactUsDecor2}
        alt="contactusdecor2"
        className="absolute bottom-0 -left-20"
      />
    </div>
  );
}
