import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getShowTimeDate} from "../../controller/SliceReducer/addShowTime";
import { getCurrentDate } from "../MovieBooking/Drop/dropButton";
import { setSelectedMovieName, setSelectedMovieImg, setSelectedMovieId, setShowtimes } from "../../controller/SliceReducer/booking";

const ChoiseMovie = () => {
    const [selectedValue, setSelectedValue] = useState(null); // State để lưu giá trị đã chọn từ dropdown
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.showTime.date);
    const [data, setData] = useState([]);
    const status = useSelector((state) => state.showTime.status);

    useEffect(() => {
        dispatch(getShowTimeDate(getCurrentDate()));
    }, [dispatch]);

    useEffect(() => {
        if (status === 'succeeded') {
            setData(movies.data);
        }
    }, [status, movies]);

    const attributeName = "movieAttribute"; // Tên attribute dùng cho data-e2e
    const onChangeAttribute = (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const name = selectedOption.getAttribute('data-name');
        const image = selectedOption.getAttribute('data-image');
        const id = selectedOption.getAttribute('data-id');
        setSelectedValue({ name, image, id });
        dispatch(setSelectedMovieName(name));
        dispatch(setSelectedMovieImg(image));
        dispatch(setSelectedMovieId(id));
        dispatch(setShowtimes([]));
    };

    return (
        <div className="flex">
            <FontAwesomeIcon icon={faFilm} color="orange" className="h-6 my-auto mx-2" />
            {data && (
                <select
                    value={selectedValue ? selectedValue.name : ""}
                    data-e2e={attributeName}
                    onChange={onChangeAttribute}
                    className="p-[9px] bg-gray-50 w-96 h-full focus:outline-none"
                >
                    <option
                        className="font-roboto capitalize"
                        value=""
                        data-e2e="default"
                        disabled
                        hidden
                    >
                        Chọn phim
                    </option>
                    {data.map((attribute) => (
                        <option
                            className="font-roboto capitalize"
                            key={attribute.movie.id}
                            value={attribute.movie.name}
                            data-name={attribute.movie.name}
                            data-image={attribute.movie.image}
                            data-id={attribute.movie.id}
                        >
                            {attribute.movie.name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default ChoiseMovie;
