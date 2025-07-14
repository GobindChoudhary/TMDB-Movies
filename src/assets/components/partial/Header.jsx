const Header = ({ data }) => {
  return (
    <div>
      <div
        className="w-full h-[60vh] flex flex-col p-[5%] justify-end"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${
            data?.backdrop_path || data?.poster_path || data?.profile_path
          })`,
          backgroundSize: "cover",
          backgroundPosition: " top ",
        }}
      >
        <div className="text-5xl text-white font-bold">
          {data?.original_title || data?.name || "Title not available"}
        </div>
        <p className="text-white my-4">
          {data?.overview
            ? `${data?.overview.slice(0, 200)}...`
            : "No overview available"}
        </p>
        <p className="text-white flex">
          <i className="text-yellow-500 ri-megaphone-fill"></i>{" "}
          {data?.release_date || "Unknown release date"}
          <i className="ml-4 text-yellow-500 ri-album-fill"></i>{" "}
          {data?.media_type || "Unknown media type"}
        </p>
      </div>
    </div>
  );
};

export default Header;
