import React from "react";
import MovieCf from "./moiveCf";
import FoodCf from "./foodCf";

const Comfirm = () => {
    return (
        <div className="w-full">
            <div className="flex pr-10">
                <MovieCf />
                <FoodCf />

            </div>
            <div className="space-y-3">
                <p className="mt-5">Phương thức thanh toán:</p>
                <div className="flex space-x-3">
                    <img src="https://cdn.galaxycine.vn/media/2020/10/20/momo-icon_1603203874499.png" alt="" className="h-10" />
                    <p className="m-auto">Ví MoMo</p>
                </div>
            </div>
        </div>
    )
}
export default Comfirm;