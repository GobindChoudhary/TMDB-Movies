import { Link } from "react-router-dom";
import noImage from "../../../../public/noImage.webp";
import Loader from "../../../utils/Loader";
const VerticalCards = (data) => {
  const { cast } = data;
  if (!data)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  return (
    <div className=" w-[100%] bg-trasparent  flex overflow-x-scroll overflow-hidden  ">
      {cast.map((card, i) => (
        <Link
          to={`/person/${card.id}`}
          key={i}
          className="w-[25vh] mr-[1%] shrink-0 overflow-hidden "
        >
          <img
            src={
              card?.poster_path || card?.profile_path || card?.backdrop_path
                ? `https://image.tmdb.org/t/p/original/${
                    card?.poster_path ||
                    card?.profile_path ||
                    card?.backdrop_path
                  }`
                : noImage
            }
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0.5)] object-cover"
            alt=""
          />
          <h1 className=" flex flex-col gap-2 text-xl text-zinc-300 mt-3 font-semibold">
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

export default VerticalCards;

// {/* <div className="bg-red-200 ">
// <h1 className="text-white text-2xl font-bold ">Trending</h1>

// <div className="flex flex-nowrap overflow-scroll justify-center gap-4 ">
//   {data.data.map((item, index) => (
//     <div
//       key={index}
//       className=" bg-white shadow-lg rounded-lg overflow-hidden shrink-0"
//       style={{ width: "200px", height: "300px" }}
//     >
//       {/* Image Section */}
//       <img
//         src={`https://image.tmdb.org/t/p/original/${
//           item.backdrop_path || item.poster_path
//         }`}
//         alt={item.orignal_title || item.name || item.original_title}
//         className="w-full h-1/2 object-cover"
//       />
//       {/* Content Section */}
//       <div className="p-4 ">
//         <h2 className="text-lg font-bold text-gray-900">
//           {item.orignal_title || item.name || item.original_title}
//         </h2>
//         <p className="text-sm text-gray-600 mt-2">
//           {item.overview.slice(0, 50)}...
//         </p>
//       </div>
//     </div>
//   ))}
// </div>
// </div> */}
