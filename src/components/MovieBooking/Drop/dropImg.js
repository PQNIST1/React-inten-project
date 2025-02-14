import React from "react";
import DropSelect from "./dropSelect";



const DropImg = ({data, select}) => {
    return (
        <div className="relative overflow-hidden xl:h-56 lg:h-40 ">
            <img className="rounded-lg w-full h-full object-cover" src={`${data.image}`} alt="" />
            {select === data.name && <DropSelect/>}
        </div>
    )
}
export default DropImg;