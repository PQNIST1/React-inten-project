import React, { useState, useEffect } from "react";
import AddSearch from "../AddFood/addSearch";
import Pagination from "../AddFood/page";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import User from "./user";
import { setPage } from "../../../controller/SliceReducer/tab";
import { getUsers } from "../../../controller/SliceReducer/getUser";


const UserList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.user.data);
    const page = useSelector((state) => state.tab.page);
    const form = useSelector((state) => state.user);
    const [data, setData] = useState([]);
    const [filter, setFilterData] = useState([]);
    const {  status } = form;
    const [itemsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const { searchQuery } = useSelector((state) => state.seacrh);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);
    useEffect(() => {
        if (status === 'succeeded') {
            setData(users);
        }
    }, [status, users]);
    const handlePageChange = (page) => {
        setCurrentPage(page);
        if (!searchQuery) {
            dispatch(setPage(page));
        }
    };
    useEffect(() => {
        if (data.data) {
            const filteredData = data.data.content.slice().filter((item) =>
                item.user.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilterData(filteredData);
            if (searchQuery) {
                const newUrl = `#users?page=1`;
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
            const newUrl = `#users?page=${page}`;
            navigate(newUrl, { replace: true });
        }
    }, [searchQuery, navigate, page]);

    return (
        <div className=" flex flex-col mt-10 mb-5">
            <div className="flex mb-5">
                <p className="font-bold text-lg my-auto">Người dùng</p>
                <AddSearch />
            </div>
            {data.data && (
                <>
                    <div className="overflow-hidden w-full pr-36 h-448">
                        <table className=" min-w-full">
                            <thead>
                                <tr className=" text-gray-400 bg-gray-50 bg-opacity-10">
                                    <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold capitalize"> Tên </th>
                                    <th scope="col" className="  p-5 text-left text-sm leading-6 font-semibold  capitalize"> Email </th>
                                    <th scope="col" className="  p-5 text-left text-sm leading-6 font-semibold  capitalize"> Số điện thoại </th>
                                    <th scope="col" className="  p-5 text-left text-sm leading-6 font-semibold capitalize"> Tạo </th>
                                    <th scope="col" className=" p-5 text-left text-sm leading-6 font-semibold capitalize"> Sửa </th>
                                    <th scope="col" className="  p-5 text-left text-sm leading-6 font-semibold  capitalize"> Role </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300 capitalize">
                                {currentItems.map((item) => (
                                    <User key={item.user.id} data={item.user} pp={item} />
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
export default UserList;