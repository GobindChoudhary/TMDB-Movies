import { useEffect, useState } from "react";
import Sidebar from "./partial/Sidebar";
import Topnav from "./partial/Topnav";
import Header from "./partial/Header";
import HorizontalCards from "./partial/HorizontalCards";
import axios from "../../../src/utils/instance";
import Loader from "../../utils/Loader";
import Dropdown from "./partial/Dropdown";

const Home = () => {
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState([]);
  const [category, setcategory] = useState("all");

  const getWallpaper = async () => {
    try {
      const s = await axios.get(`/trending/all/day`);

      const randomIndex = Math.floor(Math.random() * s.data.results.length);
      setwallpaper(s.data.results[randomIndex]);
    } catch (error) {
      console.log(error);
    }
  };
  const getTrending = async () => {
    try {
      const s = await axios.get(`/trending/${category}/day`);
      settrending(s.data.results);
      console.log(s.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTrending();
    !wallpaper && getWallpaper();
  }, [category]);

  return wallpaper && trending ? (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="w-[80%] h-full">
        <Topnav />
        <Header data={wallpaper} />
        <div className="flex justify-between items-center my-3 mx-3">
          <h1 className="text-zinc-200  uppercase text-2xl font-bold my-2 ">
            Trending
          </h1>
          <Dropdown
            title={"filter"}
            option={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Home;
