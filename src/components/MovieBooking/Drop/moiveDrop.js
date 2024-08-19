import React from "react";
import Dropdown from "./dropButton";
import DropTime from "./dropTime";

const MovieDrop = () => {
   
    return (
        <div className="w-full ">
            <div className="p-4 w-full space-y-10">
                <Dropdown/>
                <DropTime/>
            </div>
        </div>
    )
}
export default MovieDrop;
