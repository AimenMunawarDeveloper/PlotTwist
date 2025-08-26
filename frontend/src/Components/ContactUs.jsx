import { FaEnvelope, FaPhone } from "react-icons/fa";
import ContactImage from "../assets/ContactImage.svg";
export default function ContactUs() {
  const handleFormSubmission = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-0">
        Contact Us
      </h1>
      <div className="flex flex-col lg:flex-row items-start lg:items-center pt-8 lg:pt-14 gap-6 lg:gap-10">
        <div className="w-full lg:w-1/3 h-full">
          <h2 className="text-xl sm:text-2xl font-bold text-center lg:text-left">
            Contact Us
          </h2>
          <p className="mt-2 text-center lg:text-justify text-sm sm:text-base">
            Not sure where to start? The team at plottwist is here to listen.
            Whether you’ve got questions, feedback, or story ideas, we’d love to
            hear from you. Together, we can create twists you never imagined.
          </p>
          <br />
          <span className="flex gap-2 items-center justify-center lg:justify-start text-sm sm:text-base">
            <FaEnvelope /> support@plottwist.com
          </span>
          <br />
          <span className="flex gap-2 items-center justify-center lg:justify-start text-sm sm:text-base">
            <FaPhone /> support: (+98) 123 456 7890
          </span>
        </div>
        <div className="w-full lg:w-2/3 bg-[#d9d6d6] rounded-md p-4 sm:p-6 lg:p-8 shadow-md shadow-black relative pb-20 lg:pb-36">
          <h2 className="text-lg sm:text-xl font-bold text-center lg:text-left">
            Your Words Shape Our Story — Reach Out!
          </h2>
          <form onSubmit={handleFormSubmission}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-4 lg:mt-6">
              <div className="flex flex-col gap-2">
                <label to="name" className="text-sm sm:text-base">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  className="p-2 bg-white rounded-md text-sm sm:text-base"
                ></input>
              </div>
              <div className="flex flex-col gap-2">
                <label to="email" className="text-sm sm:text-base">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  className="p-2 bg-white rounded-md text-sm sm:text-base"
                ></input>
              </div>
              <div className="flex flex-col gap-2">
                <label to="phone" className="text-sm sm:text-base">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  name="phone"
                  className="p-2 bg-white rounded-md text-sm sm:text-base"
                ></input>
              </div>
              <div className="flex flex-col gap-2 z-10">
                <label to="subject" className="text-sm sm:text-base">
                  Subject
                </label>
                <input
                  type="subject"
                  placeholder="Enter subject"
                  name="subject"
                  className="p-2 bg-white rounded-md text-sm sm:text-base"
                ></input>
              </div>
              <div className="flex flex-col gap-2 col-span-1 sm:col-span-2 z-10">
                <label to="message" className="text-sm sm:text-base">
                  Message
                </label>
                <textarea
                  placeholder="Enter message"
                  name="message"
                  className="p-2 bg-white rounded-md h-24 sm:h-28 text-sm sm:text-base"
                ></textarea>
              </div>
            </div>
            <button
              className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded-md mt-6 lg:mt-8 text-sm sm:text-base hover:bg-gray-800 transition-colors"
              type="submit"
            >
              Send Message
            </button>
          </form>
          <img
            src={ContactImage}
            alt="contactimage"
            className="w-1/3 h-1/3 absolute right-0 bottom-4 z-0 hidden lg:block"
          />
        </div>
      </div>
    </div>
  );
}
