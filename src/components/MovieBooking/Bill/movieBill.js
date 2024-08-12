import React from "react";
import { getDayOfWeek } from "../../Detail/Content/Time/dateCtr/datecontroller";
import Seat from "./seat";
import FoodBill from "../Food/foodBill";
import { formatDay } from "../../../controller/SliceReducer/img";
import { useSelector } from "react-redux";
import { format } from 'date-fns'

const MovieBill = ({ date, time, name, img, sseats, dseats, vseats, food, active }) => {
    const vip = useSelector(state => state.movie.vipPrice);
    const single = useSelector(state => state.movie.singlePrice);
    const double = useSelector(state => state.movie.doublePrice);
    const formatTime = (date) => {
        return format(new Date(date), 'HH:MM');
    };
    return (
        <div className="space-y-5">

            <div className=" flex">
                <img src={`http://localhost:8080${img}`} alt="" className="h-52 w-40 object-cover rounded" />
                <div className="capitalize ml-3">
                    <div className="flex">
                        <p className="text-lg font-bold">{name}</p>
                        <span className="ml-5  bg-orange-500 text-white font-bold rounded h-7 px-2">T18</span>
                    </div>
                </div>
            </div>
            {date === '' ? null :
                <div className="space-y-5 mt-3">
                    <div className="flex space-x-1">
                        <p className="font-bold text-lg">Cinema Center -</p>
                        {time !== '' && (<p className="font-bold text-lg">{time.room.name}</p>)}
                    </div>
                    <div className="flex space-x-1 text-lg">
                        <p className="">Suất: </p>
                        {time !== '' ? (<p className="font-bold">{formatTime(time.startTime)} -</p>):(<p>.........</p>)}
                        <p>{getDayOfWeek(new Date(date))},</p><p className="font-bold">{formatDay(date)}</p>
                    </div>
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