import React from "react";
import { useDispatch } from "react-redux";
import { addFood,removeFood } from "../../../controller/SliceReducer/booking";
import { useSelector } from "react-redux";


const Food = ({data}) => {
    const dispatch = useDispatch();
    const selectedFood = useSelector((state) => state.movie.selectedFood);
    const foodItem = selectedFood.find((item) => item.foodId === data.name);
    const quantity = foodItem ? foodItem.quantity : 0;

  

    const handleIncrement = (foodId) => {
       
        dispatch(addFood({ foodId, quantity: 1 }));
    };

    const handleDecrement = (foodId) => {
        if (quantity > 0) {
            dispatch(removeFood({ foodId, quantity: 1 }));
        }
    };
    return(
        <div className="flex">
        <div className="flex mb-4 w-1/2">
            <img src="https://cdn.galaxycine.vn/media/2024/3/29/menuboard-coonline-2024-combo1-copy-min_1711699814762.jpg" alt="" className="h-24 rounded" />
            <div className="text-sm ml-3 space-y-2">
                <p className="font-bold">{data.name}</p>
                <p className="text-sm">{data.detail}</p>
                <p className="font-bold">Giá: <span>{data.price}</span> ₫</p>
            </div>
        </div>
        <div className="flex w-1/2 justify-end text-lg space-x-5 pr-24 pt-6">
            <div>
                <button className="px-2" onClick={()=>handleDecrement(data.name)}>-</button>
            </div>
            <p>{quantity}</p>
            <div>
                <button className="px-2" onClick={()=>handleIncrement(data.name)}>+</button>
            </div>
        </div>
    </div>
    )
}
export default Food;