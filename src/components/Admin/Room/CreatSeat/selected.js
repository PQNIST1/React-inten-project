import React, { useState, useEffect }  from "react";
import Select from "react-tailwindcss-select";
import { useDispatch, useSelector } from "react-redux";
import { getRoom } from "../../../../controller/SliceReducer/addRoom";
import { setRoom } from "../../../../controller/SliceReducer/addShowTime";


const RoomSelect = () => {
    const form = useSelector((state) => state.showTime);
    const { room } = form;
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.room.data);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const status = useSelector((state) => state.room.status);


    const handleChange = value => {
        dispatch(setRoom(value)); 
    };
    useEffect(() => {
        dispatch(getRoom());
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

    const options = data1.map((item) => ({
        value: item.id,
        label: item.name,
    }));
    return (
        <>
            {data1 && (
                <>
                    <Select
                        value={room}
                        onChange={handleChange}
                        options={options}
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