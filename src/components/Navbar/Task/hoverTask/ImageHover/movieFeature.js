import React from "react";
import MiniImg from "./miniImg";
import { Link } from "react-router-dom";
import { normalizeStringForURL } from "../../../../../data/tranformData";

const MiniFeature = ({ data }) => {
    const movieName = data.name;
    const pathname = `/detail/${normalizeStringForURL(movieName)}`;
    return (
        <div className="">
            <Link to={pathname}>
                <MiniImg  data={data}/>
                <p className="text-left capitalize text-gray-500 mt-2 text-sm">{data.name}</p>
            </Link>
        </div>
    )
}

export default MiniFeature;