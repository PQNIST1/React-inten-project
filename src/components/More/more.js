import React, {useEffect} from "react";
import Nav from "../Navbar/nav";
import Footer from "../Footer/footer";
import { useSelector, useDispatch } from "react-redux";
import VideoModal from "../Moive/VideoModal";
import MoreMoive from "./moreMovie";
import { getMovie } from "../../controller/SliceReducer/moive";
const More = () => {
    const modal = useSelector((state) => state.modal);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMovie()); 
    }, [dispatch])
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