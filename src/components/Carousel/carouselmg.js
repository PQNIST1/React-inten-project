import React from "react";

const CarouselImg = ({data}) => {
    return (
        <div className="">
            <div className=''>
                <img className="max-h-96" src={data.image} alt="" />
            </div>
        </div>
    )
}
export default CarouselImg;