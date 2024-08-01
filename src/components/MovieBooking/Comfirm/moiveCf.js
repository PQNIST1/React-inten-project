import React from "react";
import { useSelector } from "react-redux";
import Seat from "../Bill/seat";

const MovieCf = () => {
    const SingleSeats = useSelector((state) => state.movie.selectedSingleSeats);   
    const DoubleSeats = useSelector((state) => state.movie.selectedDoubleSeats);
    const VipSeats = useSelector((state) => state.movie.selectedVipSeats);
    const vip = useSelector(state => state.movie.vipPrice);
    const single = useSelector(state => state.movie.singlePrice);
    const double = useSelector(state => state.movie.doublePrice);
    const getTotal = SingleSeats.length * single + DoubleSeats.length * double + VipSeats.length * vip;

    return (
        <div className="w-1/2">
            <div className="space-y-5">
                <div className="font-bold text-lg">
                    <p>Ghế</p>
                </div>
               
                <div>
                    {SingleSeats.length === 0 ? null : <Seat data={SingleSeats} title={'Ghế đơn'} price={single} />}
                    {DoubleSeats.length === 0 ? null : <Seat data={DoubleSeats} title={'Ghế đôi'} price={double}/>}
                    {VipSeats.length === 0 ? null : <Seat data={VipSeats} title={'Ghế Vip'} price={vip} />}
                </div>
               
                <div className="flex border-t-2 border-dotted py-5 space-x-11">
                  
                    <div className="">
                        <p className="font-bold">Số lượng</p>
                        <p>{getTotal}</p>
                    </div>
                    <div className="capitalize">
                        <p className="font-bold">Tổng cộng</p>
                        <p className="">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(getTotal)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MovieCf;