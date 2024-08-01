import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMovieName, setSelectedMovieImg } from "../../controller/SliceReducer/booking";

const ChoiseMovie = () => {
    const [selectedValue, setSelectedValue] = useState(null); // State để lưu giá trị đã chọn từ dropdown
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.data.data);
    const [data, setData] = useState([]);
    const status = useSelector((state) => state.data.status);

    useEffect(() => {
        if (status === 'succeeded' && movies && movies.data && movies.data.content) {
            setData(movies.data.content);
        }
    }, [status, movies]);

    const attributeName = "movieAttribute"; // Tên attribute dùng cho data-e2e
    const onChangeAttribute = (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const name = selectedOption.getAttribute('data-name');
        const image = selectedOption.getAttribute('data-image');
        setSelectedValue({ name, image });
        dispatch(setSelectedMovieName(name));
        dispatch(setSelectedMovieImg(image));
    };

    return (
        <div className="flex">
            <FontAwesomeIcon icon={faFilm} color="orange" className="h-6 my-auto mx-2" />
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
                        key={attribute.object.id}
                        value={attribute.object.name}
                        data-name={attribute.object.name}
                        data-image={attribute.object.image}
                    >
                        {attribute.object.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ChoiseMovie;
