import { FaEnvelope, FaPhone } from "react-icons/fa";
import ContactImage from "../assets/ContactImage.svg";
export default function ContactUs() {
  const handleFormSubmission = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-center">Contact Us</h1>
      <div className="flex items-center pt-14 gap-10">
        <div className="w-1/3 h-full">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p className="mt-2 text-justify">
            Not sure where to start? The team at plottwist is here to listen.
            Whether you’ve got questions, feedback, or story ideas, we’d love to
            hear from you. Together, we can create twists you never imagined.
          </p>
          <br />
          <span className="flex gap-2 items-center">
            <FaEnvelope /> support@plottwist.com
          </span>
          <br />
          <span className="flex gap-2 items-center">
            <FaPhone /> support: (+98) 123 456 7890
          </span>
        </div>
        <div className="w-2/3 bg-[#d9d6d6] rounded-md p-8 shadow-md shadow-black relative pb-36">
          <h2 className="text-xl font-bold">
            Your Words Shape Our Story — Reach Out!
          </h2>
          <form onSubmit={handleFormSubmission}>
            <div className="grid grid-cols-2 gap-8 mt-6">
              <div className="flex flex-col gap-2">
                <label to="name">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  className="p-2 bg-white rounded-md"
                ></input>
              </div>
              <div className="flex flex-col gap-2">
                <label to="email">Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  className="p-2 bg-white rounded-md"
                ></input>
              </div>
              <div className="flex flex-col gap-2">
                <label to="phone">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  name="phone"
                  className="p-2 bg-white rounded-md"
                ></input>
              </div>
              <div className="flex flex-col gap-2 z-10">
                <label to="subject">Subject</label>
                <input
                  type="subject"
                  placeholder="Enter subject"
                  name="subject"
                  className="p-2 bg-white rounded-md"
                ></input>
              </div>
              <div className="flex flex-col gap-2 col-span-2 z-10">
                <label to="message">Message</label>
                <textarea
                  placeholder="Enter message"
                  name="message"
                  className="p-2 bg-white rounded-md h-28"
                ></textarea>
              </div>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded-md mt-8">
              Send Message
            </button>
          </form>
          <img
            src={ContactImage}
            alt="contactimage"
            className="w-1/3 h-1/3 absolute right-0 bottom-4 z-0"
          />
        </div>
      </div>
    </div>
  );
}
