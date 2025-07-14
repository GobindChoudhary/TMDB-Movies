import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/instance";
import { useEffect, useState } from "react";
import Loader from "../../utils/Loader";
import Video from "./partial/Video";
import HorizontalCards from "./partial/HorizontalCards";
import VerticalCards from "./partial/VerticalCards";

const Detail = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const [detail, setDetail] = useState(null);
  const [credits, setcredits] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [video, setvideo] = useState(null);
  const [translations, setTranslations] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [reviews, setReviews] = useState([]);

  const getVideo = async () => {
    try {
      const { data } = await axios.get(`/${type}/${id}/videos`);
      setvideo(data.results[0].key);
    } catch (error) {
      console.error(error);
    }
  };
  const getCredit = async () => {
    try {
      const { data } = await axios.get(`/${type}/${id}/credits`);
      setcredits(data.cast);
    } catch (error) {
      console.error(error);
    }
  };
  const getTranslations = async () => {
    try {
      const { data } = await axios.get(`/${type}/${id}/translations`);
      setTranslations(data.translations);
    } catch (error) {
      console.error(error);
    }
  };
  const getRecommendations = async () => {
    try {
      const { data } = await axios.get(
        `/${type}/${id}/recommendations?language=en-US&page=1`
      );
      setRecommendations(data?.results);
    } catch (error) {
      console.error(error);
    }
  };

  const getReviews = async () => {
    try {
      const { data } = await axios.get(`/${type}/${id}/reviews`);
      setReviews(data);
    } catch (error) {
      console.error(error);
    }
  };

  const popupShow = () => {
    getVideo();
    setShowPopup(true);
  };

  const getDetail = async () => {
    try {
      const { data } = await axios.get(`/${type}/${id}`);
      setDetail(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDetail();
    getCredit();
    getTranslations();
    getReviews();
    getRecommendations();
  }, [type, id]);

  if (!detail)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div
      className="min-h-screen px-10 relative bg-cover bg-top bg-no-repeat bg-fixed  "
      style={{
        backgroundImage: `url(${`https://image.tmdb.org/t/p/original${detail?.backdrop_path}`})`,
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-1"></div>
      <div className="relative inset-0 z-2">
        {/* Nav */}
        <div className="nav  py-4 w-full  flex items-center justify-between">
          <div className="flex items-center  gap-2">
            <i
              onClick={() => navigate(-1)}
              className="ri-arrow-left-line text-3xl text-zinc-200 hover:text-[#6556CD] "
            ></i>
            <h1 className="text-2xl text-zinc-200 font-bold ">DETAIL</h1>
          </div>
          <div className="icon flex flex-col items-center cursor-pointer items-center leading-none ">
            {detail.homepage ? (
              <>
                {" "}
                <i
                  onClick={() => {
                    window.open(detail.homepage, "_blank");
                  }}
                  className="ri-external-link-fill text-2xl text-zinc-200 hover:text-[#6556CD] "
                ></i>
                <h1 className="text-gray-400 font-normal text-sm/1 ">
                  Homepage
                </h1>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* detail */}
        <div className="details flex mb-8 ">
          <div className="poster flex flex-col  w-[32%] ">
            <img
              src={`https://image.tmdb.org/t/p/original/${
                detail?.poster_path || detail.profile_path
              }`}
              className="shadow-[8px_17px_38px_2px_rgba(0,0,0.5)]  w-full  object-cover"
              alt=""
            />
          </div>
          <div className="info w-full  pl-8 ">
            <h1 className="text-4xl font-bold text-white mb-2">
              {" "}
              {detail.title || detail.name}{" "}
              <span className="text-gray-400 font-normal text-sm">
                (
                {(detail.release_date || detail.first_air_date || "").slice(
                  0,
                  4
                )}
                )
              </span>
            </h1>
            <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
              <span>{detail.release_date || detail.first_air_date}</span>
              <span>•</span>
              <span>{detail.genres?.map((g) => g.name).join(", ")}</span>
              <span>•</span>{" "}
              <span>
                {Math.floor((detail.runtime || 0) / 60)}h{" "}
                {(detail.runtime || 0) % 60}m{" "}
              </span>{" "}
            </div>

            <div className="flex items-center gap-6 mb-6">
              {" "}
              <div className="flex flex-col items-center">
                {" "}
                <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center text-yellow-400 text-2xl font-bold">
                  {Math.round((detail.vote_average || 0) * 10)}
                  <span className="text-base">%</span>{" "}
                </div>
                <span className="text-xs text-gray-400 mt-1">User Score</span>{" "}
              </div>{" "}
              <h1
                onClick={() =>
                  window.open(
                    `https://www.imdb.com/title/${detail.imdb_id}`,
                    "_blank"
                  )
                }
                className="text-2xl  cursor-pointer font-bold text-zinc-200 hover:text-[#6556CD] "
              >
                IMDB
              </h1>
            </div>
            {detail.tagline && (
              <p className="italic text-gray-300 mb-2">{detail.tagline}</p>
            )}
            {/* Overview */}
            <h2 className="text-xl font-semibold text-white mb-1">Overview:</h2>
            <p className="text-gray-200 mb-4">{detail.overview}</p>
            <h2 className="text-xl font-semibold text-white mb-1">
              Translations:
            </h2>
            <p className="text-gray-200 mb-4">
              {translations.map((item, index) => item.english_name).join(", ")}
            </p>
            <div className="flex flex-wrap gap-8 mt-4">
              {credits?.crew
                ?.filter(
                  (member, idx, arr) =>
                    ["Director", "Screenplay"].includes(member.job) &&
                    arr.findIndex(
                      (m) => m.name === member.name && m.job === member.job
                    ) === idx
                )
                .map((member, idx) => (
                  <div key={idx}>
                    <div className="text-white font-semibold">
                      {member.name}
                    </div>
                    <div className="text-gray-400 text-sm">{member.job}</div>
                  </div>
                ))}
            </div>

            <button
              onClick={() => popupShow()}
              className="bg-[#6556CD] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#4b3fae] transition flex items-center gap-2"
            >
              <i className="ri-play-fill text-lg"></i>
              Play Trailer
            </button>

            {showPopup && <Video setShowPopup={setShowPopup} video={video} />}
          </div>
        </div>
        <hr className="text-white" />
        <div className="mb-8">
          <h1 className=" text-white text-2xl uppercase font-bold py-4">
            Cast
          </h1>
          <VerticalCards cast={credits} />
        </div>
        <hr className="text-white" />

        <h1 className=" text-white text-2xl uppercase font-bold py-4">
          Recommendation
        </h1>
        <div className="pb-4">
          <HorizontalCards data={recommendations} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
