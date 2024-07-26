import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../controller/SliceReducer/modal";
import { useState, useEffect } from "react";
import { ImgController } from "../../controller/SliceReducer/img";

const TrailerDetail = ({ data }) => {
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState('');
  const youtubeLink = data.trailer;
  const videoId = youtubeLink.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)[1];
  const handleOpenModal = () => {
    dispatch(openModal(videoId)); // Thay bằng videoId bạn muốn
  };
  useEffect(() => {
    const imgData = data.image;
    const imageUrl = ImgController(imgData);
    setImageSrc(imageUrl);
    return () => URL.revokeObjectURL(imageUrl);
  }, [data]);
  return (
    <div className="cursor-pointer relative h-512 w-full mt-3">
      <div className="absolute bg-black opacity-50 h-full w-full"></div>
      <img
        src={imageSrc}
        alt="Video thumbnail"
        className="w-1/2 h-full object-cover m-auto"
      />
      <div onClick={handleOpenModal} className="absolute inset-0 flex items-center justify-center">
        <button className="bg-white pl-1 rounded-full h-10 w-10">
          ▶
        </button>
      </div>
    </div>
  )
}
export default TrailerDetail;