import { useState, useEffect } from "react";
import React from "react";
import Select from "react-tailwindcss-select";
import { useDispatch, useSelector } from "react-redux";
import { getActor } from "../../../../controller/SliceReducer/food";
import { addCast } from "../../../../controller/SliceReducer/moive";


const ActorSelect = () => {
    const dispatch = useDispatch();
    const actors = useSelector((state) => state.food.data2);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const status = useSelector((state) => state.food.status);
    const form = useSelector((state) => state.data);
    const {casts} = form;

    const handleChange = value => {
        dispatch(addCast(value));  
    };
    useEffect(() => {
        dispatch(getActor());
    }, [dispatch]);

    useEffect(() => {
        if (status === 'succeeded') {
            setData(actors);
        }
    }, [status, actors]);
    useEffect(() => {
        if (data && data.data) {
            const newData = data.data.map((item) => item.object);
            setData1(newData);
        }
    }, [data]);

    const options = data1.map((item) => ({
        value: item.id,
        label: item.name,
        role: 0,
    }));
    return (
        <>
            {data1 && (
                <>
                    <Select
                        value={casts}
                        onChange={handleChange}
                        options={options}
                        isMultiple={true}
                        isClearable={true}
                        placeholder="Diễn viên"
                        isSearchable={true}
                    />
                </>
            )}
        </>
    );
};

export default ActorSelect;