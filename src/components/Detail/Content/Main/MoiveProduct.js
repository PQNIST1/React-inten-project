import React from "react";
import { Link } from "react-router-dom";

const MoiveProduct = ({ data, title }) => {
    return (
        <div className="flex">
            <div className="w-20">
                <p>{title}:</p>
            </div>
            <div className="flex-wrap w-96 flex">
                {data.map((item, index) => (
                    <div key={index}>
                        <Link to='/category'>
                            <button className="bg-orange-500 capitalize text-white rounded mr-1 p-1 mt-1 hover:bg-orange-400">
                                {item.name}
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default MoiveProduct;