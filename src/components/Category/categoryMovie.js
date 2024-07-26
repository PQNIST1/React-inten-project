import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const CategoryMovie = () => {
    return (
        <div className="flex space-x-5">
            <Link to={'/detail'} >
                <div className="h-40 w-60">
                    <img src="https://www.galaxycine.vn/media/2024/6/7/gtcn-750_1717732724835.jpg" alt="" className="h-full w-full rounded" />
                </div>
            </Link>
            <div className="text-justify pr-5 space-y-2">
                <Link to={'/detail'}>
                    <p className="capitalize text-white font-bold text-lg">Gia tài của ngoại</p>
                </Link>
                <div className="flex space-x-2">
                    <button className="bg-blue-700 text-white text-sm px-3 py-1 rounded hover:bg-blue-800">
                        <FontAwesomeIcon icon={faThumbsUp} />
                        <span className="ml-1">Thích</span>
                    </button>
                    <button className="bg-gray-300 text-gray-500 text-sm px-3 py-1 rounded">
                        <FontAwesomeIcon icon={faEye} />
                        <span className="ml-1">12345</span>
                    </button>
                </div>
                <p className="text-sm">Đã bao lâu kể từ lần cuối cùng bạn ở bên bà của mình? Với chàng trai trẻ M (Putthipong Assaratanakul / Billkin), đó là khi anh chàng nghe tin bà của mình mắc bệnh ung thư. M quyết định trở về bên cạnh chăm sóc bà. </p>
            </div>
        </div>
    )
}
export default CategoryMovie;