import React from "react";
import Logo from "./logo";
import Ticket from "./ticket";
import Tasks from "./Task/task";
import Search from "./search";
import Userlog from "./userIslog";
import Logged from "./Task/logged";
const Nav = () => {
    const isLogged = true;
    return (
        <div className="flex w-10/12 mx-auto pt-3  text-gray-400 font-sans">
           <Logo/>
           <Ticket/>
           <Tasks/>
           <Search/>
           {isLogged ? (<Userlog/>):(<Logged/>)}
        </div>
    )
}

export default Nav;