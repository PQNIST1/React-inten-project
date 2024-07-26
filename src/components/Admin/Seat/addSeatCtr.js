import React from "react";
import AddSeatPrice from "./addSeatPrice";
import SeatList from "./seatList";

const AddSeatCtr = () => {
    return (
        <div className="flex  mt-10 mb-10 w-5/6 m-auto">
    
            <div className="w-4/5 pl-20">
                <SeatList />
            </div>
            <div className="">
                <AddSeatPrice />
            </div>
        </div>
    )
}
export default AddSeatCtr;