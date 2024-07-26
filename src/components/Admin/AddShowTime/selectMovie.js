import React, { useState, useEffect } from "react";
import Select from "react-tailwindcss-select";
import { useDispatch, useSelector } from "react-redux";
import { getMovie } from "../../../controller/SliceReducer/moive";
import { setMovie } from "../../../controller/SliceReducer/addShowTime";


const MovieSelect = () => {
    const { movie } = useSelector((state) => state.showTime);
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.data.data);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const status = useSelector((state) => state.data.status);


    const handleChange = value => {
        dispatch(setMovie(value));
    };
    useEffect(() => {
        dispatch(getMovie());
    }, [dispatch]);

    useEffect(() => {
        if (status === 'succeeded') {
            setData(movies);
        }
    }, [status, movies]);
    useEffect(() => {
        if (data && data.data) {
            const newData = data.data.content.map((item) => item.object);
            setData1(newData);
        }
    }, [data, dispatch]);

    const options = data1.map((item) => ({
        value: item.id,
        label: item.name,
        duration: item.duration
    }));

    return (
        <>
            {data1 && (
                <>
                    <Select
                        value={movie}
                        onChange={handleChange}
                        options={options}
                        isMultiple={false}
                        isClearable={true}
                        placeholder="Phim"
                        isSearchable={true}
                    />
                </>
            )}
        </>
    );
};

export default MovieSelect;