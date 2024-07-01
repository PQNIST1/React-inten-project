import React from "react";
import { Link } from "react-router-dom";

const MoiveProduct = ({ data, title }) => {
    return (
        <div className="flex">
            <div className="w-20">
                <p className="">{title}:</p>
            </div>
            <div className="flex-wrap  justify-center w-96">
                {data.map((item, index) => (
                    <>
                        <Link to={'/category'}>
                            <button key={index} className="bg-orange-500 capitalize text-white rounded mr-1 p-1 mt-1 hover:bg-orange-400">{item.gender}</button>
                        </Link>
                    </>
                ))}
            </div>
        </div>
    )
}
export default MoiveProduct;