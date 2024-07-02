import React from "react";
import Food from "./food";
import { foods } from "../../../data/hashData";

const FoodList = () => {
    const data = foods;

    return (
        <div className="w-full space-y-5">
            <p className="font-bold text-lg">Chọn Combo</p>
            {data.map((item)=> (
                <Food key={item.id} data={item} />
            ))}
        </div>
    )
}
export default FoodList;