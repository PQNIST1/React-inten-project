import React from "react";
import TextDetail from "./Content/TextDetail";
import MainDetail from "./Content/Main/mainDetail";
import TimeDetail from "./Content/timeDetail";
import MoiveContent from "./Content/Main/MovieContent";

const ContentDetail = () => {
    return (
        <div className="w-5/6   m-auto relative  flex mb-20">
            <div className="border-2 rounded w-72 h-96 absolute -top-14 box-content left-0">
                <img src="https://cdn.galaxycine.vn/media/2024/6/7/gtcn-500_1717732724699.jpg" alt="" className="w-72 h-96 object-fill rounded" />
            </div>

            <div className=" w-2/3">
                <div className="flex mb-14">
                    <div className="w-72">    
                    </div>
                    <TextDetail />
                </div>
                <MainDetail/>
                <TimeDetail/>
            </div>
            <MoiveContent/>
        </div>
    )
}
export default ContentDetail;