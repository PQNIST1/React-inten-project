import React from "react";
import DetailListing from "../detailList";
import { dataShowing } from "../../../../data/hashData";

const MoiveContent = () => {
    const data = dataShowing.slice(0,3);
    return (
        <div className=" h-full w-1/3 pl-5 pt-5">
            <div className="border-l-4 border-blue-800 font-bold h-6 flex mb-4">
                <h1 className="mr-10 uppercase inline ml-3 text-white my-auto text-lg">phim đang chiếu</h1>
            </div>
            <DetailListing data={data}/>
        </div>

    )
}
export default MoiveContent;