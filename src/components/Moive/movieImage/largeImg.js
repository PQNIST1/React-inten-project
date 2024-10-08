import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import LargeHover from "./largeHover";
import { imageUrl } from  "../../../controller/SliceReducer/img";




const LargeImg = ({ data }) => {
    const [isHovered, setIsHovered] = useState(false);
   

    return (
        <div onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative overflow-hidden h-96">
            <img className="rounded-lg w-full h-full object-fill" src={`${imageUrl}${data.image}`} alt="" />
            <div className="bg-black h-6 -right-2 w-20 absolute bottom-12 opacity-60  skew-x-[25deg]">
            </div>
            <div className="absolute bottom-12 right-5 mb-0 w-10 flex ">
                <FontAwesomeIcon icon={faStar} color="orange" className="h-3 my-auto" />
                <p className="text-gray-400 my-auto ml-2">9.5</p>
            </div>
            <div className="h-8 w-10 absolute bottom-0 right-0 m-1.5 bg-orange-500 rounded items-center flex justify-center">
                <p className="text-center text-white font-bold font-sans">T18</p>
            </div>
            {isHovered && <LargeHover data={data} />}
        </div>
    )
}
export default LargeImg;