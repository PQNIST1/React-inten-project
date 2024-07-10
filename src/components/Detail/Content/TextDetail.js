import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import MoiveProduct from "./Main/MoiveProduct";
import { dataActor, dataDirector, dataGender } from '../../../data/hashData';
import { formatDate } from "../../../controller/SliceReducer/img";

const TextDetail = ({ data }) => {
    const data0 = dataGender;
    const data1 = dataActor;
    const data2 = dataDirector;
    const date = formatDate(data.releaseDate);
    return (
        <div className="pt-7 pl-5  space-y-2 w-2/3">
            <div className="flex">
                <div className="w-3/4">
                    <h1 className="capitalize text-2xl font-bold text-white">{data.name}</h1>
                </div>
                <div className="bg-orange-500 w-9 h-6 text-white font-bold rounded text-center ml-4 mt-2">
                    <p className="m-auto">T13</p>
                </div>
            </div>
            <div className="flex text-sm">
                <div className="flex">
                    <FontAwesomeIcon icon={faClock} color="orange" className="h-4 my-auto" />
                    <p className="mx-1">{data.duration} phút</p>
                </div>
                <div className="flex ml-5">
                    <FontAwesomeIcon icon={faCalendar} color="orange" className="h-4 my-auto" />
                    <p className="mx-1">{date}</p>
                </div>
            </div>
            <div className="flex space-x-1">
                <FontAwesomeIcon icon={faStar} color="orange" className="h-5 my-auto" />
                <p className="text-sm"><span className="font-bold text-lg mr-1">9.4</span>(999 votes)</p>
            </div>
            <div className="flex space-x-2">
                <p>Quốc gia:</p>
                <p className="capitalize font-bold">Thái Lan</p>
            </div>
            <div className="flex space-x-2">
                <p>Nhà sản xuất:</p>
                <p className="capitalize font-bold">GDH 559</p>
            </div>
            <MoiveProduct data={data0} title={"Thể loại"} />
            <MoiveProduct data={data2} title={"Đạo diễn"} />
            <MoiveProduct data={data1} title={"Diễn viên"} />
        </div>
    )
}
export default TextDetail;