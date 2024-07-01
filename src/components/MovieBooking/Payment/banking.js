import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedOption } from "../../../controller/SliceReducer/radio";

const Banking = ({option, value, img}) => {
    const selectedOption = useSelector((state) => state.radio.selectedOption);
    const dispatch = useDispatch();

    const handleOptionChange = (event) => {
        dispatch(setSelectedOption(event.target.value));
    };
    return (
        <div className="">
            <label className="flex items-center space-x-2 space-y-2">
                <input
                    type="radio"
                    value={value}
                    checked={selectedOption === value}
                    onChange={handleOptionChange}
                    className="form-radio"
                />
                <span><img src={img} alt="" className="h-10 rounded"/></span>
                <span>{option}</span>
            </label>
        </div>
    )
}
export default Banking;