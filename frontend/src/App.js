import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home.js'
import Navbar from './Components/navbar.js'
import LogIn from './Pages/login.js'
import SignUp from './Pages/singup.js'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/login"
              element={<LogIn />}
            />
            <Route
              path="/signup"
              element={<SignUp />}
            />
          </Routes>

        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
