import React, { useEffect, useState } from "react";
import AddSearch from "../../AddFood/addSearch";
import Pagination from "../../AddFood/page";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPage } from "../../../../controller/SliceReducer/tab";
import { getMovieReport } from "../../../../controller/SliceReducer/report";
import Movie from "./movie";
import { format } from "date-fns";

const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyy');
};

const MovieList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const page = useSelector((state) => state.tab.page);
    const movies = useSelector((state) => state.report.movie);
    const form = useSelector((state) => state.report);
    const [data, setData] = useState([]);
    const [filter, setFilterData] = useState([]);
    const { status } = form;
    const [itemsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const { searchQuery } = useSelector((state) => state.seacrh);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const today = new Date().toISOString().split('T')[0];
    const dateStart = useSelector((state) => state.special.dateStart);
    const dateEnd = useSelector((state) => state.special.dateEnd);
    useEffect(() => {
        if (dateStart && dateEnd) {
            dispatch(getMovieReport({ fromDate: dateStart.split('T')[0], toDate: dateEnd.split('T')[0] }));
        } else {
            dispatch(getMovieReport({ fromDate: today, toDate: today }));
        }
    }, [dispatch, today, dateStart, dateEnd]);
    useEffect(() => {
        if (status === 'successded') {
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
            if (data.data.length > 0) {
                const filteredData = data.data.filter((item) =>
                    item.movie.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setFilterData(filteredData);
                if (searchQuery) {
                    const newUrl = `#movie?page=1`;
                    navigate(newUrl, { replace: true });
                }
            } else {
                setFilterData([]);
            }
        }
    }, [data, searchQuery, navigate]);


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
            const newUrl = `#movie?page=${page}`;
            navigate(newUrl, { replace: true });
        }
    }, [searchQuery, navigate, page]);

    return (
        <div className=" flex flex-col">
            <div className="flex mb-5">
                <p className="font-bold text-lg my-auto">Doanh thu</p>
                <div className="flex items-center w-56">
                    {dateStart && dateEnd ? (
                        <p className=" ml-5">{formatDate(dateStart.split('T')[0])} ---- {formatDate(dateEnd.split('T')[0])}</p>
                    ) : (
                        <p className=" ml-5">{formatDate(today)}</p>
                    )}
                </div>
                <AddSearch />
            </div>
            {data.data && (
                <>
                    <div className="overflow-hidden w-full pr-28 h-448">
                        <table className=" min-w-full ">
                            <thead>
                                <tr className=" text-gray-400 bg-gray-50 bg-opacity-10">
                                    <th scope="col" className="  p-5 text-left text-sm leading-6 font-semibold capitalize"> Phim </th>
                                    <th scope="col" className="  p-5 text-left text-sm leading-6 font-semibold capitalize"> Giao dịch thành công </th>
                                    <th scope="col" className="  p-5 text-left text-sm leading-6 font-semibold capitalize"> Giao dịch thất bại </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300 capitalize">
                                {currentItems.map((item, index) => (
                                    <Movie key={index} data={item} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {data.data.length > 0 && (<Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(filter.length / itemsPerPage)}
                        onPageChange={handlePageChange}
                    />)}

                </>

            )}
        </div>
    )
}
export default MovieList;