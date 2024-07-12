import { useState, useEffect } from "react";
import React from "react";
import Select from "react-tailwindcss-select";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../../controller/SliceReducer/food";
import { addGenre } from "../../../../controller/SliceReducer/moive";


const CategorySelect = () => {
    const form = useSelector((state) => state.data);
    const { genres } = form;
    const dispatch = useDispatch();
    const categorys = useSelector((state) => state.food.data1);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const status = useSelector((state) => state.food.status);


    const handleChange = value => {
        dispatch(addGenre(value)); 
    };
    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);

    useEffect(() => {
        if (status === 'succeeded') {
            setData(categorys);
        }
    }, [status, categorys]);
    useEffect(() => {
        if (data && data.data) {
            const newData = data.data.map((item) => item.object);
            setData1(newData);
        }
    }, [data, dispatch]);

    const options = data1.map((item) => ({
        value: item.id,
        label: item.name,
    }));
    return (
        <>
            {data1 && (
                <>
                    <Select
                        value={genres}
                        onChange={handleChange}
                        options={options}
                        isMultiple={true}
                        isClearable={true}
                        placeholder="Thể loại"
                        isSearchable={true}
                    />
                </>
            )}
        </>
    );
};

export default CategorySelect;