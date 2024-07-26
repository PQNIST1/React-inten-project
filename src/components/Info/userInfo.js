import React from "react";
import Nav from "../Navbar/nav";
import Footer from "../Footer/footer";
import UserBlog from "./userBlog";
import { useEffect } from "react";

const UserInfo = () => {
    const accessToken = localStorage.getItem('accessToken');
    useEffect(() => {
        if (!accessToken) {
            window.location.href = '/login';
        }
    }, [accessToken]);
    return (
        <div className="relative container text-gray-400 bg-customColor w-screen h-auto">
            <Nav />
            {accessToken && <UserBlog/>}
            <Footer />
        </div>
    )
}

export default UserInfo;