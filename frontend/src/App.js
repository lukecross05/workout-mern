import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home.js'
import Navbar from './Components/navbar.js'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar>

      </Navbar>
        <div classname="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
          </Routes>

        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
