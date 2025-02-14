import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const DropSelect = () => {
    return (
        <div className="">
            <div className="bg-black absolute h-full w-full rounded top-0 opacity-50  ">
            </div>
            <div className="absolute bg-transparent xl:top-1/4 mt-10  xl:left-1/3 lg:top-1/4 lg:left-1/4 flex text-white ml-2">
                <button className="rounded-full border-2 border-orange-500 h-10 w-10">
                    <FontAwesomeIcon icon={faCheck} />
                </button>
            </div>

        </div>
    )
}
export default DropSelect;