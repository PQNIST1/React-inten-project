import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const BoxSub = () => {
    return (
        <div className=" w-64 space-y-5">
            <h5 className="uppercase text-white font-bold">Bản tin</h5>
            <p className="">Đăng ký ngay bây giờ để nhận tin tức mới nhất từ ​​chúng tôi.</p>
            <div className="border rounded h-8 w-full px-1 flex">
                <input className=" bg-transparent h-full border-none focus:outline-none" placeholder="Nhập email của bạn...."></input>
                <FontAwesomeIcon icon={faEnvelope}  className="m-auto"/>
            </div>
            <div className="text-red-600 flex">
                <h5 className="uppercase">Đăng ký</h5>
                <FontAwesomeIcon icon={faAngleRight} className="my-auto ml-1.5"/>
            </div>
        </div>
    )
}

export default BoxSub;