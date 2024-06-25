import React from "react";
import Nav from "./Navbar/nav";
import CarouselSlider from "./Carousel/carousel";
import Moive from "./Moive/moive";
import WebFeature from "./Footer/webFeature";
import Footer from "./Footer/footer";
import { useSelector } from "react-redux";
import VideoModal from "./Moive/VideoModal";

const Home = () => {
    const modal = useSelector((state) => state.modal);
    return (
        <div className="relative container text-gray-400 bg-customColor w-screen h-auto">
            <Nav />
            <CarouselSlider />
            <Moive />
            <WebFeature />
            <Footer />
            {modal.isModalOpen && <VideoModal />}
        </div>
    )
}
export default Home;