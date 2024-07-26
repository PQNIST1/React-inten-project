import React from "react";

const Box = ({ data }) => {
    return (
        <div className="mx-14 space-y-5">
            <h5 className="font-bold text-white uppercase">{data.title}</h5>
            {data.items.map((item, index) => (
                <p key={index} className="text-sm capitalize">{item.title}</p>
            ))}
        </div>
    )
}

export default Box;