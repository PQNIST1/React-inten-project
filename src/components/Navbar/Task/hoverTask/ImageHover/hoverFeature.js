import React from "react";
import MiniFeature from "./movieFeature";

const MovieFeature = ({ title, data }) => {
    return (
        <div className="text-gray-400 mb-5">
            <h1 className="border-l-4 border-blue-800 px-2 mb-3 hover:text-orange-400 uppercase">{title}</h1>
            <div className="grid grid-cols-4 gap-4">
                {data.map((item,index) => (
                   <div key={index}>
                   <MiniFeature  data={item.object}/>
                   </div>
                ))}
            </div>
        </div>
    )
}
export default MovieFeature;