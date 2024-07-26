import React from "react";
import Nav from "../../../Navbar/nav";
import Footer from "../../../Footer/footer";
import SeatEdit from "./seatsEdit";

const RoomSeat = () => {
    return (
        <div className="relative container text-gray-400 bg-customColor w-screen  flex flex-col min-h-screen">
        <Nav />
        <div className="w-5/6 m-auto flex">
           <SeatEdit/>
        </div>
      
        <Footer />

    </div>
    )
}
export default RoomSeat;