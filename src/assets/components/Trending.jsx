import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partial/Topnav";
import Dropdown from "./partial/Dropdown";
import axios from "../../utils/instance";
import Cards from "./partial/Cards";
import Loader from "../../utils/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const navigate = useNavigate();
  const [trending, settrending] = useState([]);
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");

  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?language=en-US&page=1`
      );
      settrending((prevState) => [...data.results]);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTrending();
  }, [category, duration]);

  if (!trending)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="h-screen w-screen px-5 overflow-x-hidden ">
      <div className="h-[10%]  px-5   flex items-center ">
        <div className=" w-full flex  gap-2 items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => navigate(-1)}
            viewBox="0 0 24 24"
            className="cursor-pointer h-10 text-zinc-400 hover:text-[#6556CD]"
            fill="currentColor"
          >
            <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
          </svg>
          <h1 className="uppercase font-bold text-2xl text-zinc-200">
            trending
          </h1>
          <div className="w-full">
            <Topnav />
          </div>
        </div>

        <div className=" flex items-center gap-4">
          <Dropdown
            title={"Category"}
            option={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
          <Dropdown
            title={"Duration"}
            option={["week", "day"]}
            func={(e) => setduration(e.target.value)}
          />
        </div>
      </div>
      <div className="card h-[90%]">
        <Cards data={trending} />
      </div>
    </div>
  );
};

export default Trending;
