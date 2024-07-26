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
    const [filter, setFilterData] = useState([]);
    const { success, status } = form;
    const [itemsPerPage] = useState(7);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const { searchQuery } = useSelector((state) => state.seacrh);

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
    useEffect(() => {
        if (data.data) {
            const filteredData = data.data.content.slice().filter((item) =>
                item.object.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilterData(filteredData);
        }
    }, [data.data, searchQuery]);
    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentFilteredItems = filter.slice(indexOfFirstItem, indexOfLastItem);
        setCurrentItems(currentFilteredItems);
    }, [filter, currentPage, itemsPerPage]);
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
                        <Movie key={item.object.id} data={item.object} pp={item} />
                    ))}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filter.length / itemsPerPage)}
                    onPageChange={handlePageChange}
                />
            </>
        )}

    </div>
    )
}
export default MovieList;