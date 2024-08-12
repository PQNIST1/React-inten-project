import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookingReturn, getBookingUser, setCurrentPage, setVisibleBookings } from "../../../controller/SliceReducer/payment";
import { getReturn, setError } from "../../../controller/SliceReducer/booking";
import CustomAlert from "../../Alert/alert";
import FailedBooking from "./Status/failed";
import DefaultBooking from "./Status/default";
import PendingBooking from "./Status/pending";
import Spinner from "../../Detail/loadingScreen";
import { format } from "date-fns";

export const formatTime = (date) => {
    return format(new Date(date), 'HH:mm');
};
export const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yy');
};
export const getDayName = (dateString) => {
    const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
};

const HistoryBooking = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const bookings = useSelector((state) => state.payment.data);
    const { error } = useSelector((state) => state.movie);
    const { visibleBookings, status, currentPage, itemsPerPage } = useSelector((state) => state.payment);
    const [isLoading, setIsLoading] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);


    useEffect(() => {
        const hash = location.hash;
        const queryString = hash.includes('?') ? hash.split('?')[1] : '';
        dispatch(getBookingUser());
        if (queryString) {
            dispatch(getBookingReturn(queryString));
        }
    }, [dispatch, location]);

    const handleReturn = (id) => {
        dispatch(getReturn(id));
    };

    const handleClose = () => {
        dispatch(setError());
    };

   

    useEffect(() => {
        const loadMoreBookings = () => {
            if (currentPage * itemsPerPage < bookings.data.length) {
                setIsLoading(true);
                dispatch(setCurrentPage(currentPage + 1));
                dispatch(setVisibleBookings(bookings.data.slice(0, (currentPage + 1) * itemsPerPage)));
                setIsLoading(false);
            }
        };
    
        const loadPreviousBookings = () => {
            if (currentPage > 1) {
                setIsLoading(true);
                dispatch(setCurrentPage(currentPage - 1));
                dispatch(setVisibleBookings(bookings.data.slice(0, (currentPage - 1) * itemsPerPage)));
                setIsLoading(false);
            }
        };
        const handleScroll = () => {
            requestAnimationFrame(() => {
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight;
                const clientHeight = document.documentElement.clientHeight;

                // Khi cuộn xuống gần đáy trang
                if (scrollTop + clientHeight >= scrollHeight - 5 && status !== 'loading' && !isLoading) {
                    loadMoreBookings();
                }

                // Khi cuộn lên gần đỉnh trang
                if (scrollTop < lastScrollTop && scrollTop <= 200 && currentPage > 1 && !isLoading) {
                    const scrolledUpFromBottom = scrollHeight - clientHeight - scrollTop > 200; // Tinh toán khoảng cách từ đáy
                    if (scrolledUpFromBottom) {
                        loadPreviousBookings();

                    }
                }
                setLastScrollTop(scrollTop);
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop, status, isLoading, bookings, currentPage, itemsPerPage, visibleBookings, dispatch]);

    return (
        <div>
            {bookings.data && visibleBookings.length > 0 ? (
                <div>
                    {visibleBookings.map((item, index) => {
                        // Delay adding the class to create an effect
                        const delay = index * 200; // Adjust delay for effect timing
                        return (
                            <div
                                key={item.booking.id}
                                className={` ${
                                    isLoading ? '' : 'fade-in visible'
                                }`}
                                style={{ animationDelay: `${delay}ms` }}
                            >
                                {(() => {
                                    switch (item.booking.paymentStatus) {
                                        case "FAILED":
                                            return <FailedBooking item={item} onReturn={handleReturn} />;
                                        case "PENDING":
                                            return <PendingBooking item={item} />;
                                        default:
                                            return <DefaultBooking item={item} />;
                                    }
                                })()}
                            </div>
                        );
                    })}
                    {isLoading && <div className="flex justify-center items-center h-20"><Spinner /></div>}
                </div>
            ) : (
                <div className="flex justify-center items-center h-96">
                    <Spinner />
                </div>
            )}
            {error && error.error && (<CustomAlert message={'Vé quá hạn!'} onClose={handleClose} />)}
        </div>
    );
};

export default HistoryBooking;
