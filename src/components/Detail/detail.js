import React, { useEffect, useState } from "react";
import Nav from "../Navbar/nav";
import Footer from "../Footer/footer";
import TrailerDetail from "./trailerDetail";
import { useSelector, useDispatch } from "react-redux";
import VideoModal from "../Moive/VideoModal";
import ContentDetail from "./ContentDetail";
import { useParams } from "react-router-dom";
import { getMovie } from "../../controller/SliceReducer/moive";
import { setSelectedMovieImg, setSelectedMovieName } from "../../controller/SliceReducer/booking";
import { findName, NormalizedMovieNames } from "../../data/tranformData";



const MovieDetail = () => {
    const [dataReady, setDataReady] = useState(false);
    const dispatch = useDispatch();
    const [movieName, setMovieName] = useState('');
    const {prama} = useParams();
    const modal = useSelector((state) => state.modal);
    const movies = useSelector((state) => state.data.data);
    const status = useSelector((state) => state.data.status);
    const [data, setData] = useState({});
   
    useEffect(() => {
        dispatch(getMovie());
    }, [dispatch]);

    useEffect(() => {
        if (movies.data && movies.data.length > 0) {
          const normalizedNames = NormalizedMovieNames(movies.data);
            setMovieName(findName(normalizedNames,prama)) ;
        }
      }, [dataReady, movies, prama]);
      
    useEffect(() => {
        if (status === 'succeeded' && movieName) {
            
            const foundMovie = movies.data.find(movie => movie.object.name.toLowerCase() === movieName.toLowerCase());
            if (foundMovie) {
                setData(foundMovie);
                setDataReady(true);
            }
        }
    }, [dispatch, movies, prama, status, movieName]);
    useEffect(() => {
        if (dataReady) {
            dispatch(setSelectedMovieName(data.object.name));
            dispatch(setSelectedMovieImg(data.object.image));
        }
    }, [dataReady, data, dispatch]);
    return (
        <div className="relative container text-gray-400 bg-customColor w-screen h-auto">
            <Nav />
            {data.object && (
                <>
                    <TrailerDetail data={data.object} />
                    <ContentDetail data={data.object} />
                </>
            )}
            <Footer />
            {modal.isModalOpen && <VideoModal />}
        </div>
    )
}
export default MovieDetail;