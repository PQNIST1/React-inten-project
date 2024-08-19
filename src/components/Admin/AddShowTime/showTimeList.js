import React, { useEffect, useState } from "react";
import AddSearch from "../AddFood/addSearch";
import Pagination from "../AddFood/page";
import { useDispatch, useSelector } from "react-redux";
import { clearForm, getShowTime, setEdit, setRoomCtr } from "../../../controller/SliceReducer/addShowTime";
import { clearForm as clearForm1 } from "../../../controller/SliceReducer/specialDay";
import ShowTime from "./showTime";
import { groupBy, getMinMaxDates } from "../../../data/tranformData";
import { useNavigate } from "react-router-dom";
import { setPage } from "../../../controller/SliceReducer/tab";


const ShowTimeList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showTimes = useSelector((state) => state.showTime.data);
    const page = useSelector((state) => state.tab.page);
    const form = useSelector((state) => state.showTime);
    const [data, setData] = useState([]);
    const [filter, setFilterData] = useState([]);
    const { success, status } = form;
    const [itemsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const { searchQuery } = useSelector((state) => state.seacrh);
    useEffect(() => {
        dispatch(getShowTime());
        dispatch(setRoomCtr(false));
        dispatch(setEdit(false));
        dispatch(clearForm());
        dispatch(clearForm1());
    }, [dispatch]);
    useEffect(() => {
        if (success) {
            dispatch(getShowTime());
        }
    }, [success, dispatch]);
    useEffect(() => {
        if (status === 'succeeded') {
            setData(showTimes);
        }
    }, [status, showTimes]);
    const handlePageChange = (page) => {
        setCurrentPage(page);
        if (!searchQuery) {
            dispatch(setPage(page));
        }
    };
    useEffect(() => {
        if (data.data) {
            const groupedData = groupBy(data.data.content, 'name');
            const movieWithDates = Object.keys(groupedData).map(movie => {
                const movieData = groupedData[movie];
                const startTimes = movieData.map(item => item.object.startTime);
                const endTimes = movieData.map(item => item.object.endTime);
                const { min: start, max: end } = getMinMaxDates(startTimes.concat(endTimes));
                return {
                    movie,
                    data: movieData,
                    start,
                    end
                };
            });
            const filteredData = movieWithDates.slice().filter((item) =>
                item.movie.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilterData(filteredData);
            if (searchQuery) {
                const newUrl = `#showTime?page=1`;
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
        if (!searchQuery) {
            const newUrl = `#showTime?page=${page}`;
            navigate(newUrl, { replace: true });
        }
    }, [searchQuery, navigate, page]);

    return (
        <div className=" flex flex-col">
            <div className="flex mb-5">
                <p className="font-bold text-lg my-auto">Lịch chiếu</p>
                <AddSearch />
            </div>
            {data.data && (
                <>
                    <div className="overflow-hidden w-full h-[500px] pr-28">
                        <table className=" min-w-full ">
                            <thead>
                                <tr className=" text-gray-400 bg-gray-50 bg-opacity-10">
                                    <th scope="col" className="  p-5 text-left text-sm leading-6 font-semibold capitalize"> Phim </th>
                                    <th scope="col" className="   p-5 text-left text-sm leading-6 font-semibold capitalize"> Bắt đầu</th>
                                    <th scope="col" className="    p-5 text-left text-sm leading-6 font-semibold capitalize"> Kết thúc </th>
                                    <th scope="col" className="   p-5 text-left text-sm leading-6 font-semibold capitalize"> Số xuất chiếu</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300 capitalize">
                                {currentItems.map((item) => (
                                    <ShowTime key={item.id} data={item} />
                                ))}
                            </tbody>
                        </table>
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
export default ShowTimeList;