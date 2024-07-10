import React, { useState, useEffect } from "react";
import AddSearch from "../../AddFood/addSearch";
import Pagination from "../../AddFood/page";
import { useDispatch, useSelector } from "react-redux";
import { getActor } from "../../../../controller/SliceReducer/food";
import Actor from "./actor";

const ActorList = () => {
    const dispatch = useDispatch();
    const actors = useSelector((state) => state.food.data2);
    const form = useSelector((state) => state.addFood);
    const [data, setData] = useState([]);
    const status = useSelector((state) => state.food.status);
    const { success } = form;
    const [itemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);

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
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    useEffect(() => {
        if (data.data) {
            setCurrentItems(data.data.slice(indexOfFirstItem, indexOfLastItem));
        }
    }, [data.data, indexOfFirstItem, indexOfLastItem, status]);
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
                                    <th scope="col" className=" w-1/2 p-5 text-left text-sm leading-6 font-semibold capitalize"> Thể loại </th>
                                    <th scope="col" className=" w-1/2 p-5 text-left text-sm leading-6 font-semibold  capitalize"> Actions </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300 capitalize ">
                                {currentItems.map((item) => (
                                    <Actor key={item.object.id} data={item.object} />
                                ))}
                            </tbody>
                        </table>
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
export default ActorList;