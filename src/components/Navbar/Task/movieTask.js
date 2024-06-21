import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import MoiveHover from "./hoverTask/movieHover";

const MovieTask = () => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="my-auto hover:text-yellow-400 flex  h-12 mt-1.5">
            <h6>Phim</h6>
            <FontAwesomeIcon icon={faAngleDown} className="mt-1 text-sm ml-1" />
            {isHovered && <MoiveHover/>}
        </div>
    )
}
export default MovieTask;