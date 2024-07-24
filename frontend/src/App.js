import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext.js";

import Social from "./Pages/Social.js";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Pages/Home.js";
import Navbar from "./Components/navbar.js";
import LogIn from "./Pages/login.js";
import SignUp from "./Pages/singup.js";
import Profile from "./Pages/profile.js";
import Workouts from "./Pages/Workouts.js";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <LogIn /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to="/" />}
            />
            <Route
              path="/social"
              element={!user ? <SignUp /> : <Social />} //show social page, which either shows search or profile
            />
            <Route
              path="/users/profile"
              element={!user ? <LogIn /> : <Profile />}
            />
            <Route
              path="/workouts"
              element={!user ? <LogIn /> : <Workouts />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
