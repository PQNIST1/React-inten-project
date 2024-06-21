import React, { useState } from "react";
import HoverMini from "./hoverMini";

const MiniImg = () => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative">
            <img className="rounded" src="https://i.imgur.com/lwcVJQi.jpeg" alt="" />
            {isHovered && <HoverMini />}
        </div>
    )
}
export default MiniImg;