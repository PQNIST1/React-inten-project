import React from "react";
import { getDayOfWeek } from "../../Detail/Content/Time/dateCtr/datecontroller";
import Seat from "./seat";
import FoodBill from "../Food/foodBill";
import { useEffect,useState } from "react";
import { ImgController } from "../../../controller/SliceReducer/img";

const MovieBill = ({ date, time, name, img, sseats, dseats, vseats, food, active }) => {
    const [imageSrc, setImageSrc] = useState('');
    useEffect(() => {
        const imgData = img;
        const imageUrl = ImgController(imgData);
        setImageSrc(imageUrl);
        return () => URL.revokeObjectURL(imageUrl);
      }, [img]);
    return (
        <div className="space-y-5">

            <div className=" flex">
                <img src={imageSrc} alt="" className="h-52 w-40 object-cover rounded" />
                <div className="capitalize ml-3">
                    <div className="flex">
                        <p className="text-lg font-bold">{name}</p>
                        <span className="ml-5  bg-orange-500 text-white font-bold rounded h-7 px-2">T18</span>
                    </div>
                </div>
            </div>
            {date === '' ? null :
                <div className="space-y-5 mt-3">
                    <p className="font-bold text-lg">Cinema Center - Rạp 2</p>
                    <p className="text-lg">Suất: <span className="font-bold">{time}</span> - {getDayOfWeek(new Date(date))}, <span className="font-bold">{date}</span></p>
                </div>
            }

            {active === 'comfirm' ? null :
                <div>
                    {sseats.length === 0 ? null : <Seat data={sseats} title={'Ghế đơn'} />}
                    {dseats.length === 0 ? null : <Seat data={dseats} title={'Ghế đôi'} />}
                    {vseats.length === 0 ? null : <Seat data={vseats} title={'Ghế Vip'} />}
                    {food.length === 0 ? null : <FoodBill />}
                </div>
            }

        </div>
    )
}
export default MovieBill;