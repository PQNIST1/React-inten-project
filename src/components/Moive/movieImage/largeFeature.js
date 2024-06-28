import React from "react";
import LargeImg from "./largeImg";

const LargeFeature = ({data}) => {
    return (
        <div className="">
            <LargeImg data={data} />
            <p className="text-left capitalize text-gray-400 mt-2 text-base font-bold">Những mảnh ghép cảm xúc 2</p>
        </div>
    )
}
export default LargeFeature;