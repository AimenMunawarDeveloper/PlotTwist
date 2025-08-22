import { useState } from "react";
import LightRays from "../Components/LightRays";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginAndSignup() {
  const [loginOrSignup, setLoginOrSignup] = useState("login");
  const [showOrHidePassword, setShowOrHidePassword] = useState(false);
  const handleSubmission = () => {};
  return (
    <div className="relative flex justify-center items-center w-full h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="relative w-full h-full">
          <LightRays
            raysOrigin="top-center"
            raysColor="#00000"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </div>
      </div>
      <div className="flex flex-col gap-10 p-6 bg-black rounded-lg w-1/3 shadow-lg shadow-black">
        <h2 className="text-3xl font-bold text-center text-white">
          {loginOrSignup === "login" ? "Login" : "Signup"}
        </h2>
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmission();
          }}
        >
          {loginOrSignup === "signup" && (
            <>
              <label htmlFor="name" className="text-white">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter name"
                name="name"
                className="p-2 bg-white rounded-md text-black"
              />
            </>
          )}
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            className="p-2 bg-white rounded-md text-black"
          />
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <div className="relative w-full">
            <input
              type={showOrHidePassword ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              className="p-2 pr-10 bg-white rounded-md text-black w-full"
            />
            <span
              onClick={() => setShowOrHidePassword(!showOrHidePassword)}
              className="absolute right-3 flex items-center inset-y-0 cursor-pointer text-gray-600"
            >
              {showOrHidePassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            className="bg-white text-black px-4 py-2 rounded-md mt-8"
            type="submit"
          >
            {loginOrSignup === "login" ? "Login" : "Signup"}
          </button>
          {loginOrSignup === "login" ? (
            <p className="text-white">
              Don't have an account?{" "}
              <span
                onClick={() => setLoginOrSignup("signup")}
                className="cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p className="text-white">
              Already have an account?{" "}
              <span
                onClick={() => setLoginOrSignup("login")}
                className="cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
