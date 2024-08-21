import React, { useState } from "react";
import HoverMini from "./hoverMini";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { imageUrl } from  "../../../../../controller/SliceReducer/img";


const MiniImg = ({data}) => {
    const [isHovered, setIsHovered] = useState(false); 
    return (
        <div onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative overflow-hidden h-52">
            <img className="rounded w-full h-full object-cover" src={`${imageUrl}${data.image}`} alt="" />
            <div className="bg-black h-5 -right-2 w-16 absolute bottom-10 opacity-60  skew-x-[25deg]">

            </div>
            <div className="absolute bottom-9 right-2 mb-0.5 w-10 flex ">
                    <FontAwesomeIcon icon={faStar} color="orange" className="h-3 my-auto" />
                <p className="text-gray-400 my-auto ml-2">9.5</p>
            </div>
            <div className="absolute bottom-0 right-0 bg-orange-500 text-white rounded p-1 font-sans font-bold m-1 text-sm">
                <p className="">T18</p>
            </div>
            {isHovered && <HoverMini data={data} />}
        </div>
    )
}
export default MiniImg;