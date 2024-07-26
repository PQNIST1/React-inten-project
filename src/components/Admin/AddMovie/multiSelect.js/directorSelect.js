import { useState, useEffect } from "react";
import React from "react";
import Select from "react-tailwindcss-select";
import { useDispatch, useSelector } from "react-redux";
import { getActor } from "../../../../controller/SliceReducer/addActor";
import { addDirector } from "../../../../controller/SliceReducer/moive";


const DirectorSelect = () => {
    const dispatch = useDispatch();
    const actors = useSelector((state) => state.actor.data);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const status = useSelector((state) => state.actor.status);
    const form = useSelector((state) => state.data);
    const {director} = form;

    const handleChange = value => {
        dispatch(addDirector(value)); 
        
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
            const newData = data.data.content.map((item) => item.object);
            setData1(newData);
        }
    }, [data]);

    const options = data1.map((item) => ({
        value: item.id,
        label: item.name,
        role: 1,
    }));
    return (
        <>
            {data1 && (
                <>
                    <Select
                        value={director}
                        onChange={handleChange}
                        options={options}
                        isClearable={true}
                        placeholder="Đạo diễn"
                        isSearchable={true}
                    />
                </>
            )}
        </>
    );
};

export default DirectorSelect;