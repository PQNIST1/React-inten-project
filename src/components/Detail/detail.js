import React, { useEffect, useState } from "react";
import Nav from "../Navbar/nav";
import Footer from "../Footer/footer";
import TrailerDetail from "./trailerDetail";
import { useSelector, useDispatch } from "react-redux";
import VideoModal from "../Moive/VideoModal";
import ContentDetail from "./ContentDetail";
import { useParams } from "react-router-dom";
import { setCast, setGenre, getMovie, getMovieCast, getMovieGenre } from "../../controller/SliceReducer/moive";
import { setSelectedMovieImg, setSelectedMovieName } from "../../controller/SliceReducer/booking";
import { findName, NormalizedMovieNames } from "../../data/tranformData";
import Spinner from "./loadingScreen";



const MovieDetail = () => {
    const [dataReady, setDataReady] = useState(false);
    const dispatch = useDispatch();
    const [movieName, setMovieName] = useState('');
    const { prama } = useParams();
    const modal = useSelector((state) => state.modal);
    const movies = useSelector((state) => state.data.data);
    const status = useSelector((state) => state.data.status);
    const genres = useSelector((state) => state.data.movieGenre);
    const casts = useSelector((state) => state.data.movieCast);
    const [data, setData] = useState({});
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);
    const getGenresByMovieId = (data, movieId) => {
        return data
            .filter(item => item.object.movie.id === movieId)
            .map(item => ({ name: item.object.genre.name, value: item.object.genre.id }));
    };
    const getCastsByMovieId = (data, movieId) => {
        return data
            .filter(item => item.object.movie.id === movieId)
            .map(item => ({ name: item.object.cast.name, role: item.object.roleCast }));
    };



    useEffect(() => {
        dispatch(getMovie());
        dispatch(getMovieGenre());
        dispatch(getMovieCast());
    }, [dispatch]);

    useEffect(() => {
        if (genres.data && casts.data && movies.data && movies.data.content.length > 0) {
            const normalizedNames = NormalizedMovieNames(movies.data.content);
            setMovieName(findName(normalizedNames, prama));
        }
    }, [dataReady, movies, prama, genres, casts]);

    useEffect(() => {
        if (status === 'succeeded' && movieName) {
            const foundMovie = movies.data.content.find(movie => movie.object.name.toLowerCase() === movieName.toLowerCase());
            const foundGenre = getGenresByMovieId(genres.data.content, foundMovie.object.id);
            const foundCast = getCastsByMovieId(casts.data.content, foundMovie.object.id);
            if (foundMovie) {
                setData(foundMovie);
                setDataReady(true);
                setData1(foundGenre);
                setData2(foundCast);
            }
        }
    }, [dispatch, movies, prama, status, movieName, genres, casts]);

    useEffect(() => {
        if (dataReady) {
            dispatch(setSelectedMovieName(data.object.name));
            dispatch(setSelectedMovieImg(data.object.image));
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
                                <TrailerDetail data={data.object} />
                                <ContentDetail data={data.object} />
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