import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardUser, faListOl, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const UserHover = () => {
    return (
        <div className="border rounded shadow-inner  w-32 h-auto bg-white absolute top-20 mt-1 text-gray-400 z-10">
            <Link to="/">
                <div className="hover:text-blue-700 flex px-2 hover:bg-yellow-300 hover:border-l-4 hover:border-orange-400 text-center">
                    <FontAwesomeIcon icon={faClipboardUser}  className="my-auto"/>
                    <p className="capitalize mx-auto" >tài khoản</p>
                </div>
            </Link>
            <Link to="/">
                <div className="hover:text-blue-700 flex px-2 hover:bg-yellow-300 hover:border-l-4 hover:border-orange-400 text-center">
                    <FontAwesomeIcon icon={faListOl}  className="my-auto"/>
                    <p className="capitalize mx-auto">lịch sử</p>
                </div>
            </Link>
            <Link to="/">
                <div className="hover:text-blue-700 flex px-2 hover:bg-yellow-300 hover:border-l-4 hover:border-orange-400 text-center">
                    <FontAwesomeIcon icon={faArrowRightFromBracket}  className="my-auto" />
                    <p className="capitalize mx-auto">đăng xuất</p>
                </div>
            </Link>
        </div>
    )
}
export default UserHover;