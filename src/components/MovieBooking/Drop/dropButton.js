import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { dataShowing } from '../../../data/hashData';
import DropFeature from './dropFeature';
import { useDispatch } from 'react-redux';
import { setSelectedMovieImg, setSelectedMovieName } from '../../../controller/SliceReducer/booking';

const Dropdown = () => {

    const data = dataShowing;
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState('');

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);
    const handleSelect = (option, img) => {
        setSelectedOption(option);
        dispatch(setSelectedMovieName(option));
        dispatch(setSelectedMovieImg(img));
        const timer = setTimeout(() => {
            setIsOpen(false);
        }, 500); 
    
        // Xóa timeout nếu component unmount trước khi timeout kết thúc
        return () => clearTimeout(timer);
    };
    

    return (
        <div className="inline-block text-left w-full">
            <div>
                <div  className='w-full  border text-white font-bold p-2'>
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
                                {data.map(item => (
                                    <button onClick={() => { handleSelect(item.name,item.image) }}  className=''>
                                        <DropFeature data={item} select={selectedOption}/>
                                    </button>
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
