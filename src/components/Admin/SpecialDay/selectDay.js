import React from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import InputIcon from "react-multi-date-picker/components/input_icon";
import { useDispatch, useSelector } from "react-redux";
import { setDateEnd, setDateStart } from "../../../controller/SliceReducer/specialDay";
import { format } from 'date-fns';






const MyDatePicker = () => {

    const dispatch = useDispatch();
    const dateStart = useSelector((state) => state.special.dateStart);
    const dateEnd = useSelector((state) => state.special.dateEnd);

    const handleChange = (value) => {
        const [dateStart, dateEnd] = value;
        if (dateStart && dateEnd) {
            const formattedStartDate = format(new Date(dateStart.format()), "yyyy-MM-dd'T'HH:mm:ss");
            dispatch(setDateStart(formattedStartDate));
            const formattedEndDate = format(new Date(dateEnd.format()), "yyyy-MM-dd'T'HH:mm:ss");
            dispatch(setDateEnd(formattedEndDate));
        } else if (!dateStart) {
            dispatch(setDateStart(null));
        } else if (!dateEnd) {
            dispatch(setDateEnd(null));
        }
    }
    return (
        <DatePicker
            range
            value={[dateStart ? new Date(dateStart) : null, dateEnd ? new Date(dateEnd) : null]}
            onChange={handleChange}
            showOtherDays
            numberOfMonths={1}
            plugins={[
                <DatePanel />
            ]}
            render={<InputIcon />}
        />
    );
};

export default MyDatePicker;
