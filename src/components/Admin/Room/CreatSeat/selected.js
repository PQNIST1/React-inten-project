import React, { useState, useEffect } from "react";
import Select from "react-tailwindcss-select";
import { useDispatch, useSelector } from "react-redux";
import { getRoom } from "../../../../controller/SliceReducer/addRoom";
import { setRoom } from "../../../../controller/SliceReducer/addShowTime";
import { getSeatss } from "../../../../controller/SliceReducer/seatsSlice";


const RoomSelect = () => {
    const form = useSelector((state) => state.showTime);
    const { room, roomCtr } = form;
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.room.data);
    const seats = useSelector((state) => state.seats.data);
    const success = useSelector((state) => state.seats.success);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [optionee, setOptionee] = useState([]);
    const status = useSelector((state) => state.room.status);


    const handleChange = value => {
        dispatch(setRoom(value));
    };
    useEffect(() => {
        dispatch(getRoom());
        dispatch(getSeatss());
    }, [dispatch]);

    useEffect(() => {
        if (status === 'succeeded') {
            setData(rooms);
        }
    }, [status, rooms]);
    useEffect(() => {
        if (data && data.data) {
            const newData = data.data.content.map((item) => item.object);
            setData1(newData);
        }
    }, [data, dispatch]);
   
    useEffect(() => {
        if (success) {
            dispatch(getSeatss());
        }
    }, [success, dispatch]);

    const options = data1.map((item) => ({
        value: item.id,
        label: item.name,
    }))

    useEffect(() => {
        if (options.length > 0 && seats.data) {
    
            const existingIds = [...new Set(seats.data.content.map(item => item.object.room.id))];

            // Compute filteredOptions
            const filteredOptions = options
                .filter(option => existingIds.includes(option.value))
                .reduce((acc, option) => {
                    if (!acc.find(o => o.value === option.value)) {
                        acc.push(option);
                    }
                    return acc;
                }, []);

            const missingOptions = options
                .filter(option => !existingIds.includes(option.value))
                .reduce((acc, option) => {
                    if (!acc.find(o => o.value === option.value)) {
                        acc.push(option);
                    }
                    return acc;
                }, []);

            if (roomCtr) {
                if (missingOptions && !isEqual(missingOptions, optionee)) {
                    setOptionee(missingOptions);
                }
            } else if (filteredOptions && !isEqual(filteredOptions, optionee)) {
                setOptionee(filteredOptions);
            }
            
        }
    }, [options, seats.data, optionee, roomCtr]);

    // Utility function to check if two arrays of objects are equal
    const isEqual = (arr1, arr2) => {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i].value !== arr2[i].value) return false;
        }
        return true;
    };
    return (
        <>
            {data1 && (
                <>
                    <Select
                        value={room}
                        onChange={handleChange}
                        options={optionee}
                        isMultiple={false}
                        isClearable={true}
                        placeholder="Phòng"
                        isSearchable={true}
                    />
                </>
            )}
        </>
    );
};

export default RoomSelect;