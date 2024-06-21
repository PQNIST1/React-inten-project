import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";

const HoverMini = () => {
    return (
        <div className="">
            <div className="bg-black absolute h-full w-full rounded top-0 opacity-50 ">
            </div>
            <Link>
                <div className="absolute bg-orange-500 top-1/3 mt-5 left-7 flex text-white p-1 rounded hover:bg-orange-400">
                    <FontAwesomeIcon icon={faTicket}  className="m-auto pr-1"/>
                    <p className="capitalize tex-sm m-auto">Mua vé</p>
                </div>
            </Link>

        </div>

    )
}
export default HoverMini;