import React from "react";
import MiniImg from "./miniImg";
import { Link } from "react-router-dom";
import { normalizeStringForURL } from "../../../../../data/tranformData";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDate, setSelectedMovieId, setSelectedTime, setShowtimes } from "../../../../../controller/SliceReducer/booking";
import { setShow, setStatus } from "../../../../../controller/SliceReducer/addShowTime";

const MiniFeature = ({ data }) => {
    const movieName = data.name;
    const dispatch = useDispatch();
    const name = useSelector((state) => state.movie.selectedMovieName)
    const pathname = `/detail/${normalizeStringForURL(movieName)}`;
    const handleResetId = () => {
        if (name !== movieName) {
            dispatch(setSelectedMovieId(''));
            dispatch(setSelectedDate(''));
            dispatch(setSelectedTime(''));
            dispatch(setShow([]));
            dispatch(setShowtimes([]));
            dispatch(setStatus());
        }
       
    }
    return (
        <div className="">
            <Link to={pathname} onClick={handleResetId}>
                <MiniImg  data={data}/>
                <p className="text-left capitalize text-gray-500 mt-2 text-sm">{data.name}</p>
            </Link>
        </div>
    )
}

export default MiniFeature;