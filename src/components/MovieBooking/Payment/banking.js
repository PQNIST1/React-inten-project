import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedOption } from "../../../controller/SliceReducer/radio";
import { setPaymentMethod } from "../../../controller/SliceReducer/payment";

const Banking = ({option, value, img, method}) => {
    const selectedOption = useSelector((state) => state.radio.selectedOption);
    const dispatch = useDispatch();
    const handleSelectPaymentMethod = (name, image) => {
        dispatch(setPaymentMethod({ name, image, method }));
      };
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
                    onClick={()=>handleSelectPaymentMethod(option,img,method)}
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