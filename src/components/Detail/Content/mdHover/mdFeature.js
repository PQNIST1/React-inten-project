import React from "react";
import MidImg from "./mdImage";
import { Link } from "react-router-dom";
import { normalizeStringForURL } from "../../../../data/tranformData";
import { useDispatch, useSelector} from "react-redux";
import { setSelectedDate, setSelectedMovieId, setSelectedTime, setShowtimes } from "../../../../controller/SliceReducer/booking";
import { setShow, setStatus } from "../../../../controller/SliceReducer/addShowTime";

const MidFeature = ({ data }) => {
    const dispatch = useDispatch();
    const name = useSelector((state) => state.movie.selectedMovieName)
    const movieName = data.name;
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
        <div className="h-56 w-3/4">
            <Link to={pathname} onClick={handleResetId}>
                <MidImg data={data} path={pathname}/>
                <p className="text-left capitalize text-gray-400 mt-2 text-base font-bold">{data.name}</p>
            </Link>
        </div>
    )
}
export default MidFeature;