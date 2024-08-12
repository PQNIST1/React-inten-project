import React from "react";
import { useSelector } from "react-redux";
import Nav from "../../Navbar/nav";
import TabsBooking from "./TabsBooking";
import Footer from "../../Footer/footer";
import TicketCtr from "./Ticket/ticketCtr";
import MovieCtr from "./MovieReport/movieCtr";
import DailyCtr from "./DailyReport/dailyCtr";
import MonthCtr from "./MonthReport/monthCtr";

const BookingUsers = () => {
    const activeTab = useSelector((state) => state.tab.activeTab);

    return (
        <div className="relative container text-gray-400 bg-customColor w-screen h-auto">
            <Nav />
            <TabsBooking />
            {activeTab === 'ticket' && <TicketCtr />}
            {activeTab === 'movie' && <MovieCtr />}
            {activeTab === 'daily' && <DailyCtr />}
            {activeTab === 'month' && <MonthCtr />}
            <Footer />
        </div>
    )
}
export default BookingUsers