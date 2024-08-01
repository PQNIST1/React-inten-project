import React from "react";
import Logo from "./logo";
import Ticket from "./ticket";
import Tasks from "./Task/task";
import Search from "./search";
import Userlog from "./userIslog";
import Logged from "./Task/logged";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "../../controller/SliceReducer/loggin";
import { getUser } from "../../controller/SliceReducer/getUser";
import { getMovie } from "../../controller/SliceReducer/moive";
import { getSeatType, getSeatTypePrice } from "../../controller/SliceReducer/seat";
import { setSingle, setDouble, setVip } from "../../controller/SliceReducer/booking";
import { getPriceBySeatTypeId } from "../Admin/Seat/seat";
import { getPrice } from "./Task/hoverTask/priceHover";

const Nav = () => {
    const dispatch = useDispatch();
    const isLogged = useSelector((state) => (state.loggin.isLogged));
    const accessToken = localStorage.getItem('accessToken');
    const seats = useSelector((state) => state.seat.data);
    const prices = useSelector((state) => state.seat.seat_price);

    const getPropertyPrice = (item, price) => {
        if (item === 'single') return dispatch(setSingle(price));
        if (item === 'double') return dispatch(setDouble(price));
        if (item === 'vip') return dispatch(setVip(price));
        return '';
    }


    useEffect(() => {
        if (accessToken) {
            dispatch(setAccessToken());
            dispatch(getUser());
        }
        dispatch(getMovie());
        dispatch(getSeatType());
        dispatch(getSeatTypePrice());
    }, [dispatch, accessToken]);

    useEffect(() => {
        if (seats.data && prices.data) {
            seats.data.content.map((item) => {
                const price = getPriceBySeatTypeId(prices.data.content, item.object.id);
                const pricess = getPrice(price);
                getPropertyPrice(item.object.name.toLowerCase(),pricess);
            })
        }
    },[seats.data,prices.data, getPropertyPrice]);


    return (
        <div className="flex w-10/12 mx-auto pt-3  text-gray-400 font-sans">
            <Logo />
            <Ticket />
            <Tasks />
            <Search />
            {isLogged ? (<Userlog />) : (<Logged />)}
        </div>
    )
}

export default Nav;