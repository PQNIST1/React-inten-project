import React from "react";
import Logo from "./logo";
import Ticket from "./ticket";
import Tasks from "./Task/task";
import Search from "./search";
import Userlog from "./userIslog";
const Nav = () => {
    return (
        <div className="flex w-10/12 mx-auto pt-3  text-gray-400 font-sans">
           <Logo/>
           <Ticket/>
           <Tasks/>
           <Search/>
           <Userlog/>
        </div>
    )
}

export default Nav;