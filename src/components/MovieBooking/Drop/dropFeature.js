import React from "react";
import DropImg from "./dropImg";

const DropFeature = ({data, select}) => {
   
    return (
        <div className="xl:h-72 xl:w-44 lg:w-28 ">      
            <DropImg data={data.movie} select={select}/>
            <p className="text-left capitalize text-gray-400 mt-2 text-base font-bold lg:text-sm">{data.movie.name}</p>
        </div>
    )
}
export default DropFeature;