import React from "react";

const MoiveProduct = ({ data,title }) => {
    return (
        <div className="flex">
            <div className="w-20">
                <p className="">{title}:</p>
            </div>
            <div className="flex-wrap space-y-1 justify-center w-96">
                {data.map((item, index) => (
                    <button key={index} className="bg-orange-500 capitalize text-white rounded mr-1 p-1 hover:bg-orange-400">{item.gender}</button>
                ))}
            </div>
        </div>
    )
}
export default MoiveProduct;