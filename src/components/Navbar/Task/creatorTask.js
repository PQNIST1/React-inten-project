import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import CreatorHover from "./hoverTask/creatorHover";

const CreatorTask = () => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="my-auto hover:text-yellow-400 flex h-12 mt-1.5">
            <h6>Góc Điện Ảnh</h6>
            <FontAwesomeIcon icon={faAngleDown} className="mt-1 text-sm ml-1" />
            {isHovered && <CreatorHover/>}
        </div>
    )
}
export default CreatorTask;