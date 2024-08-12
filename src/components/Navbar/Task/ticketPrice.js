import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
const TicketPrice = () => {
    return (
        <div
            className="my-auto hover:text-yellow-400 flex h-12 mt-1.5">
            <h6>Giá Vé</h6>
            <FontAwesomeIcon icon={faAngleDown} className="mt-1 text-sm ml-1" />
        </div>
    )
}

export default TicketPrice;