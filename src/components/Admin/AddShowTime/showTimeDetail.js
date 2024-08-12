import React from "react";
import Nav from "../../Navbar/nav";
import Footer from "../../Footer/footer";
import Detail from "./detail";
import ShowTimeForm from "./showTimeForm";
import { useSelector } from "react-redux";

const ShowTimeDetail = () => {
    const form = useSelector((state) => state.showTime);
    const { isEdit } = form;
    return (
        <div className="relative container text-gray-400 bg-customColor w-screen  flex flex-col min-h-screen">
            <Nav />
            <div className="w-5/6 m-auto flex justify-center">
                <div className="w-3/4 pl-20">
                    <Detail />
                </div>
                <div className=" w-1/4 mt-10">
                    {isEdit && (
                        <ShowTimeForm />
                    )}
                </div>
            </div>

            <Footer />

        </div>
    )
}
export default ShowTimeDetail;          