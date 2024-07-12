import React, { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import InputIcon from "react-multi-date-picker/components/input_icon";
import { useDispatch, useSelector } from "react-redux";
import { setDateEnd, setDateStart } from "../../../controller/SliceReducer/seat";
import { format } from 'date-fns';






const MyDatePicker = () => {
    const [state, setState] = useState({
        dateStart: null,
        dateEnd: null
    });
    const dispatch = useDispatch();
    const dateStart = useSelector((state) => state.seat.dateStart);
    const dateEnd = useSelector((state) => state.seat.dateEnd);

    useEffect(() => {
        if (state.dateStart && state.dateEnd) {
            const formattedStartDate = format(new Date(state.dateStart.format()), "yyyy-MM-dd'T'HH:mm:ss");
            const formattedEndDate = format(new Date(state.dateEnd.format()), "yyyy-MM-dd'T'HH:mm:ss");
            dispatch(setDateStart(formattedStartDate));
            dispatch(setDateEnd(formattedEndDate));
        } else if (!state.dateStart) {
            dispatch(setDateStart(null));

        } else if (!state.dateEnd) {
            dispatch(setDateEnd(null));
        }
    }, [state, dateStart, dateEnd, dispatch]);

    return (
        <DatePicker
        
            range
            value={[state.dateStart, state.dateEnd]}
            onChange={(value) => {
                const [dateStart, dateEnd] = value;
                setState({ dateStart, dateEnd });
            }}
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
