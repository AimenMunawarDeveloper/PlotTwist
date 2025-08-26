import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./Pages/Home";
import Stories from "./Pages/Stories";
import LoginAndSignup from "./Pages/LoginAndSignup";
import Profile from "./Pages/Profile";
import MyStories from "./Pages/MyStories";
import Leaderboard from "./Pages/Leaderboard";
import Story from "./Pages/Story";
import Category from "./Pages/Category";
import Chapter from "./Pages/Chapter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginAndSignup />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/stories" element={<Stories />}></Route>
        <Route path="/story/:id" element={<Story />}></Route>
        <Route path="/category/:categoryName" element={<Category />}></Route>
        <Route
          path="/story/:storyId/chapter/:chapterId"
          element={<Chapter />}
        ></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/my-stories" element={<MyStories />}></Route>
        <Route path="/leaderboard" element={<Leaderboard />}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Router>
  );
}
export default App;
