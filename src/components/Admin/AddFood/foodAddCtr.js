import React from "react";
import FoodForm from "./AddFoodForm";
import FoodList from "./foodList";

const FoodAddCtr = () => {
    return (
        <div className="flex  mt-10 mb-10 w-5/6 m-auto">
            <div className="w-2/3 pl-32">
                <FoodList/>
            </div>
            <FoodForm/>
        </div>
    )
}
export default FoodAddCtr;