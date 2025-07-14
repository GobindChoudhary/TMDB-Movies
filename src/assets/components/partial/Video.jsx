import React from "react";

const Video = (data) => {
  const { video, setShowPopup } = data;
  return (
    <div>
      <div className="w-screen h-screen fixed inset-0 flex items-center justify-center bg-gray/500 ">
        <div className="absolute z-10 top-5 right-5">
          <img
            className="h-8 w-8"
            onClick={() => setShowPopup(false)}
            src={"../../../public/close-line.svg"}
            alt=""
          />
        </div>
        <div className=" relative w-[85%] h-[85%]  ">
          <div
            className="video-container  rounded shadow-xl"
            style={{
              paddingBottom: "56.25%", // 16:9 aspect ratio
              height: 0,
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${video}`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "0.5rem",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
