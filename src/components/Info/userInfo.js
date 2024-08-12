import React from "react";
import Nav from "../Navbar/nav";
import Footer from "../Footer/footer";
import UserBlog from "./userBlog";


const UserInfo = () => {
   
    return (
        <div className="relative container text-gray-400 bg-customColor w-screen h-auto">
                <Nav />
                <UserBlog />
                <Footer />
        </div>
    )
}

export default UserInfo;