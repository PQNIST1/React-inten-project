import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowtimes, setErrors } from '../../../controller/SliceReducer/addShowTime';

const SimpleShowtimeManager = () => {
    const dispatch = useDispatch();
    const showtime = useSelector((state) => state.showTime.showtimes[0] || { startTime: '', endTime: '' });
    const movie = useSelector((state) => state.showTime.movie);
    const errors = useSelector((state) => state.showTime.errors);

    const [localShowtime, setLocalShowtime] = useState(showtime);
    const [movieDuration, setMovieDuration] = useState();

    useEffect(() => {
        setLocalShowtime(showtime);
        if (movie) {
            setMovieDuration(movie.duration);
        }
    }, [showtime, movie]);

    useEffect(() => {
        if (errors.length === 0) { 
            dispatch(setShowtimes([localShowtime]));
        }
    }, [dispatch, localShowtime, errors]);

    const calculateEndTime = (startTime) => {
        if (!movieDuration || !startTime) return '';

        const startDate = new Date(`1970-01-01T${startTime}:00`);
        const durationMinutes = parseInt(movieDuration, 10);
        startDate.setMinutes(startDate.getMinutes() + durationMinutes + 10);

        const endHours = String(startDate.getHours()).padStart(2, '0');
        const endMinutes = String(startDate.getMinutes()).padStart(2, '0');

        return `${endHours}:${endMinutes}`;
    };

    const handleTimeChange = (field, value) => {
        const newShowtime = { ...localShowtime };
        if (field === 'startTime') {
            newShowtime.startTime = value;
            newShowtime.endTime = calculateEndTime(value);
        }
        setLocalShowtime(newShowtime);
        validateShowtime(newShowtime);
    };

    const validateShowtime = (showtime) => {
        const newErrors = [];
        const { startTime, endTime } = showtime;

        if (!startTime || !endTime) {
            newErrors.push('Xuất chiếu phải có thời gian bắt đầu và kết thúc.');
        }

        dispatch(setErrors(newErrors));
        return newErrors.length === 0;
    };

    return (
        <div className="simple-showtime-manager">
            <div className="showtime-entry space-y-3 text-sm">
                <input
                    className='focus:outline-none bg-transparent border rounded pl-1 mr-3.5'
                    type="time"
                    id="startTime"
                    value={localShowtime.startTime}
                    onChange={(e) => handleTimeChange('startTime', e.target.value)}
                />
                <input
                    className='focus:outline-none bg-transparent border rounded pl-1'
                    type="time"
                    id="endTime"
                    value={localShowtime.endTime}
                    disabled
                />
            </div>
        </div>
    );
};

export default SimpleShowtimeManager;
