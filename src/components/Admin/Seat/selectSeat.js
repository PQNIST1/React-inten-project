import { useState, useEffect } from "react";
import React from "react";
import Select from "react-tailwindcss-select";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../controller/SliceReducer/food";
import { setType_id } from "../../../controller/SliceReducer/seat";


const SeatSelect = () => {
    const form = useSelector((state) => state.seat);
    const { type_id } = form;
    const dispatch = useDispatch();
    const seats = useSelector((state) => state.seat.data);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const status = useSelector((state) => state.seat.status);


    const handleChange = value => {
        dispatch(setType_id(value)); 
    };
    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);

    useEffect(() => {
        if (status === 'succeeded') {
            setData(seats);
        }
    }, [status, seats]);
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
                        value={type_id}
                        onChange={handleChange}
                        options={options}
                        isClearable={true}
                        placeholder="Ghế"
                        isSearchable={true}
                    />
                </>
            )}
        </>
    );
};

export default SeatSelect;