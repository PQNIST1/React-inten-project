import React from "react";
import TextDetail from "./Content/TextDetail";
import MainDetail from "./Content/Main/mainDetail";
import TimeDetail from "./Content/timeDetail";
import MoiveContent from "./Content/Main/MovieContent";


const ContentDetail = ({ data }) => {
    return (
        <div className="w-5/6   m-auto relative  flex mb-20">
            <div className="border-2 rounded xl:w-72 lg:w-60 xl:h-96 lg:h-96  absolute xl:-top-14 lg:-top-8 box-content left-0">
                <img src={`${data.image}`} alt="" className="w-full h-full object-fill rounded" />
            </div>

            <div className=" w-2/3">
                <div className="flex mb-14">
                  
                    <TextDetail data={data}/>
                </div>
                <MainDetail data={data} />
                <TimeDetail />
            </div>
            <div className="w-1/3">
                <MoiveContent />
            </div>
        </div>
    )
}
export default ContentDetail;