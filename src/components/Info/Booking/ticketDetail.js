import React from "react";
import Nav from "../../Navbar/nav";
import Footer from "../../Footer/footer";
import BookingTicket from "./bookingDetail";

const TicketDetail = () => {
    return (
        <div className="relative container text-gray-400 bg-customColor w-screen h-auto">
        <Nav />
        <BookingTicket/>
        <Footer />
       
    </div>
    )
}
export default TicketDetail;