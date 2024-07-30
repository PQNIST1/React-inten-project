import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddSearch from "../AddFood/addSearch";
import Pagination from "../AddFood/page";
import Tail from "./tail";
import { Link, useParams, useNavigate } from "react-router-dom";
import { format, set } from "date-fns";
import { setPage } from '../../../controller/SliceReducer/tab';
import { getShowTime } from "../../../controller/SliceReducer/addShowTime";
import { findName, NormalizedMovieNamesTime } from "../../../data/tranformData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const Detail = () => {
    const form = useSelector((state) => state.showTime);
    const { data, status, success, error } = form;
    const page = useSelector((state) => state.tab.page);
    const [filter, setFilterData] = useState([]);
    const [datas, setDatas] = useState([]);
    const [itemsPerPage] = useState(6);
    const [movieName, setMovieName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    const { searchQuery } = useSelector((state) => state.seacrh);
    const { prama } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    const formatDate = (date) => {
        return format(new Date(date), 'dd/MM/yy');
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
        if (!searchQuery) {
            dispatch(setPage(page));
        }
    };
    const findAllMoviesByName = (movies, movieName) => {
        return movies.filter(movie =>
            movie.object.movie.name.toLowerCase() === movieName.toLowerCase()
        );
    };

    useEffect(() => {
        dispatch(getShowTime())
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            dispatch(getShowTime());
        }
    }, [success, dispatch]);

    useEffect(() => {
        if (data.data) {
            const normalizedNames = NormalizedMovieNamesTime(data.data.content);
            setMovieName(findName(normalizedNames, prama));
        }
    }, [data, prama]);

    useEffect(() => {
        if (status === 'succeeded' && movieName) {
          const foundMovie = findAllMoviesByName(data.data.content, movieName);
          if (foundMovie.length > 0) {
            setDatas(foundMovie);
          } else {
            navigate(-1);
          }
        }
      }, [dispatch, status, movieName, data, navigate]);
    useEffect(() => {
        if (datas) {
            const filteredData = datas
                .slice()
                .filter((item) => {
                    const itemDate = formatDate(item.object.startTime);
                    return itemDate.toLowerCase().includes(searchQuery);
                })
                .sort((a, b) => new Date(a.object.startTime) - new Date(b.object.startTime));

            setFilterData(filteredData);
            if (searchQuery) {
                const newUrl = `#?page=1`;
                navigate(newUrl, { replace: true });
            }
        }
    }, [datas, searchQuery, navigate]);

    useEffect(() => {
        if (!searchQuery) {
            const newUrl = `#?page=${page}`;
            navigate(newUrl, { replace: true });
        }
    }, [searchQuery, navigate, page]);





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



    const handlePage = () => {
        dispatch(setPage(1));
    }
    return (
        <div className=" flex flex-col mb-10 mt-5">
            <div className="flex mb-5">
                <Link to={'/add/#showTime?page=1'} onClick={handlePage}>
                    <p className="font-bold text-lg my-auto hover:text-blue-700">Xuất chiếu : {movieName}</p>
                </Link>
                <AddSearch />
            </div>
            <div className="h-10">
                {error && error.error && <p style={{ color: 'red' }}><FontAwesomeIcon icon={faTriangleExclamation} />{error.error}</p>}
                {success && <div className="mt-4 text-green-500"><FontAwesomeIcon icon={faCircleCheck} />Tải lên thành công!</div>}
            </div>
            {data && datas && (
                <>
                    <div className="overflow-hidden w-full h-[600px] pr-28">
                        <table className=" min-w-full ">
                            <thead>
                                <tr className=" text-gray-400 bg-gray-50 bg-opacity-10">
                                    <th scope="col" className="  p-5 text-left text-sm leading-6 font-semibold capitalize"> STT </th>
                                    <th scope="col" className="  p-5 text-left text-sm leading-6 font-semibold capitalize"> Ngày </th>
                                    <th scope="col" className="   p-5 text-left text-sm leading-6 font-semibold capitalize"> Bắt đầu</th>
                                    <th scope="col" className="    p-5 text-left text-sm leading-6 font-semibold capitalize"> Kết thúc </th>
                                    <th scope="col" className="   p-5 text-left text-sm leading-6 font-semibold capitalize"> Phòng</th>
                                    <th scope="col" className="   p-5 text-left text-sm leading-6 font-semibold capitalize"> Tạo</th>
                                    <th scope="col" className="   p-5 text-left text-sm leading-6 font-semibold capitalize"> Sửa</th>
                                    <th scope="col" className="   p-5 text-left text-sm leading-6 font-semibold capitalize"> Action</th>

                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300 capitalize">
                                {currentItems.map((item, index) => (
                                    <Tail key={item.object.id} data={item} index={index} />
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
export default Detail;