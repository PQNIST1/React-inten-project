import React from "react";

const Seat = ({ data, title }) => {
    return (
        <div className="">
            <div className="border-t-2 border-dotted h-full pt-5 mb-5">
                <div className="flex text-sm">
                    <div className="w-1/2">
                        { title === 'Ghế đôi' ? (
                        <p><span className="font-bold">{data.length/2}x </span>{title}</p>
                        ):(
                        <p><span className="font-bold">{data.length}x </span>{title}</p>
                    )}
                        <p>
                            Ghế:{" "}
                            <span className="font-bold">
                                {data.map((item, index) => (
                                    <span key={index}>
                                        {item}
                                        {index < data.length - 1 ? ", " : ""}
                                    </span>
                                ))}
                            </span>
                        </p>


                    </div>
                    <div className="w-1/2 flex justify-end">
                        <p className="">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000 * data.length)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Seat;