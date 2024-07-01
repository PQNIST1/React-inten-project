import React from "react";
import { Link } from "react-router-dom";

const CreatorHover = () => {
    return (
        <div className="border rounded shadow-inner  w-32 h-auto bg-white absolute top-20 mt-1 text-gray-400 z-10">
            <p className="hover:text-blue-700 hover:bg-yellow-300 hover:border-l-4 hover:border-orange-400 text-center">
                <Link to="/category">Thể Loại Phim</Link>
            </p>
            <p  className="hover:text-blue-700 hover:bg-yellow-300  hover:border-l-4 hover:border-orange-400 text-center">
                <Link to="/">Diễn Viên</Link>
            </p>
            <p  className="hover:text-blue-700 hover:bg-yellow-300 hover:border-l-4 hover:border-orange-400 text-center">
                <Link to="/">Đạo Diễn</Link>
            </p>
        </div>
    )
}
export default CreatorHover;