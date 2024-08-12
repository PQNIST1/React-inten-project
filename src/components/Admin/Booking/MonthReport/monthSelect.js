import React from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import InputIcon from "react-multi-date-picker/components/input_icon";
import { useDispatch, useSelector } from "react-redux";
import { setDateEnd, setDateStart } from "../../../../controller/SliceReducer/specialDay";
import { format } from 'date-fns';
import { parseISO } from 'date-fns';

const MyMonthPicker = () => {
    const dispatch = useDispatch();
    const dateStart = useSelector((state) => state.special.dateStart);
    const dateEnd = useSelector((state) => state.special.dateEnd);

    const handleChange = (value) => {
        const [start, end] = value;

        // Chuyển đổi đối tượng `moment` thành ngày giờ hợp lệ nếu cần
        if (start && end) {
                const formattedStartDate = format(start.toDate(), "yyyy-MM");
                dispatch(setDateStart(formattedStartDate));
                const formattedEndDate = format(end.toDate(), "yyyy-MM");
                dispatch(setDateEnd(formattedEndDate));
        } else {
            if (!start) {
                dispatch(setDateStart(null));
            }
            if (!end) {
                dispatch(setDateEnd(null));
            }
        }
    }

    // Chuyển đổi giá trị từ Redux state thành đối tượng Date hợp lệ
    const startDate = dateStart ? parseISO(dateStart) : null;
    const endDate = dateEnd ? parseISO(dateEnd) : null;

    return (
        <DatePicker
            range
            value={[
                startDate ? startDate : null,
                endDate ? endDate : null
            ]}
            onChange={handleChange}
            onlyMonthPicker
            plugins={[<DatePanel key="date-panel" />]}
            render={<InputIcon />}
        />
    );
};

export default MyMonthPicker;
