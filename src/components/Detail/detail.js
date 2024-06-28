import React from "react";
import Nav from "../Navbar/nav";
import Footer from "../Footer/footer";
import TrailerDetail from "./trailerDetail";
import { useSelector } from "react-redux";
import VideoModal from "../Moive/VideoModal";
import ContentDetail from "./ContentDetail";


const MovieDetail = () => {
    const modal = useSelector((state) => state.modal);
    return (
        <div className="relative container text-gray-400 bg-customColor w-screen h-auto">
        <Nav />
        <TrailerDetail/>
        <ContentDetail/>
        <Footer />
        {modal.isModalOpen && <VideoModal />}
    </div>
    )
}
export default MovieDetail;