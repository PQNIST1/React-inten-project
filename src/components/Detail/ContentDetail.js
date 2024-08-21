import React from "react";
import TextDetail from "./Content/TextDetail";
import MainDetail from "./Content/Main/mainDetail";
import TimeDetail from "./Content/timeDetail";
import MoiveContent from "./Content/Main/MovieContent";
import { imageUrl } from  "../../controller/SliceReducer/img";

const ContentDetail = ({ data }) => {
    return (
        <div className="w-5/6   m-auto relative  flex mb-20">
            <div className="border-2 rounded w-72 h-96 absolute -top-14 box-content left-0">
                <img src={`${imageUrl}${data.image}`} alt="" className="w-72 h-96 object-fill rounded" />
            </div>

            <div className=" w-2/3">
                <div className="flex mb-14">
                    <div className="w-72">
                    </div>
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