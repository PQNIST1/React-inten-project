import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../controller/modal";

const TrailerDetail = () => {
    const dispatch = useDispatch();
    const handleOpenModal = () => {
        dispatch(openModal('dQw4w9WgXcQ')); // Thay bằng videoId bạn muốn
      };
    return (
        <div  className="cursor-pointer relative h-full w-full mt-3">
        <div className="absolute bg-black opacity-50 h-full w-full"></div>
        <img
          src='https://cdn.galaxycine.vn/media/2024/6/7/gtcn-750_1717732724835.jpg'
          alt="Video thumbnail"
          className="w-1/2 h-1/2 object-cover m-auto"
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