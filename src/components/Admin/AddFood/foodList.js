import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFood } from "../../../controller/SliceReducer/food";
import Food from "./food";
import Pagination from "./page";
import AddSearch from "./addSearch";
import { setPage } from "../../../controller/SliceReducer/tab";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Detail/loadingScreen";

const FoodList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const foods = useSelector((state) => state.food.data);
    const form = useSelector((state) => state.addFood);
    const page = useSelector((state) => state.tab.page);
    const [data, setData] = useState([]);
    const [filter, setFilterData] = useState([]);
    const status = useSelector((state) => state.food.status);
    const { success } = form;
    const [itemsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const { searchQuery } = useSelector((state) => state.seacrh);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

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
        if (!searchQuery) {
            dispatch(setPage(page));
        }
    };
    useEffect(() => {
        if (data.data) {
            const filteredData = data.data.content.filter((item) =>
                item.object.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilterData(filteredData);
            if (searchQuery) {
                const newUrl = `#food?page=1`;
                navigate(newUrl, { replace: true });

            }
        }
    }, [data.data, searchQuery, navigate, dispatch, currentPage]);

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
            const newUrl = `#food?page=${page}`;
            navigate(newUrl, { replace: true });
        }
    }, [searchQuery, navigate, page]);
    return (
        <div className="w-full space-y-5">
            <div className="flex mb-5">
                <p className="font-bold text-lg my-auto">Đồ Ăn</p>
                <AddSearch />
            </div>
            {!data.data ? (
                <div className="flex justify-center items-center h-448">
                    <Spinner />
                </div>
            ) : (
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