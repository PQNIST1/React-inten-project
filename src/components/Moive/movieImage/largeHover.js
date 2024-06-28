import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';
import { openModal } from "../../../controller/SliceReducer/modal";

const LargeHover = () => {
    const dispatch = useDispatch();
    const handleOpenModal = () => {
        dispatch(openModal('dQw4w9WgXcQ')); // Thay bằng videoId bạn muốn
    };
    return (
        <div className="">
            <Link to={'/detail'}>
                <div className="bg-black absolute h-full w-full rounded top-0 opacity-50  ">
                </div>
            </Link>
            <Link to={'/detail'}>
                <div className="absolute bg-orange-500 top-1/3 mt-5 left-1/3 flex text-white p-2 rounded hover:bg-orange-400">
                    <img src="https://www.galaxycine.vn/_next/static/media/Vector-1.319a0d2b.svg" alt="" className="m-auto mr-1.5" />
                    <p className="tex-sm m-auto">Mua vé</p>
                </div>
            </Link>
            <button>
                <div onClick={handleOpenModal} className="absolute bg-transparent border top-1/2 mt-5 left-1/3 flex text-white px-3.5 py-2 rounded hover:bg-orange-400">
                    <FontAwesomeIcon icon={faCirclePlay} className="m-auto mr-1.5" />
                    <p className="tex-sm m-auto">Trailer</p>
                </div>
            </button>

        </div>

    )
}
export default LargeHover;