import React from "react";
import Banking from "./banking";
import { payment } from "../../../data/hashData";

const Payment = () => {
    const data = payment;
    return (
        <div className="w-full space-y-16">
            <div className="">
                <p className="text-lg font-bold text-white mb-5">Khuyến mãi</p>
                <div className="space-y-2 text-sm">
                    <p className="text-white">Mã khuyến mãi</p>
                    <form>
                        <input className="h-11 w-52 bg-transparent border focus:outline-none mr-3" required></input>
                        <button type="submit" className="bg-orange-500 text-white rounded py-3 px-5">Áp dụng</button>
                    </form>
                    <p className="text-sm">Lưu ý: Có thể áp dụng nhiều vouchers vào 1 lần thanh toán</p>
                </div>

            </div>
            <div className="">
                <p className="text-lg font-bold text-white mb-5">Phương thức thanh toán</p>
                <div>
                    <div className="flex flex-col space-y-2">
                        {data.map((item) => (
                            <Banking option={item.name} value={item.id} img={item.img} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Payment;