import React, { useState, useEffect } from "react";
import AddSearch from "../../AddFood/addSearch";
import Pagination from "../../AddFood/page";
import { useDispatch, useSelector } from "react-redux";
import { getActor } from "../../../../controller/SliceReducer/addActor";
import Actor from "./actor";
import { setPage } from "../../../../controller/SliceReducer/tab";
import { useNavigate } from "react-router-dom";

const ActorList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const actors = useSelector((state) => state.actor.data);
    const page = useSelector((state) => state.tab.page);
    const form = useSelector((state) => state.actor);
    const [data, setData] = useState([]);
    const [filter, setFilterData] = useState([]);
    const { success, status } = form;
    const [itemsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const { searchQuery } = useSelector((state) => state.seacrh);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    
    useEffect(() => {
        dispatch(getActor());
    }, [dispatch]);
    useEffect(() => {
        if (success) {
            dispatch(getActor());
        }
    }, [success, dispatch]);
    useEffect(() => {
        if (status === 'succeeded') {
            setData(actors);
        }
    }, [status, actors]);
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
                const newUrl = `#actor?page=1`;
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
            const newUrl = `#actor?page=${page}`;
            navigate(newUrl, { replace: true });
        }
    }, [searchQuery, navigate, page]);
    return (
        <div className=" flex flex-col">
            <div className="flex mb-5">
                <p className="font-bold text-lg my-auto">Diễn viên</p>
                <AddSearch />
            </div>
            {data.data && (
                <>
                    <div className="overflow-hidden w-full pr-36 h-448">
                        <table className=" min-w-full ">
                            <thead>
                                <tr className=" text-gray-400 bg-gray-50 bg-opacity-10">
                                    <th scope="col" className=" p-5 text-left text-sm leading-6 font-semibold capitalize"> Tên </th>
                                    <th scope="col" className=" p-5 text-left text-sm leading-6 font-semibold capitalize"> Tạo </th>
                                    <th scope="col" className=" p-5 text-left text-sm leading-6 font-semibold capitalize"> Sửa </th>
                                    <th scope="col" className=" p-5 text-left text-sm leading-6 font-semibold  capitalize"> Actions </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300 capitalize ">
                                {currentItems.map((item) => (
                                    <Actor key={item.object.id} data={item.object} pp={item} />
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
export default ActorList;