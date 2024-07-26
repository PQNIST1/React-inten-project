import React from "react";
import MoviesTabs from "./tasks";






const MoiveList = () => {
    return (
        <div className="h-8 flex">
            <div className="border-l-4 border-blue-800 font-bold h-full">
                <h1 className="mr-10 text-xl font-bold not-italic uppercase inline ml-3 text-gray-600">Phim</h1>
            </div>
            <MoviesTabs/>
        </div>
    )
}
export default MoiveList;