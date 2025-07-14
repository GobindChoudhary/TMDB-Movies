import { Route, Routes } from "react-router-dom";
import Home from "./assets/components/Home";
import Trending from "./assets/components/Trending";
import Popular from "./assets/components/Popular";
import Movies from "./assets/components/Movies";
import TvShow from "./assets/components/TvShow";
import People from "./assets/components/People";
import Detail from "./assets/components/Detail";
import PersonDetail from "./assets/components/PersonDetail";

export const App = () => {
  return (
    <div className="bg-[#1F1E24] ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv-shows" element={<TvShow />} />
        <Route path="/person" element={<People />} />
        <Route path="/:type/:id" element={<Detail />} />
        <Route path="/person/:id" element={<PersonDetail />} />
      </Routes>
    </div>
  );
};
export default App;
//
