import React from "react";
import Nav from "../../../Navbar/nav";
import Footer from "../../../Footer/footer";
import CreateSeat from "./createSeat";
import SelectedRoom from "./selectedRoom";

const SeatCtr = () => {
    return (
        <div className="relative container text-gray-400 bg-customColor w-screen h-auto">
            <Nav />
            <div className="w-5/6 m-auto flex">
                <CreateSeat />
                <div className="w-1/4">
                    <SelectedRoom/>
                </div>
            </div>
            <Footer />

        </div>
    )
}
export default SeatCtr;