import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import Authentication from "./pages/authentication/index";
import Homepage from "./pages/homepage/index";
import TVShow from "./pages/tvshow";
import Movies from "./pages/movie";

import Rated from "./pages/ratings";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/ratings" element={<Rated />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/movie/:id" element={<Movies />} />
          <Route path="/tvshow/:id" element={<TVShow />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
