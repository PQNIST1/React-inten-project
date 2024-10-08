import React, {useEffect} from "react";
import Logo from "./logo";
import Ticket from "./ticket";
import Tasks from "./Task/task";
import Search from "./search";
import Userlog from "./userIslog";
import Logged from "./Task/logged";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "../../controller/SliceReducer/loggin";
import { getUser } from "../../controller/SliceReducer/getUser";
import { getMovie, getMovieCurrent, getMovieUpcoming } from "../../controller/SliceReducer/moive";
import { getSeatType} from "../../controller/SliceReducer/seat";



const Nav = () => {
    const dispatch = useDispatch();
    const isLogged = useSelector((state) => (state.loggin.isLogged));
    const accessToken = localStorage.getItem('accessToken');


    useEffect(() => {
        if (accessToken) {
            dispatch(setAccessToken());
            dispatch(getUser());
            dispatch(getMovie());
        } 
            dispatch(getMovieCurrent());
            dispatch(getMovieUpcoming());
            dispatch(getSeatType());
    }, [dispatch, accessToken]);



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