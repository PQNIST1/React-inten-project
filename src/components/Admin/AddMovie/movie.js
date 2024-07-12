import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faClock, faCalendar } from "@fortawesome/free-regular-svg-icons";
import { formatDate } from "../../../controller/SliceReducer/img";
import { useDispatch } from "react-redux";
import { ImgController } from "../../../controller/SliceReducer/img";
import { deleteMovie } from "../../../controller/SliceReducer/moive";
import { normalizeStringForURL } from "../../../data/tranformData";
import { Link } from "react-router-dom";

const Movie = ({ data }) => {
    const date = formatDate(data.releaseDate);
    const dispatch = useDispatch();
    const movieName = data.name;
    const pathname = `/detail/${normalizeStringForURL(movieName)}`;
    const [imageSrc, setImageSrc] = useState('');
    useEffect(() => {
        const imgData = data.image;
        const imageUrl = ImgController(imgData);
        setImageSrc(imageUrl);
        return () => URL.revokeObjectURL(imageUrl);
    }, [data]);
    const handleDelete = (id) => {
        dispatch(deleteMovie(id));
    };
    return (
        <div className="">
            <div className="">
                <Link to={pathname}>
                    <div className="w-full  relative overflow-hidden">
                        <div className=" flex">
                            <img src={imageSrc} alt="" className="h-32 rounded" />
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

                            </div>
                            <div className="ml-5 flex text-2xl space-x-10">
                                <button className="hover:text-blue-700"><FontAwesomeIcon icon={faPenToSquare} className="text-indigo-500 " /></button>
                                <button onClick={() => handleDelete(data.id)} className="hover:text-blue-700"><FontAwesomeIcon icon={faTrashCan} className="text-red-600" /></button>
                            </div>
                        </div>
                    </div>
                </Link>




            </div>
        </div>
    )
}
export default Movie;