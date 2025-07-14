import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partial/Topnav";
import Dropdown from "./partial/Dropdown";
import axios from "../../utils/instance";
import Cards from "./partial/Cards";
import Loader from "../../utils/Loader";

const People = () => {
  const navigate = useNavigate();
  const [people, setpeople] = useState([]);
  const [category, setcategory] = useState("");
  const getPeople = async () => {
    try {
      const { data } = await axios.get(`/person/popular?language=en-US&page=2`);
      setpeople(data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPeople();
  }, [category]);

  if (!people)
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
            className="ri-arrow-left-line cursor-pointer text-2xl text-zinc-400 hover:text-[#6556CD]"
          ></i>
          <h1 className="uppercase font-bold text-2xl text-zinc-200">people</h1>
          <div className="w-full">
            <Topnav />
          </div>
        </div>

        <div className=" flex items-center gap-4">
          <Dropdown
            title={"Category"}
            option={["tv", "movie"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>
      <div className="card h-[90%]">
        <Cards data={people} category={"person"} />
      </div>
    </div>
  );
};

export default People;
