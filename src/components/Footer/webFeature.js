import React from "react";
import { useState } from "react";
import YouTube from "react-youtube";

const WebFeature = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);



  const handleClick = () => {
    setIsVideoPlaying(true);
  };

  return (
    <div className="video-responsive w-5/6 m-auto h-96 mt-10">
      {isVideoPlaying ? (
        <YouTube
          videoId='l3oHhZCuTA4'
          opts={{
            width: '100%',
            height: '100%',
            playerVars: {
              autoplay: 1,
            },
          }}
        />
      ) : (
        <div onClick={handleClick} className="cursor-pointer relative h-full w-full">
          <img
            src='https://i.imgur.com/KYTi79U.jpeg'
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-white pl-1 rounded-full h-10 w-10">
              ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WebFeature;