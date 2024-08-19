import React from "react";
import Food from "../../Info/Booking/foodDetail";
import { useSelector } from "react-redux";

const getTotalFoodPrice = (selectedFood) => {
    return selectedFood.reduce((total, food) => total + (food.price * food.quantity), 0);
};
const getTotalFood = (selectedFood) => {
    return selectedFood.reduce((total, food) => total + (food.quantity), 0);
};

const FoodCf = () => {
    const foods = useSelector((state)=> state.movie.selectedFood);
    const getTotalPrice = getTotalFoodPrice(foods);
    const getTotal = getTotalFood(foods);
    return (
        <div className="w-1/2">
            <div className="pl-5">
                <p className="text-lg font-bold mb-2">Đồ ăn</p>
                <div className="">
                {foods.map((food, index)=>(
                    <Food key={index} data={food}/>
                ))}
                </div>
                <div className="border-t-2 border-dotted flex space-x-20 pt-5 mt-5 ">
                    <div className="">
                        <p className="font-bold">Số lượng</p>
                        <p>{getTotal}</p>
                    </div>
                    <div className="capitalize">
                        <p className="font-bold">Tổng cộng</p>
                        <p className="">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(getTotalPrice)}
                        </p>
                    </div>
                </div>


            </div>
        </div>
    )
}
export default FoodCf;
