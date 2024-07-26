import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const DropSelect = () => {
    return (
        <div className="">
            <div className="bg-black absolute h-full w-full rounded top-0 opacity-50  ">
            </div>
            <div className="absolute bg-transparent top-1/4 mt-10  left-1/3 flex text-white ml-2">
                <button className="rounded-full border-2 border-orange-500 h-10 w-10">
                    <FontAwesomeIcon icon={faCheck} />
                </button>
            </div>

        </div>
    )
}
export default DropSelect;