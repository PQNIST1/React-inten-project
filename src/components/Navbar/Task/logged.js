import React from "react";
import { Link } from "react-router-dom";

const Logged = () => {
    return (
        <div className="flex ml-10 space-x-4">
            <Link to={'/login'} className="m-auto">
                <button className="bg-blue-700 text-white m-auto px-3 py-2 rounded hover:bg-blue-500">
                    Đăng nhập
                </button>
            </Link>
            <Link to={'/register'} className="m-auto">
                <button className="bg-blue-700 text-white m-auto px-5 py-2 rounded hover:bg-blue-500">Đăng ký</button>
            </Link>
        </div>
    )
}

export default Logged;