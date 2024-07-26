import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowtimes, setErrors } from '../../../controller/SliceReducer/addShowTime';

const ShowtimeManager = () => {
    const dispatch = useDispatch();
    const showtimes = useSelector((state) => state.showTime.showtimes);
    const movie = useSelector((state) => state.showTime.movie);
    const errors = useSelector((state) => state.showTime.errors);

    const [numberOfShowtimes, setNumberOfShowtimes] = useState(showtimes.length);
    const [movieDuration, setMovieDuration] = useState();
    const [localShowtimes, setLocalShowtimes] = useState(showtimes);

    useEffect(() => {
        setLocalShowtimes(showtimes);
        setNumberOfShowtimes(showtimes.length);
        if (movie) {
            setMovieDuration(movie.duration);
        }
    }, [showtimes, movie]);

    useEffect(() => {
        if (errors.length === 0) { 
            dispatch(setShowtimes(localShowtimes));
        }
      
    },[dispatch, localShowtimes, errors]);


    const handleNumberOfShowtimesChange = (e) => {
        const num = parseInt(e.target.value, 10);
        setNumberOfShowtimes(num);

        // Nếu số lượng xuất chiếu tăng, giữ lại các xuất chiếu cũ và bổ sung thêm các mục trống
        if (num > localShowtimes.length) {
            const additionalShowtimes = Array(num - localShowtimes.length).fill({ startTime: '', endTime: '' });
            setLocalShowtimes([...localShowtimes, ...additionalShowtimes]);
        } else {
            // Nếu số lượng xuất chiếu giảm, chỉ cắt bớt các mục cuối cùng
            setLocalShowtimes(localShowtimes.slice(0, num));
        }
    };

    const calculateEndTime = (startTime) => {
        if (!movieDuration || !startTime) return '';

        const startDate = new Date(`1970-01-01T${startTime}:00`);
        const durationMinutes = parseInt(movieDuration, 10);
        startDate.setMinutes(startDate.getMinutes() + durationMinutes + 10);

        const endHours = String(startDate.getHours()).padStart(2, '0');
        const endMinutes = String(startDate.getMinutes()).padStart(2, '0');

        return `${endHours}:${endMinutes}`;
    };

    const handleTimeChange = (index, field, value) => {
        const newShowtimes = [...localShowtimes];
        if (field === 'startTime') {
            newShowtimes[index] = { ...newShowtimes[index], startTime: value, endTime: calculateEndTime(value) };
        } else {
            newShowtimes[index] = { ...newShowtimes[index], [field]: value };
        }
        setLocalShowtimes(newShowtimes);
        validateShowtimes(newShowtimes);
    };

    const validateShowtimes = (showtimes) => {
        const newErrors = [];
        const timeFormat = '1970-01-01T';
        const minGapMinutes = 15;

        const movieDurationMinutes = movieDuration ? parseInt(movieDuration, 10) : 0;

        for (let i = 0; i < showtimes.length; i++) {
            const { startTime, endTime } = showtimes[i];

            if (!startTime || !endTime) {
                newErrors.push(`Xuất chiếu ${i + 1} phải có thời gian bắt đầu và kết thúc.`);
                continue;
            }

           

            const endTimeAfterMovie = new Date(`${timeFormat}${startTime}:00`);
            endTimeAfterMovie.setMinutes(endTimeAfterMovie.getMinutes() + movieDurationMinutes);


            if (i > 0) {
                const prevEndTime = new Date(`${timeFormat}${showtimes[i - 1].endTime}:00`);
                const currStartTime = new Date(`${timeFormat}${startTime}:00`);
                const gap = (currStartTime - prevEndTime) / (1000 * 60);

                if (gap < minGapMinutes) {
                    newErrors.push(`Xuất chiếu ${i + 1} phải có khoảng trống ít nhất ${minGapMinutes} phút sau xuất chiếu trước đó.`);
                }
            }

          
        }

        dispatch(setErrors(newErrors));
        return newErrors.length === 0;
    };

   
    return (
        <div>
            <div>
                <input className='bg-transparent border rounded h-10 p-2  w-full focus:outline-none'
                    type="number"
                    id="numberOfShowtimes"
                    value={numberOfShowtimes}
                    onChange={handleNumberOfShowtimesChange}
                />
            </div>
            {localShowtimes.map((showtime, index) => (
                <div key={index} className="showtime-entry space-y-3 text-sm">
                    <input
                        className='focus:outline-none bg-transparent border rounded pl-1'
                        type="time"
                        id={`startTime-${index}`}
                        value={showtime.startTime}
                        onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)}
                    />
                   --
                    <input
                        className='focus:outline-none bg-transparent border rounded pl-1'
                        type="time"
                        id={`endTime-${index}`}
                        value={showtime.endTime}
                        onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)}
                        disabled
                    />
                </div>
            ))}
            {errors.length > 0 && numberOfShowtimes > 0  && (
                <div className="error mt-2">
                    <h3>Lỗi:</h3>
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ShowtimeManager;
