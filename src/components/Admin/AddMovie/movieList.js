import React, {useState, useEffect} from "react";
import AddSearch from "../AddFood/addSearch";
import Movie from "./movie";
import { useDispatch, useSelector } from "react-redux";
import {getMovie} from '../../../controller/SliceReducer/moive';
import Pagination from "../AddFood/page";
import { setPage } from "../../../controller/SliceReducer/tab";
import { useNavigate } from "react-router-dom";

const MovieList = () => {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.data.data);
    const form = useSelector((state) => state.data);
    const navigate = useNavigate();
    const page = useSelector((state) => state.tab.page);
    const [data, setData] = useState([]);
    const [filter, setFilterData] = useState([]);
    const { success, status } = form;
    const [itemsPerPage] = useState(7);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const { searchQuery } = useSelector((state) => state.seacrh);
    const [isFirstLoad, setIsFirstLoad] = useState(true);


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
        if (!searchQuery) {
            dispatch(setPage(page));
        }
    };
    useEffect(() => {
        if (data.data) {
            const filteredData = data.data.content.slice().filter((item) =>
                item.object.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilterData(filteredData);
            if (searchQuery) {
                const newUrl = `#?page=1`;
                navigate(newUrl, { replace: true });     
            }
        }
    }, [data.data, searchQuery, navigate]);

    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentFilteredItems = filter.slice(indexOfFirstItem, indexOfLastItem);
        setCurrentItems(currentFilteredItems);
    }, [filter, currentPage, itemsPerPage]);

    useEffect(() => {
        if (data && currentItems.length > 0 && isFirstLoad) {
            setIsFirstLoad(false);
        } else if (data && !isFirstLoad && currentItems.length === 0) {
            const prePage = Math.max(page - 1, 1); // Đảm bảo prePage không dưới 1
            const newUrl = `#?page=${prePage}`;
            navigate(newUrl, { replace: true });
            setIsFirstLoad(true);
        }
    }, [currentItems, data, navigate, page, isFirstLoad, dispatch]);

    useEffect(() => {
        if (!searchQuery) {
            const newUrl = `#?page=${page}`;
            navigate(newUrl, { replace: true });
        }
    }, [searchQuery, navigate, page]);
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