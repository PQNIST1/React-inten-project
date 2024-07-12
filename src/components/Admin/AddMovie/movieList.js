import React, {useState, useEffect} from "react";
import AddSearch from "../AddFood/addSearch";
import Movie from "./movie";
import { useDispatch, useSelector } from "react-redux";
import {getMovie} from '../../../controller/SliceReducer/moive';
import Pagination from "../AddFood/page";

const MovieList = () => {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.data.data);
    const form = useSelector((state) => state.data);
    const [data, setData] = useState([]);
    const status = useSelector((state) => state.data.status);
    const { success } = form;
    const [itemsPerPage] = useState(7);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);

    useEffect(() => {
        dispatch(getMovie());
    }, [dispatch]);
    useEffect(() => {
        if (success) {
            dispatch(getMovie());
        }
    }, [success, dispatch]);
    useEffect(() => {
        if (status === 'succeeded') {
            setData(movies);
        }
    }, [status, movies]);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    useEffect(() => {
        if (data.data) {
            setCurrentItems(data.data.slice(indexOfFirstItem, indexOfLastItem));
        }
    }, [data.data, indexOfFirstItem, indexOfLastItem, status]);
    return (
        <div className="w-full space-y-5">
        <div className="flex mb-10">
            <p className="font-bold text-lg my-auto">Phim</p>
            <AddSearch />
        </div>
        {data.data && (
            <>
                <div className="space-y-5 h-1016">
                    {currentItems.map((item) => (
                        <Movie key={item.object.id} data={item.object} />
                    ))}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(data.data.length / itemsPerPage)}
                    onPageChange={handlePageChange}
                />
            </>
        )}

    </div>
    )
}
export default MovieList;