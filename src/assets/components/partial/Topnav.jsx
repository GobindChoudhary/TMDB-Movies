import { useEffect, useState } from "react";
import axios from "../../../utils/instance";
import { Link } from "react-router-dom";
import noImage from "../../../../public/noImage.webp";
const Topnav = () => {
  const [query, setquery] = useState("");
  const [search, setSearch] = useState([]);
  const Getsearch = async () => {
    try {
      const s = await axios.get(`/search/multi?query=${query}`);
      setSearch(s.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Getsearch();
  }, [query]);

  return (
    <div className="h-[8vh] relative flex items-center justify-start pl-[15%]">
      <i className="text-zinc-400 text-2xl ri-search-line"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className="w-[50%] mx-6 h-[90%] text-zinc-200 p-5 text-base outline-none border-none bg-transeparent "
        type="text"
        placeholder="Search Movies and Actors"
      />
      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className=" text-zinc-400 text-xl cursor-pointer ri-close-large-fill"
        ></i>
      )}
      <div className=" absolute w-[50%] max-h-[50vh] border-zinc-300 bg-black top-[90%] overflow-auto">
        {search.map((s, i) => (
          <Link
            key={i}
            className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] h-20 p-10 flex justify-start items-center border-b-2 border-zinc-100"
          >
            <div className="w-16 h-16 mr-4 rounded-md object-fit overflow-hidden">
              <img
                src={
                  s.backdrop_path || s.poster_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.poster_path || s.profile_path
                      }`
                    : noImage
                }
                alt="Image"
                className="w-full h-full object-cover"
              />
            </div>

            <span>
              {s.name || s.title || s.orignal_title || s.orignal_name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
