import React from "react";
import { Link } from "react-router-dom";
const Ticket = () => {
    return (
        <div className="my-auto ml-16">
            <Link to="/">
                <img className="h-8" src="https://i.imgur.com/k2gm8R6.png" alt="Ticket" />
            </Link>
        </div>
    )
}
export default Ticket;