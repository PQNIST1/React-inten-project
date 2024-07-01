import React from "react";
import Nav from "../Navbar/nav";
import Footer from "../Footer/footer"
import Category from "./category";

const MovieCategory = () => {
    return (
        <div className="relative container text-gray-400 bg-customColor w-screen h-auto">
        <Nav />
        <Category/>
        <Footer />
    </div>
    )
}
export default MovieCategory;