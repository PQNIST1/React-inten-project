import React, { useEffect, useState } from "react";
import Nav from "../Navbar/nav";
import Footer from "../Footer/footer";
import TrailerDetail from "./trailerDetail";
import { useSelector, useDispatch } from "react-redux";
import VideoModal from "../Moive/VideoModal";
import ContentDetail from "./ContentDetail";
import { useParams } from "react-router-dom";
import { setCast, setGenre, getMovieById, getMovieCurrent, getMovieUpcoming } from "../../controller/SliceReducer/moive";
import { setSelectedMovieId, setSelectedMovieImg, setSelectedMovieName, setSelectedDate } from "../../controller/SliceReducer/booking";
import { findName, NormalizedMovieNames } from "../../data/tranformData";
import Spinner from "./loadingScreen";




const MovieDetail = () => {
    const [dataReady, setDataReady] = useState(false);
    const dispatch = useDispatch();
    const [movieName, setMovieName] = useState('');
    const [foundId, setFoundId] = useState();
    const { prama } = useParams();
    const modal = useSelector((state) => state.modal);
    const moviec = useSelector((state) => state.data.current);
    const movieu = useSelector((state) => state.data.upcoming);
    const movie = useSelector((state) => state.data.movie);
    const status = useSelector((state) => state.data.status);

    const [data, setData] = useState({});
    const [moives, setMovies] = useState();
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);


    useEffect(() => {
        dispatch(getMovieCurrent());
        dispatch(getMovieUpcoming());
        dispatch(setSelectedDate(''));
    }, [dispatch])

    useEffect(() => {
        if (moviec.data && movieu.data) {
            const moviess = [...moviec.data, ...movieu.data];
            const normalizedNames = NormalizedMovieNames(moviess);
            setMovies(moviess);
            setMovieName(findName(normalizedNames, prama));
        }
    }, [moviec, movieu, prama]);
    useEffect(() => {
        if (status === 'succeeded' && movieName && moives) {
            const foundMovie = moives.find(movie => movie.object.name.toLowerCase() === movieName.toLowerCase());
            if (foundMovie) {
                setFoundId(foundMovie);
            }
        }
    }, [dispatch, status, movieName, moives]);
    useEffect(() => {
        if (foundId) {
            dispatch(getMovieById(foundId.object.id));
            dispatch(setSelectedMovieId(foundId.object.id));
        }
    }, [dispatch, foundId]);
    useEffect(() => {
        if (movie.data) {
            setData(movie.data);
            setDataReady(true);
            setData1(movie.data.object.genres);
            setData2(movie.data.object.casts);
        }
    }, [movie])
    useEffect(() => {
        if (dataReady) {
            dispatch(setSelectedMovieName(data.object.movie.name));
            dispatch(setSelectedMovieImg(data.object.movie.image));
            dispatch(setGenre(data1));
            dispatch(setCast(data2));
        }
    }, [dataReady, data, dispatch, data1, data2]);
    return (

        <div className="relative container text-gray-400 bg-customColor w-screen h-auto">
            {!dataReady ?
                (
                    <div className="flex justify-center items-center h-screen w-screen">
                        <Spinner />
                    </div>
                ) : (
                    <>
                        <Nav />
                        {data.object && (
                            <>
                                <TrailerDetail data={data.object.movie} />
                                <ContentDetail data={data.object.movie} />
                            </>
                        )}
                        <Footer />
                        {modal.isModalOpen && <VideoModal />}
                    </>
                )}

        </div>
    )
}
export default MovieDetail;