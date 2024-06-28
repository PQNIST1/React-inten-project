import React from "react";
import MiniFeature from "./movieFeature";
import { Link } from "react-router-dom";

const MovieFeature = ({ title, data }) => {
    data = [1, 2, 3, 4]
    return (
        <div className="text-gray-400 mb-5">
            <h1 className="border-l-4 border-blue-800 px-2 mb-3 hover:text-orange-400 uppercase">{title}</h1>
            <div className="grid grid-cols-4 gap-4">
                {data.map(item => (
                    <Link to='/detail'>
                        <MiniFeature />
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default MovieFeature;