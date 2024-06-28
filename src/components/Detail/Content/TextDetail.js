import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import MoiveProduct from "./Main/MoiveProduct";
import { dataActor, dataDirector, dataGender } from '../../../data/hashData';

const TextDetail = () => {
    const data = dataGender;
    const data1 = dataActor;
    const data2 = dataDirector;
    return (
        <div className="pt-7 pl-5  space-y-2 ">
            <div className="flex">
                <h1 className="capitalize text-2xl font-bold text-white">gia tài của ngoại</h1>
                <div className="bg-orange-500 w-9 h-6 text-white font-bold rounded text-center my-auto ml-4">
                    <p className="m-auto">T13</p>
                </div>
            </div>
            <div className="flex text-sm">
                <div className="flex">
                    <FontAwesomeIcon icon={faClock} color="orange" className="h-4 my-auto" />
                    <p className="mx-1">127 phút</p>
                </div>
                <div className="flex ml-5">
                    <FontAwesomeIcon icon={faCalendar} color="orange" className="h-4 my-auto" />
                    <p className="mx-1">06/06/2024</p>
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
            <MoiveProduct data={data} title={"Thể loại"}/>
            <MoiveProduct data={data2} title={"Đạo diễn"}/>
            <MoiveProduct data={data1} title={"Diễn viên"}/> 
        </div>
    )
}
export default TextDetail;