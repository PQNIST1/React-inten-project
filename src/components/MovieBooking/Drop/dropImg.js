import React from "react";
import DropSelect from "./dropSelect";



const DropImg = ({data, select}) => {
    return (
        <div className="relative overflow-hidden h-56   ">
            <img className="rounded-lg w-full h-full object-cover" src={`http://localhost:8080${data.image}`} alt="" />
            {select === data.name && <DropSelect/>}
        </div>
    )
}
export default DropImg;