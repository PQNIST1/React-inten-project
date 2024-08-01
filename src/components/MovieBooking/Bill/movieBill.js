import React,{ useEffect,useState } from "react";
import { getDayOfWeek } from "../../Detail/Content/Time/dateCtr/datecontroller";
import Seat from "./seat";
import FoodBill from "../Food/foodBill";
import { ImgController, formatDay } from "../../../controller/SliceReducer/img";
import { useSelector } from "react-redux";

const MovieBill = ({ date, time, name, img, sseats, dseats, vseats, food, active }) => {
    const [imageSrc, setImageSrc] = useState('');
    const vip = useSelector(state => state.movie.vipPrice);
    const single = useSelector(state => state.movie.singlePrice);
    const double = useSelector(state => state.movie.doublePrice);
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
                    <p className="font-bold text-lg">Cinema Center - {time.name}</p>
                    <p className="text-lg">Suất: <span className="font-bold">{time.time}</span> - {getDayOfWeek(new Date(date))}, <span className="font-bold">{formatDay(date)}</span></p>
                </div>
            }

            {active === 'comfirm' ? null :
                <div>
                    {sseats.length === 0 ? null : <Seat data={sseats} title={'Ghế đơn'} price={single} />}
                    {dseats.length === 0 ? null : <Seat data={dseats} title={'Ghế đôi'} price={double} />}
                    {vseats.length === 0 ? null : <Seat data={vseats} title={'Ghế Vip'} price={vip} />}
                    {food.length === 0 ? null : <FoodBill />}
                </div>
            }

        </div>
    )
}
export default MovieBill;