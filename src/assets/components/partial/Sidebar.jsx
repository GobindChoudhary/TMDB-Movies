import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className=" w-[20%] border-r-2 border-zinc-400  text-white">
      <div className="p-4">
        <h1 className="text-2xl py-4 font-bold flex items-center">
          <i className="text-[#6556CD] mr-2 ri-tv-fill"></i>
          <span>MOVIE</span>
        </h1>
      </div>
      <hr className="border-zinc-600" />
      <div className="p-4">
        <h1 className="text-lg font-semibold mb-4">New Feed</h1>
        <nav className="space-y-2">
          <Link
            to="/trending"
            className="flex items-center gap-2 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3"
          >
            <i className="ri-fire-fill"></i>
            Trending
          </Link>
          <Link
            to="/popular"
            className="flex items-center gap-2 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3"
          >
            <i className="ri-star-fill"></i>
            Popular
          </Link>
          <Link
            to="/movies"
            className="flex items-center gap-2 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3"
          >
            <i className="ri-movie-2-fill"></i>
            Movies
          </Link>
          <Link
            to="/tv-shows"
            className="flex items-center gap-2 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3"
          >
            <i className="ri-tv-2-fill"></i>
            TV Shows
          </Link>
          <Link
            to="/person"
            className="flex items-center gap-2 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3"
          >
            <i className="ri-team-fill"></i>
            People
          </Link>
          <hr />
          <Link
            to="/about tmdb"
            className="flex items-center gap-2 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3"
          >
            <i className="ri-error-warning-fill"></i>
            About TMDB
          </Link>
          <Link
            to="/about tmdb"
            className="flex items-center gap-2 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3"
          >
            <i className="ri-phone-fill"></i>
            Contact Us
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
