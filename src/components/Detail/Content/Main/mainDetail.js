import React from "react";

const MainDetail = ({data}) => {
    return (
        <div className="w-full mb-5">
            <div className="border-l-4 border-blue-800 font-bold h-7 flex mb-4">
                <h1 className="mr-10 capitalize inline ml-3 text-white my-auto">nội dung phim</h1>
            </div>
            <div className="text-justify text-sm">
                <p>{data.overview}</p>
            </div>
        </div>
    )
}
export default MainDetail;