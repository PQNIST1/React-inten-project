import React from "react";
import MidImg from "./mdImage";
import { Link } from "react-router-dom";
import { normalizeStringForURL } from "../../../../data/tranformData";


const MidFeature = ({ data }) => {
    const movieName = data.name;
    const pathname = `/detail/${normalizeStringForURL(movieName)}`;
    return (
        <div className="h-56 w-3/4">
            <Link to={pathname}>
                <MidImg data={data} path={pathname}/>
                <p className="text-left capitalize text-gray-400 mt-2 text-base font-bold">{data.name}</p>
            </Link>
        </div>
    )
}
export default MidFeature;