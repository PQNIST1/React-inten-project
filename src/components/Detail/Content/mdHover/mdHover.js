import React from "react";
import { useNavigate } from "react-router-dom";


const MidMini = ({path}) => {
    const navigate = useNavigate();
    const handClick = () => {
        navigate(path);
    }
    return (
        <div className="">
            <div className="bg-black absolute h-full w-full rounded top-0 opacity-50  ">
            </div>
            <div onClick={handClick}>
                <div className="absolute bg-orange-500 top-1/3 mt-5 left-1/3 flex text-white p-2 rounded hover:bg-orange-400">
                    <img src="https://www.galaxycine.vn/_next/static/media/Vector-1.319a0d2b.svg" alt="" className="m-auto mr-1.5"/>
                    <p className="tex-sm m-auto">Mua vé</p>
                </div>
            </div>

        </div>

    )
}
export default MidMini;