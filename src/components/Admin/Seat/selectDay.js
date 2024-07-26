import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDay } from "../../../controller/SliceReducer/seat";



const DayTypeSelector = () => {
    const dispatch = useDispatch();
    const { normalDay, weekend, specialDay, earlyShow } = useSelector((state) => state.seat);
    const handleChange = (e) => {
        dispatch(setDay(e.target.value));
      };
    return (
        <div className="p-4">
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="normalDay"
            name="day"
            value="normalDay"
            checked={normalDay}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="normalDay">Ngày thường</label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="weekend"
            name="day"
            value="weekend"
            checked={weekend}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="weekend">Cuối tuần</label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="specialDay"
            name="day"
            value="specialDay"
            checked={specialDay}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="specialDay">Ngày đặc biệt</label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="earlyShow"
            name="day"
            value="earlyShow"
            checked={earlyShow}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="earlyShow">Xuất chiếu sớm</label>
        </div>
      </div>
    )
}
export default DayTypeSelector;