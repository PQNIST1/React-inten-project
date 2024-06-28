import React from "react";
import MidImg from "./mdImage";


const MidFeature = ({data}) => {
    return (
        <div className="h-56 w-3/4">
            <MidImg data={data} />
            <p className="text-left capitalize text-gray-400 mt-2 text-base font-bold">Những mảnh ghép cảm xúc 2</p>
        </div>
    )
}
export default MidFeature;