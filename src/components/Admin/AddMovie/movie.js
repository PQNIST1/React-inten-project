import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faClock, faCalendar } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setName, deleteMovie, setError, setSuccess, setEdit, clearForm, setId, setOverview, setTrailer, setDuration, setImage, getMovieGenre, getMovieCast, addGenre, addCast, addDirector, setCastId, setGenreId, setReleaseDate, setDate, setTime } from "../../../controller/SliceReducer/moive";
import { normalizeStringForURL } from "../../../data/tranformData";
import { Link } from "react-router-dom";
import { splitDateTime, formatDate } from "../../../controller/SliceReducer/img";
import { imageUrl } from  "../../../controller/SliceReducer/img";

const Movie = ({ data, pp }) => {
    const date = formatDate(data.releaseDate);
    const dispatch = useDispatch();
    const movieName = data.name;
    const form = useSelector((state) => state.data);
    const { isEdit, id } = form;
    const genres = useSelector((state) => state.data.movieGenre);
    const casts = useSelector((state) => state.data.movieCast);
    const pathname = `/detail/${normalizeStringForURL(movieName)}`;
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);
    const [data3, setData3] = useState(null);
    const [data4, setData4] = useState(null);
    const [data5, setData5] = useState(null);
    const [day, time] = data.releaseDate.split('T');
    useEffect(() => {
        dispatch(getMovieGenre());
        dispatch(getMovieCast());
    }, [data, dispatch]);

    const getGenresByMovieId = (data, movieId) => {
        const filteredGenre = data
            .filter(item => item.object.movie.id === movieId)
            .map(item => ({ label: item.object.genre.name, value: item.object.genre.id }));
        return filteredGenre.length > 0 ? filteredGenre : null;
    };
    const getCastsByMovieId = (data, movieId) => {
        const filteredCasts = data
            .filter(item => item.object.movie.id === movieId && item.object.roleCast === 2)
            .map(item => ({ label: item.object.cast.name, value: item.object.cast.id }));
        return filteredCasts.length > 0 ? filteredCasts : null;
    };
    const getDirectorByMovieId = (data, movieId) => {
        const filteredDriector = data
            .filter(item => item.object.movie.id === movieId && item.object.roleCast === 1)
            .map(item => ({ value: item.object.cast.id, label: item.object.cast.name }));
        return filteredDriector.length > 0 ? filteredDriector[0] : null;
    };

    const getCastsMovieId = (data, movieId) => {
        const filteredCasts = data
            .filter(item => item.object.movie.id === movieId)
            .map(item => ({ id: item.object.id }));
        return filteredCasts.length > 0 ? filteredCasts : null;
    };

    const getGenresMovieId = (data, movieId) => {
        const filteredGenres = data
            .filter(item => item.object.movie.id === movieId)
            .map(item => ({ id: item.object.id }));
        return filteredGenres.length > 0 ? filteredGenres : null;
    };

    useEffect(() => {
        if (genres.data && casts.data) {
            setData1(getGenresByMovieId(genres.data.content, data.id));
            setData2(getCastsByMovieId(casts.data.content, data.id));
            setData3(getDirectorByMovieId(casts.data.content, data.id));
            setData4(getCastsMovieId(casts.data.content, data.id));
            setData5(getGenresMovieId(genres.data.content, data.id));
        }
    }, [genres, casts, data]);

    const handleDelete = (id) => {
        dispatch(deleteMovie(id));
        setTimeout(() => {
            dispatch(setSuccess());
            dispatch(setError());
        }, 3000);
        dispatch(clearForm());
    };
    const handleUpdate = (idd) => {
        if (isEdit && idd === id) {
            dispatch(setEdit(false));
            dispatch(clearForm());
        } else {
                dispatch(setId(idd));
                dispatch(setEdit(true));
                dispatch(setName(data.name));
                dispatch(setOverview(data.overview));
                dispatch(setTrailer(data.trailer));
                dispatch(setDuration(data.duration));
                dispatch(setImage(data.image));
                dispatch(setReleaseDate(data.releaseDate));
                dispatch(setDate(day));
                dispatch(setTime(time));
                dispatch(addGenre(data1));
                dispatch(addCast(data2));
                dispatch(addDirector(data3));
                dispatch(setCastId(data4));
                dispatch(setGenreId(data5));
        }
    }
    return (
        <div className="">
            <div className="">

                <div className="w-full  relative overflow-hidden">
                    <div className=" flex">
                        <Link to={pathname}>
                            <img src={`${imageUrl}${data.image}`} alt="" className="h-32 rounded" />
                        </Link>
                        <div className="capitalize ml-3  w-1/2">
                            <div className="flex">
                                <p className="text-lg font-bold">{data.name}</p>
                                <span className="ml-5  bg-orange-500 text-white font-bold rounded h-7 px-2">T18</span>
                            </div>
                            <div className="mt-3 flex">
                                <div className="flex">
                                    <FontAwesomeIcon icon={faClock} color="orange" className="h-4 my-auto" />
                                    <p className="mx-1">{data.duration} phút</p>
                                </div>
                                <div className="flex ml-5">
                                    <FontAwesomeIcon icon={faCalendar} color="orange" className="h-4 my-auto" />
                                    <p className="mx-1 my-auto">{date}</p>
                                </div>

                            </div>
                            <div className="flex text-tn gap-2 mt-3">
                                <div>
                                    <p>Tạo: {pp.createdBy.name}</p>
                                    <p> {splitDateTime(pp.createdAt)}</p>
                                </div>
                                <div>
                                    {pp.updatedBy && (
                                        <div>
                                            <p>Sửa: {pp.updatedBy.name}</p>
                                            <p> {splitDateTime(pp.updatedAt)}</p>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                        <div className="ml-5 flex text-2xl space-x-10">
                            <button onClick={() => handleUpdate(data.id)} className="hover:text-blue-700"><FontAwesomeIcon icon={faPenToSquare} className={`${isEdit && id === data.id ? 'text-orange-500' : 'text-indigo-500'}`} /></button>
                            <button onClick={() => handleDelete(data.id)} className="hover:text-blue-700"><FontAwesomeIcon icon={faTrashCan} className="text-red-600" /></button>
                        </div>
                    </div>
                </div>





            </div>
        </div >
    )
}
export default Movie;