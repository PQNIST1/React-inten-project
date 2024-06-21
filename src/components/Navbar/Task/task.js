import React from "react";
import MovieTask from "./movieTask";
import CreatorTask from "./creatorTask";
import TicketPrice from "./ticketPrice";

const Tasks = () => {
    return (
        <div className="flex h-10 my-auto mx-8 space-x-6">
            <MovieTask />
            <CreatorTask/>
            <TicketPrice/>
        </div>
    )
}
export default Tasks;