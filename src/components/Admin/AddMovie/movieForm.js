import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategorySelect from "./multiSelect.js/categorySelect";
import ActorSelect from "./multiSelect.js/actorSelect";
import DirectorSelect from "./multiSelect.js/directorSelect";
import { setDate, setTime, setDuration, setName, setOverview, setReleaseDate, setTrailer, clearForm, addMovie, editMovie } from "../../../controller/SliceReducer/moive";


const MovieForm = () => {
    const dispatch = useDispatch();
    const form = useSelector((state) => state.data);
    const [img, setImg] = useState(null);
    const { date, time, id, image, isEdit, loading, error, success, name, overview, trailer, duration, releaseDate, genres, casts, director, genre_id, cast_id } = form;
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const inputRef = useRef(null);


    useEffect(() => {
        if (image) {
            // Tải hình ảnh từ URL và chuyển đổi thành đối tượng File
            fetch(`http://localhost:8080${image}`)
                .then(response => response.blob())
                .then(blob => {
                    const file = new File([blob], "image.jpg", { type: blob.type });
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    
                    // Cập nhật input file
                    if (inputRef.current) {
                        inputRef.current.files = dataTransfer.files;
                        setImg(file); // Cập nhật trạng thái với đối tượng File
                    }
                })
                .catch(error => console.error('Error fetching image:', error));
        }
    }, [image]);

    const formatDateTime = () => {
        if (date && time) {
            const formattedDateTime = `${date} ${time}:00`;
            return formattedDateTime;
        }
        return '';
    };
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files.length > 0) {
            const file = files[0];
            setImg(file);
        } else if (name === 'name') {
            dispatch(setName(value));
        } else if (name === 'duration') {
            dispatch(setDuration(value));
        } else if (name === 'overview') {
            dispatch(setOverview(value));
        } else if (name === 'trailer') {
            dispatch(setTrailer(value));
        } else if (name === 'date') {
            dispatch(setDate(value));
        } else if (name === 'time') {
            dispatch(setTime(value));
        }
        dispatch(setReleaseDate(formatDateTime()));
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        if (genres && cast_id && director) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('overview', overview);
            formData.append('image', img);
            formData.append('trailer', trailer);
            formData.append('duration', duration);
            formData.append('releaseDate', releaseDate);
            dispatch(addMovie({ formData, genres, casts, director }));
            dispatch(clearForm());
            setFileInputKey(Date.now());
        };
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('overview', overview);
        formData.append('image', img);
        formData.append('trailer', trailer);
        formData.append('duration', duration);
        formData.append('releaseDate', releaseDate);
        dispatch(editMovie({ id, formData, genres, casts, director, cast_id, genre_id }));
        dispatch(clearForm());
        setFileInputKey(Date.now());

    };
    const handleEdit = () => {
        dispatch(clearForm());
    }
    return (
        <div className="dark:bg-gray-900 bg-gray-100 flex justify-center items-center">
            <div className="mx-auto p-6 bg-white dark:bg-gray-800 rounded-md shadow-lg w-full">
                {isEdit ? (
                    <h2 className="text-3xl font-semibold text-center mb-6 dark:text-white">Cập nhập</h2>
                ) : (
                    <h2 className="text-3xl font-semibold text-center mb-6 dark:text-white">Thêm phim</h2>

                )}
                <form className="space-y-5" onSubmit={isEdit ? handleUpdate : handleSubmit}>
                    <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md px-8  py-8 space-y-5">
                        <div className="">
                            <label htmlFor="name" className="mb-3 block text-base font-medium ">
                                Tên Phim
                            </label>
                            <input required
                                value={name}
                                onChange={handleChange}
                                type="text" name="name" id="name" placeholder="Tên phim..."
                                className="w-full rounded-md border bg-transparent  py-3 px-6 text-base font-medium  outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="">
                                    <label htmlFor="date" className="mb-3 block text-base font-medium ">
                                        Ngày
                                    </label>
                                    <input
                                        value={date}
                                        onChange={handleChange}
                                        required type="date" name="date" id="date"
                                        className="w-full rounded-md border bg-transparent py-3 px-6 text-base font-medium  outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="">
                                    <label htmlFor="time" className="mb-3 block text-base font-medium">
                                        Giờ
                                    </label>
                                    <input required
                                        value={time}
                                        onChange={handleChange}
                                        type="time" name="time" id="time"
                                        className="w-full rounded-md border bg-transparent py-3 px-6 text-base font-medium  outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="overview" className="block  font-medium mb-2">Giới thiệu</label>
                            <textarea
                                value={overview}
                                onChange={handleChange}
                                required id="overview" name="overview" placeholder="Viết đoạn giới thiệu..."
                                className="border  bg-transparent p-2 w-full rounded-lg focus:outline-none focus:border-blue-400" rows="5"></textarea>
                        </div>
                        <div className="">
                            <label htmlFor="trailer" className="mb-3 block text-base font-medium ">
                                Trailer
                            </label>
                            <input
                                value={trailer}
                                onChange={handleChange}
                                required type="text" name="trailer" id="trailer" placeholder="Link trailer..."
                                className="w-full rounded-md border bg-transparent  py-3 px-6 text-base font-medium  outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                        <div className="">
                            <label htmlFor="duration" className="mb-3 block text-base font-medium ">
                                Thời lượng
                            </label>
                            <input required
                                value={duration}
                                onChange={handleChange}
                                type="number" name="duration" id="duration" placeholder="Thời lượng..."
                                className="w-full rounded-md border bg-transparent  py-3 px-6 text-base font-medium  outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                        <div className="">
                            <label htmlFor="image">Hình ảnh</label>
                            <input ref={inputRef} multiple key={fileInputKey}
                                onChange={handleChange}
                                id="image" name="image" className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60" type="file" required></input>
                        </div>
                        <div className=" space-y-2">
                            <label htmlFor="genre">Thể loại</label>
                            <CategorySelect />
                        </div>
                        <div className=" space-y-2">
                            <label htmlFor="genre">Diễn viên</label>
                            <ActorSelect />
                        </div>
                        <div className=" space-y-2">
                            <label htmlFor="genre">Dạo diễn</label>
                            <DirectorSelect />
                        </div>
                    </div>

                    <div>
                        {isEdit ? (
                            <div>
                                <button
                                    type="submit"
                                    className="mb-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md w-full mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-500 dark:focus:ring-opacity-50"
                                >
                                    {loading ? (
                                        <div className="flex justify-center items-center">
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            <p>Đang chỉnh sửa....</p>
                                        </div>
                                    ) : (
                                        'Chỉnh sửa'
                                    )}
                                </button>
                                <button onClick={handleEdit} type="button" className="mb-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md w-full mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-500 dark:focus:ring-opacity-50">
                                    Hủy
                                </button>
                            </div>

                        ) : (
                            <button
                                type="submit"
                                className="mb-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md w-full mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-500 dark:focus:ring-opacity-50"
                            >
                                {loading ? (
                                    <div className="flex justify-center items-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        <p>Đang thêm....</p>
                                    </div>
                                ) : (
                                    'Thêm'
                                )}
                            </button>
                        )}
                        {error && error.error && <p style={{ color: 'red' }}>{error.error}</p>}
                        {success && <div className="mt-4 text-green-500">Tải lên thành công!</div>}
                    </div>
                </form>
            </div>
        </div>
    )
}
export default MovieForm;