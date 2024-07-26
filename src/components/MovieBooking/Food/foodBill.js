import React from "react";
import FoodBillDetail from "./foodBillDetail";
import { useSelector } from "react-redux";

const FoodBill = () => {
    const selectedFood = useSelector(state => state.movie.selectedFood)
    return (
        <div className="border-t-2 border-dotted pt-5">
        {selectedFood.map((food,index)=>(
            <FoodBillDetail data={food} key={index}/>
        ))}
        </div>
    )
}
export default FoodBill;