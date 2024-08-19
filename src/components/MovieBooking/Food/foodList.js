import React, { useEffect, useState } from "react";
import Food from "./food";
import { useDispatch, useSelector } from "react-redux";
import { getFood } from "../../../controller/SliceReducer/food";

const FoodList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFood());
    }, [dispatch])
    const foods = useSelector((state) => state.food.data);
    const [data, setData] = useState([]);
    const status = useSelector((state) => state.food.status);
    useEffect(() => {
        if (status === 'succeeded') {
            setData(foods);
        }
    }, [status, foods]);
    return (
        <div className="w-full space-y-5">
            <p className="font-bold text-lg">Chọn Combo</p>
            {data.data && (
                <>
                    {data.data.content.map((item) => (
                        <Food key={item.object.id} data={item.object} />
                    ))}
                </>
            )}

        </div>
    )
}
export default FoodList;

