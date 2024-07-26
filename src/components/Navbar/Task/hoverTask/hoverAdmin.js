import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { logoutAndNavigate } from "../../../../controller/SliceReducer/loggin";
import { faClipboardUser, faListOl, faArrowRightFromBracket, faUsers, faUtensils, faFilm, faClapperboard, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const AdminHover = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutAndNavigate());
    }
    return (
        <div className="border rounded shadow-inner  w-48 h-auto bg-white absolute top-20 mt-1 text-gray-400 z-10">
            <Link to="/info/#profile">
                <div className="hover:text-blue-700 flex px-2 hover:bg-yellow-300 hover:border-l-4 hover:border-orange-400 text-center">
                    <FontAwesomeIcon icon={faClipboardUser} className="my-auto" />
                    <p className="capitalize mx-auto" >tài khoản</p>
                </div>
            </Link>
            <Link to="/info/#history">
                <div className="hover:text-blue-700 flex px-2 hover:bg-yellow-300 hover:border-l-4 hover:border-orange-400 text-center">
                    <FontAwesomeIcon icon={faListOl} className="my-auto" />
                    <p className="capitalize mx-auto">lịch sử</p>
                </div>
            </Link>
            <Link to="/info/#history">
                <div className="hover:text-blue-700 flex px-2 hover:bg-yellow-300 hover:border-l-4 hover:border-orange-400 text-center">
                    <FontAwesomeIcon icon={faUsers} className="my-auto" />
                    <p className="capitalize mx-auto">người dùng</p>
                </div>
            </Link>
            <Link to="/add/#food?page=1">
                <div className="hover:text-blue-700 flex px-2 hover:bg-yellow-300 hover:border-l-4 hover:border-orange-400 text-center">
                <FontAwesomeIcon icon={faCirclePlus} className="my-auto"/>
                   <p className="capitalize mx-auto">Thêm</p>
                </div>
            </Link>
            <Link to="/add/movie?page=1">
                <div className="hover:text-blue-700 flex px-2 hover:bg-yellow-300 hover:border-l-4 hover:border-orange-400 text-center">
                <FontAwesomeIcon icon={faFilm} className="my-auto"/>
                   <p className="capitalize mx-auto">phim</p>
                </div>
            </Link>
            <Link to="/">
                <div className="hover:text-blue-700 flex px-2 hover:bg-yellow-300 hover:border-l-4 hover:border-orange-400 text-center" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className="my-auto" />
                    <p className="capitalize mx-auto">đăng xuất</p>
                </div>
            </Link>
        </div>
    )
}
export default AdminHover;