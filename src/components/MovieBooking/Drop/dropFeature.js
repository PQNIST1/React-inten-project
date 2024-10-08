import React from "react";
import DropImg from "./dropImg";

const DropFeature = ({data, select}) => {
   
    return (
        <div className="h-72 w-44">      
            <DropImg data={data.movie} select={select}/>
            <p className="text-left capitalize text-gray-400 mt-2 text-base font-bold">{data.movie.name}</p>
        </div>
    )
}
export default DropFeature;