import React from "react";
import DropImg from "./dropImg";

const DropFeature = ({data, select}) => {
   
    return (
        <div className="">      
            <DropImg data={data} select={select}/>
            <p className="text-left capitalize text-gray-400 mt-2 text-base font-bold">{data.name}</p>
        </div>
    )
}
export default DropFeature;