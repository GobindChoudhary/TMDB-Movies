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
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line text-3xl text-zinc-200 hover:text-[#6556CD] "
          ></i>
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
