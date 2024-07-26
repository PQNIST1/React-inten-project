import React from "react";
import Nav from "../../Navbar/nav";
import Footer from "../../Footer/footer";
import Booking from "../Bill/booking"

const Room = () => {
    return (
        <div className="relative container text-gray-400 bg-customColor w-screen h-auto">
            <Nav />
            <Booking />
            <Footer />
        </div>
    )
}
export default Room;