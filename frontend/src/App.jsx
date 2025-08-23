import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Stories from "./Pages/Stories";
import LoginAndSignup from "./Pages/LoginAndSignup";
import Profile from "./Pages/Profile";
import MyStories from "./Pages/MyStories";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginAndSignup />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/stories" element={<Stories />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/my-stories" element={<MyStories />}></Route>
      </Routes>
    </Router>
  );
}
export default App;
