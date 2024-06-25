import React from "react";
import MovieFeature from "./hoverFeature";

const MoiveHover = () => {
    return (
        <div className="rounded z-10 shadow-inner w-2/5 h-auto px-5 pt-5 bg-white absolute top-20 mt-1">
            <MovieFeature title={'Phim đang chiếu'} />
            <MovieFeature title={'Phim sắp chiếu'} />
        </div>
    )
}
export default MoiveHover;