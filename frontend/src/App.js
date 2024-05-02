import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext.js'

import Home from './Pages/Home.js'
import Navbar from './Components/navbar.js'
import LogIn from './Pages/login.js'
import SignUp from './Pages/singup.js'

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login"/>}
            />
            <Route
              path="/login"
              element={!user ? <LogIn /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to="/" />}
            />
          </Routes>

        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
