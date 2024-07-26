import React from "react";

const Ticket = () => {
    return (
        <div>
            <div className="h-11 absolute border-2 w-11 rounded-full top-1/3 -left-5 mt-2"></div>
            <div className="h-11 absolute border-2 w-11 rounded-full top-1/3 -right-5 mt-2"></div>
            <div className="w-2 h-16 border-l-2 absolute top-0 left-0"></div>
            <div className="w-2 h-15 border-l-2 absolute bottom-0 left-0"></div>
            <div className="w-2 h-16 border-r-2 absolute top-0 right-0"></div>
            <div className="w-2 h-15 border-r-2 absolute bottom-0 right-0"></div>
            <div className="w-2 h-full border-r-2 absolute top-0 border-dotted right-1/3"></div>
        </div>
    )
}
export default Ticket;