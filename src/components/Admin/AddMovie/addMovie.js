import React from "react";
import MovieAddCtr from "./movieAddCtr";
import Nav from "../../Navbar/nav";
import Footer from "../../Footer/footer";

const MovieAdd = () => {
    return (
        <div className="relative container text-gray-400 bg-customColor w-screen h-auto">
            <Nav />
            <MovieAddCtr />
            <Footer />
        </div>
    )
}
export default MovieAdd;