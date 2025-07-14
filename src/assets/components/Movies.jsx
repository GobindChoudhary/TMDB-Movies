import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partial/Topnav";
import Dropdown from "./partial/Dropdown";
import axios from "../../utils/instance";
import Cards from "./partial/Cards";
import Loader from "../../utils/Loader";

const Movies = () => {
  const navigate = useNavigate();
  const [movies, setmovies] = useState([]);
  const [category, setcategory] = useState("now_playing");

  const getMovies = async () => {
    try {
      const { data } = await axios.get(
        `/movie/${category}?language=en-US&page=1`
      );
      setmovies((prevState) => [...data.results]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovies();
  }, [category]);

  if (!movies)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="h-screen w-screen px-5 overflow-x-hidden ">
      <div className="h-[10%]  px-5   flex items-center ">
        <div className=" w-full flex  gap-2 items-center ">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line cursor-pointer text-3xl text-zinc-400 hover:text-[#6556CD]"
          ></i>
          <h1 className="uppercase font-bold text-2xl text-zinc-200">Movies</h1>
          <div className="w-full">
            <Topnav />
          </div>
        </div>

        <div className=" flex items-center gap-4">
          <Dropdown
            title={"category"}
            option={["now_playing", "popular", "top_rated", "upcoming"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>
      <div className="card h-[90%]">
        <Cards data={movies} category={"movie"} />
      </div>
    </div>
  );
};

export default Movies;
