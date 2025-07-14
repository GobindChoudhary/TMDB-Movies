import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/instance";
import { useEffect, useState } from "react";
import Loader from "../../utils/Loader";
import HorizontalCards from "./partial/HorizontalCards";
import Dropdown from "./partial/Dropdown";

const PersonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [persondetail, setPersonDetail] = useState(null);
  const [combineCredits, setCombineCredits] = useState(null);
  const [category, setCategory] = useState("movie");
  const [credits, setCredits] = useState([]);
  const [externalId, setExternalId] = useState();

  const getPersonDetails = async () => {
    try {
      const { data } = await axios.get(`/person/${id}`);
      setPersonDetail(data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(persondetail);

  const getCombineCredits = async () => {
    try {
      const { data } = await axios.get(`/person/${id}/combined_credits`);
      setCombineCredits(data);
    } catch (error) {
      console.error(error);
    }
  };
  const getExternalIds = async () => {
    try {
      const { data } = await axios.get(`/person/${id}/external_ids`);
      setExternalId(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Separate useEffect to update credits after combineCredits or category changes
  useEffect(() => {
    if (combineCredits?.cast) {
      const filtered = combineCredits.cast.filter(
        (item) => item.media_type?.toLowerCase() === category.toLowerCase()
      );
      setCredits(filtered);
    }
  }, [combineCredits, category]);

  useEffect(() => {
    getPersonDetails();
    getCombineCredits();
    getExternalIds();
  }, [id]);

  if (!persondetail)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="px-8">
      <div className=" flex items-center justify-between py-4 ">
        <div className="flex items-center gap-2  ">
          <i
            onClick={() => navigate(-1)}
            class="ri-arrow-left-line text-3xl text-zinc-200 hover:text-[#6556CD] "
          ></i>
          <h1 className="text-2xl text-zinc-200 font-bold ">DETAIL</h1>
        </div>
        <i
          onClick={() =>
            window.open(
              `https://www.wikidata.org/wiki/${externalId.wikidata_id}`
            )
          }
          class="ri-global-fill text-2xl text-zinc-200 hover:text-[#6556cd] cursor-pointer"
        ></i>
      </div>
      <div className="w-full flex overflow-hidden ">
        <div className="img-personal-info  w-[32%] mr-8  ">
          <img
            src={`https://image.tmdb.org/t/p/original/${persondetail.profile_path}`}
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0.5)] w-full object-cover"
            alt=""
          />
          <div className="social-link flex gap-4 py-8">
            <i
              class="ri-facebook-circle-fill text-[#1877F2] text-4xl cursor-pointer"
              onClick={() =>
                window.open(
                  `https://www.facebook.com/${externalId.facebook_id}`
                )
              }
            ></i>
            <i
              class="ri-twitter-x-line text-white text-4xl cursor-pointer"
              onClick={() =>
                window.open(`https://www.twitter.com/${externalId.twitter_id}`)
              }
            ></i>
            <i
              class="ri-instagram-line text-[#E1306C] text-4xl cursor-pointer"
              onClick={() =>
                window.open(
                  `https://www.instagram.com/${externalId.instagram_id}`
                )
              }
            ></i>
          </div>
          <div className="personal-info">
            <h1 className="text-2xl text-zinc-200 mb-2 font-semibold uppercase">
              Personal Detail
            </h1>
            <p className="text-gray-400 text-sm">Known For:</p>
            <p className="text-white mb-1">
              {persondetail.known_for_department}
            </p>
            <p className="text-gray-400 text-sm">Gender:</p>
            <p className="text-white mb-1">
              {persondetail.gender === 2 ? "Male" : "Female"}
            </p>
            <p className="text-gray-400 text-sm">Birthday:</p>
            <p className="text-white mb-1">{persondetail.birthday}</p>
            {persondetail.deathday && (
              <>
                <p className="text-gray-400 text-sm">Death:</p>
                <p className="text-white mb-1">{persondetail.deathday}</p>
              </>
            )}
            <p className="text-gray-400 text-sm">Place of Birth:</p>
            <p className="text-white mb-1">{persondetail.place_of_birth}</p>
            <p className="text-gray-400 text-sm">Also Known As:</p>
            <p className="text-white mb-1">
              {persondetail.also_known_as?.join(", ")}
            </p>
          </div>
        </div>

        <div className="detail w-full  overflow-hidden">
          <h1 className="text-4xl font-bold text-white mb-4">
            {persondetail.name}
          </h1>
          <h2 className="text-xl font-semibold text-zinc-200 uppercase mb-2">
            Biography
          </h2>
          <p className="text-gray-400 text-sm mb-4">{persondetail.biography}</p>

          <h2 className="text-xl font-semibold text-zinc-200 uppercase mb-2">
            Known For
          </h2>
          <div className="-ml-3">
            <HorizontalCards data={combineCredits?.cast || []} />
          </div>

          <div className="flex items-center justify-between p-4 bg-black/40 my-4 rounded-md">
            <h2 className="text-xl font-semibold text-zinc-200 uppercase">
              Acting
            </h2>
            <Dropdown
              title="Category"
              option={["Movie", "TV"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="h-[50vh] overflow-y-scroll p-4 bg-black/40 my-4 rounded-md max-h-[50vh]">
            {credits?.length > 0 ? (
              credits.map((item, index) => (
                <div
                  key={item.id || index}
                  className="bg-gray-800 p-4 mb-2 rounded-md"
                >
                  <h3 className="text-white text-lg font-semibold">
                    {item.title || item.name}
                  </h3>
                  <p className="text-gray-300 text-sm">{item.character}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">
                No credits found for this category.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;
