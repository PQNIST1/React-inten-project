import React from "react";
import { useDispatch,  useSelector } from "react-redux";
import { addFood, removeFood } from "../../../controller/SliceReducer/booking";
import { imageUrl } from  "../../../controller/SliceReducer/img";


const Food = ({ data }) => {
    const dispatch = useDispatch();
    const selectedFood = useSelector((state) => state.movie.selectedFood);
    const foodItem = selectedFood.find((item) => item.foodId === data.name);
    const quantity = foodItem ? foodItem.quantity : 0;


   
    const handleIncrement = (foodId) => {
        dispatch(addFood({ foodId,  id:data.id , quantity: 1, price:data.price, image:data.image}));
    };

    const handleDecrement = (foodId) => {
        if (quantity > 0) {
            dispatch(removeFood({ foodId, quantity: 1 }));
        }
    };
    return (
        <div className="flex">
            <div className="flex mb-4 w-3/4">
                <img src={`${imageUrl}${data.image}`} alt="" className="h-24 w-44 rounded" />
                <div className="text-sm ml-3 space-y-2">
                    <p className="font-bold">{data.name}</p>
                    <p className="text-sm">{data.detail}</p>
                    <p className="font-bold">Giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price)}
                    </p>
                </div>
            </div>
            <div className="flex w-1/4 justify-end text-lg space-x-5 pr-24 pt-6 ">
                <div>
                    <button className="px-2" onClick={() => handleDecrement(data.name)}>-</button>
                </div>
                <p>{quantity}</p>
                <div>
                    <button className="px-2" onClick={() => handleIncrement(data.name)}>+</button>
                </div>
            </div>
        </div>
    )
}
export default Food;