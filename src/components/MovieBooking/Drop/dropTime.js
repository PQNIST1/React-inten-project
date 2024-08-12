import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import TimeDetail from "../../Detail/Content/timeDetail";
import { useDispatch, useSelector } from "react-redux";
import { setMovieOpen, setShowtimeOpen } from "../../../controller/SliceReducer/modal";

const DropTime = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => (state.modal.showTimeOpen));
    const handleToggle = () => {
       dispatch(setShowtimeOpen(!isOpen));
       dispatch(setMovieOpen(false));
    };
    const isSelected = useSelector((state) => (state.movie.selectedMovieName));
    return (
        <div className="inline-block text-left w-full">
            <div>
                <div className='w-full  border text-white font-bold p-2'>
                    <div className='flex' onClick={handleToggle}>
                        <div className='w-3/4'>
                            <p>Chọn suất</p>
                        </div>
                        <div className='flex justify-end w-1/4 mt-1 mr-5'>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                    </div>
                    {isOpen && isSelected !== ''  && (
                        <div className="mt-5">
                            <TimeDetail />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default DropTime;