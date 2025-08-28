import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Home from "./Pages/Home";
import Stories from "./Pages/Stories";
import LoginAndSignup from "./Pages/LoginAndSignup";
import Profile from "./Pages/Profile";
import MyStories from "./Pages/MyStories";
import Leaderboard from "./Pages/Leaderboard";
import Story from "./Pages/Story";
import Category from "./Pages/Category";
import Chapter from "./Pages/Chapter";
import ReadingProgress from "./Pages/ReadingProgress";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginAndSignup />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stories"
            element={
              <ProtectedRoute>
                <Stories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/story/:id"
            element={
              <ProtectedRoute>
                <Story />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/:categoryName"
            element={
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            }
          />
          <Route
            path="/story/:storyId/chapter/:chapterId"
            element={
              <ProtectedRoute>
                <Chapter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-stories"
            element={
              <ProtectedRoute>
                <MyStories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reading-progress"
            element={
              <ProtectedRoute>
                <ReadingProgress />
              </ProtectedRoute>
            }
          />
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
    </AuthProvider>
  );
}
export default App;
