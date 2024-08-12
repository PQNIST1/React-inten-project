import React from "react";
import Nav from "../Navbar/nav";
import Footer from "../Footer/footer";
import { useSelector} from "react-redux";
import VideoModal from "../Moive/VideoModal";
import MoreMoive from "./moreMovie";


const More = () => {
    const modal = useSelector((state) => state.modal);
    

    return (
        <div className="relative container text-gray-400 bg-customColor w-screen h-auto">
            <Nav />
            <MoreMoive/>
            <Footer />
            {modal.isModalOpen && <VideoModal />}
        </div>
    )
}
export default More;