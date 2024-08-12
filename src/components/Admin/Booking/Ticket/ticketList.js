import React, { useEffect, useState } from "react";
import AddSearch from "../../AddFood/addSearch";
import Pagination from "../../AddFood/page";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPage } from "../../../../controller/SliceReducer/tab";
import { getTickets } from "../../../../controller/SliceReducer/report";
import Ticket from "./ticket";

const TicketList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const page = useSelector((state) => state.tab.page);
    const tickets = useSelector((state) => state.report.data);
    const form = useSelector((state) => state.report);
    const [data, setData] = useState([]);
    const [filter, setFilterData] = useState([]);
    const { success, status } = form;
    const [itemsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const { searchQuery } = useSelector((state) => state.seacrh);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    useEffect(() => {
        dispatch(getTickets());
    }, [dispatch]);
    useEffect(() => {
        if (success) {
            dispatch(getTickets());
        }
    }, [success, dispatch]);
    useEffect(() => {
        if (status === 'successded') {
            setData(tickets);
        }
    }, [status, tickets]);
    const handlePageChange = (page) => {
        setCurrentPage(page);
        if (!searchQuery) {
            dispatch(setPage(page));
        }
    };
   
    useEffect(() => {
        if (data.data) {
            if (data.data.content.length > 0) {
                const filteredData = data.data.content.filter((item) =>
                    item.createdBy && item.createdBy.name
                        ? item.createdBy.name.toLowerCase().includes(searchQuery.toLowerCase())
                        : false
                );
                setFilterData(filteredData);
                if (searchQuery) {
                    const newUrl = `#ticket?page=1`;
                    navigate(newUrl, { replace: true });
                }
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
            const newUrl = `#ticket?page=${page}`;
            navigate(newUrl, { replace: true });
        }
    }, [searchQuery, navigate, page]);

    return (
        <div className=" flex flex-col">
            <div className="flex mb-5">
                <p className="font-bold text-lg my-auto">Vé</p>
                <AddSearch />
            </div>
            {data.data && (
                <>
                    <div className="overflow-hidden w-full pr-28 h-448">
                        <table className=" min-w-full ">
                            <thead>
                                <tr className=" text-gray-400 bg-gray-50 bg-opacity-10">
                                    <th scope="col" className="  p-5 text-left text-sm leading-6 font-semibold capitalize"> Người dùng </th>
                                    <th scope="col" className="  p-5 text-left text-sm leading-6 font-semibold capitalize"> Số điện thoại </th>
                                    <th scope="col" className="  p-5 text-left text-sm leading-6 font-semibold capitalize"> Người tạo </th>
                                    <th scope="col" className="   p-5 text-left text-sm leading-6 font-semibold capitalize"> Ngày đặt</th>
                                    <th scope="col" className="    p-5 text-left text-sm leading-6 font-semibold capitalize"> Giá tiền </th>
                                    <th scope="col" className="  p-5 text-left text-sm leading-6 font-semibold capitalize"> Phương thức </th>
                                    <th scope="col" className=" p-5 text-left text-sm leading-6 font-semibold capitalize"> Trạng thái </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300 capitalize">
                                {currentItems.map((item) => (
                                    <Ticket key={item.object.id} data={item.object} pp={item} />
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
export default TicketList;