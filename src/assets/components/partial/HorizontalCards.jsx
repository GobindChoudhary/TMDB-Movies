import { Link } from "react-router-dom";
const HorizontalCards = (data) => {
  return (
    <div className="flex mx-3 overflow-y-hidden gap-4">
      {data.data.map((item, index) => (
        <Link
          to={`/${item.media_type}/${item.id}`}
          key={index}
          className="min-w-[20%] max-w-[25%] h-[40vh] rounded-md mb-2 overflow-hidden bg-zinc-900"
        >
          {/* Image Section */}
          <img
            className="w-full h-1/2 object-cover "
            src={`https://image.tmdb.org/t/p/original/${
              item.backdrop_path || item.poster_path || item.profile_path
            }`}
            alt={item.orignal_title || item.name || item.original_title}
          />
          {/* Content Section */}
          <div className=" text-white h-[50%] p-2  flex flex-col  ">
            <h2 className="text-lg uppercase font-medium">
              {item.orignal_title || item.name || item.original_title}
            </h2>
            <p className=" text-base text-sm  text-zinc-200 ">
              {item.overview
                ? item.overview?.slice(0, 80)
                : "No overview available"}
              ...more
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HorizontalCards;

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
