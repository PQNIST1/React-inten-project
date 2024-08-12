import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import DropFeature from './dropFeature';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDate, setSelectedMovieId, setSelectedMovieImg, setSelectedMovieName } from '../../../controller/SliceReducer/booking';
import { getShowTimeDate } from '../../../controller/SliceReducer/addShowTime';
import { setMovieOpen, setShowtimeOpen } from '../../../controller/SliceReducer/modal';

export const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const Dropdown = () => {
   


    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState('');
    const movies = useSelector((state) => state.showTime.date);
    const [data, setData] = useState([]);
    const status = useSelector((state) => state.showTime.status);
    const isOpen = useSelector((state) => (state.modal.movieOpen));

    const handleToggle = () => {
        dispatch(setMovieOpen(!isOpen));
        dispatch(setShowtimeOpen(false));
    };
    const handleSelect = (option, img, id) => {
        setSelectedOption(option);
        dispatch(setSelectedMovieName(option));
        dispatch(setSelectedMovieImg(img));
        dispatch(setSelectedMovieId(id));
        dispatch(setSelectedDate(''));
        const timer = setTimeout(() => {
            dispatch(setMovieOpen(false));
        }, 500);

        // Xóa timeout nếu component unmount trước khi timeout kết thúc
        return () => clearTimeout(timer);
    };
    useEffect(() => {
        dispatch(getShowTimeDate(getCurrentDate()));
    }, [dispatch]);
    useEffect(() => {
        if (status === 'succeeded') {
            setData(movies.data);
        }
    }, [status, movies]);

    return (
        <div className="inline-block text-left w-full">
            <div>
                <div className='w-full  border text-white font-bold p-2'>
                    <div onClick={handleToggle} className='flex'>
                        <div className='w-3/4'>
                            {selectedOption ? `Chọn phim - ${selectedOption}` : 'Chọn phim'}
                        </div>
                        <div className='flex justify-end w-1/4 mt-1 mr-5'>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                    </div>
                    {isOpen && (
                        <div className="">
                            <div className="grid grid-cols-4 gap-4 mt-6 mx-3">
                                {data.map((item, index) => (
                                    <div key={index}>
                                        <button onClick={() => handleSelect(item.movie.name, item.movie.image, item.movie.id)} className=''>
                                            <DropFeature data={item} select={selectedOption} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
