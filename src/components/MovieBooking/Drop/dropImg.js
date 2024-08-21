import React from "react";
import DropSelect from "./dropSelect";
import { imageUrl } from  "../../../controller/SliceReducer/img";


const DropImg = ({data, select}) => {
    return (
        <div className="relative overflow-hidden h-56   ">
            <img className="rounded-lg w-full h-full object-cover" src={`${imageUrl}${data.image}`} alt="" />
            {select === data.name && <DropSelect/>}
        </div>
    )
}
export default DropImg;