import React from "react";
import { Link } from "react-router-dom";
import noImage from "../../../../public/noImage.webp";
const Cards = ({ data, category }) => {
  console.log(data);
  return (
    <div className=" flex flex-wrap w-[100%] mt-5   ">
      {data.map((card, i) => (
        <Link
          to={`/${card.media_type || category}/${card.id}`}
          key={i}
          className="w-[25vh] mr-[5%] mb-[5%] mx-auto"
        >
          <img
            onClick={() => console.log(card.id)}
            src={`https://image.tmdb.org/t/p/original/${
              card?.poster_path || card?.profile_path || card?.backdrop_path
            }`}
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0.5)] h-[40vh] object-cover"
            alt=""
          />
          <h1 className="text-xl text-zinc-300 mt-3 font-semibold">
            {card?.name ||
              card?.title ||
              card?.orignal_name ||
              card?.original_title}
          </h1>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
