import React from "react";
import {  useNavigate } from "react-router-dom";
import { normalizeStringForURL } from "../../../../../data/tranformData";


const HoverMini = ({data}) => {
    const movieName = data.name;
    const pathname = `/detail/${normalizeStringForURL(movieName)}`;
    const navigate = useNavigate();
    const handClick = () => {
        navigate(pathname);
    }
    return (
        <div className="">
            <div className="bg-black absolute h-full w-full rounded top-0 opacity-50  ">
            </div>
            <div onClick={handClick}>
                <div className="absolute bg-orange-500 top-1/3 mt-5 left-7 flex text-white p-1 rounded hover:bg-orange-400">
                    <img src="https://www.galaxycine.vn/_next/static/media/Vector-1.319a0d2b.svg" alt="" className="m-auto mr-1.5"/>
                    <p className="tex-sm m-auto">Mua vé</p>
                </div>
            </div>

        </div>

    )
}
export default HoverMini;