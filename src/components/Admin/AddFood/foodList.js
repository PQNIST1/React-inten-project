import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFood } from "../../../controller/SliceReducer/food";
import Food from "./food";
import Pagination from "./page";
import AddSearch from "./addSearch";

const FoodList = () => {
    const dispatch = useDispatch();
    const foods = useSelector((state) => state.food.data);
    const form = useSelector((state) => state.addFood);
    const [data, setData] = useState([]);
    const [filter, setFilterData] = useState([]);
    const status = useSelector((state) => state.food.status);
    const { success } = form;
    const [itemsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const { searchQuery } = useSelector((state) => state.seacrh);
    useEffect(() => {
        dispatch(getFood());
    }, [dispatch]);
    useEffect(() => {
        if (success) {
            dispatch(getFood());
        }
    }, [success, dispatch]);
    useEffect(() => {
        if (status === 'succeeded') {
            setData(foods);
        }
    }, [status, foods]);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        if (data.data) {
            const filteredData = data.data.content.filter((item) =>
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
            <div className="flex mb-5">
                <p className="font-bold text-lg my-auto">Đồ Ăn</p>
                <AddSearch />
            </div>
            {data.data && (
                <>
                    <div className="h-448">
                        {currentItems.map((item) => (
                            <Food key={item.object.id} data={item.object} pp={item} />
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
export default FoodList;