import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearBooking } from "../../controller/SliceReducer/booking";
const Ticket = () => {
    const dispatch = useDispatch();
    const handleClear = () => {
        dispatch(clearBooking());
    }
    return (
        <div className="my-auto ml-16">
            <Link to="/booking/#movie" onClick={handleClear}>
                <img className="h-8" src="https://i.imgur.com/k2gm8R6.png" alt="Ticket" />
            </Link>
        </div>
    )
}
export default Ticket;