import React, { useState, useEffect } from "react";
import Banking from "./banking";
import { payment, payment2 } from "../../../data/hashData";
import { useSelector, useDispatch } from "react-redux";
import { setPhone } from "../../../controller/SliceReducer/payment";

const Payment = () => {
    const paymentMethod = payment;
    const paymentMethod2 = payment2;
    const userInfo = useSelector((state) => state.user.userInfo);
    const [data, setData] = useState({});
    const status = useSelector((state) => state.user.status);
    const isValidData = data?.data && data.data.roles && data.data.roles.length > 0;
    const isAdmin = isValidData && data.data.roles.some(role => role.id === 3);
    const isEmployee = isValidData && data.data.roles.some(role => role.id === 2);
    const dispatch = useDispatch();
    const phone = useSelector((state) => state.payment.phone);

    const handleChange = (e) => {
        dispatch(setPhone(e.target.value));
    };
    useEffect(() => {
        if (status === 'succeeded') {
            setData(userInfo);
        }
    }, [status, userInfo]);

    let content;
    if (isAdmin && isEmployee) {
        content = <div className="">
            <p className="text-lg font-bold text-white mb-5">Đặt vé</p>
            <div className="space-y-2 text-sm">
                <p className="text-white">Số điện thoại</p>
                <input value={phone}
                    onChange={handleChange} className="pl-2 h-11 w-52 bg-transparent border focus:outline-none mr-3" type="tel" required></input>
                <p className="text-sm">Lưu ý: Đảm bảo số điện thoại chính xác</p>
            </div>

        </div>;
    } else {
        content = <div className="">
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
    }
    let method;
    if (isAdmin ||  isEmployee) {
        method = <div className="">
            <p className="text-lg font-bold text-white mb-5">Phương thức thanh toán</p>
            <div>
                <div className="flex flex-col space-y-2">
                    {paymentMethod2.map((item) => (
                        <Banking key={item.id} option={item.name} value={item.id} img={item.img} method={item.method} />
                    ))}
                </div>
            </div>
        </div>
    } else {
        method = <div className="">
            <p className="text-lg font-bold text-white mb-5">Phương thức thanh toán</p>
            <div>
                <div className="flex flex-col space-y-2">
                    {paymentMethod.map((item) => (
                        <Banking key={item.id} option={item.name} value={item.id} img={item.img} method={item.method} />
                    ))}
                </div>
            </div>
        </div>
    }

    return (
        <div className="w-full space-y-16">
            {content}
            {method}

        </div>
    )
}
export default Payment;