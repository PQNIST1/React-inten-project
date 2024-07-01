import React from "react";
import Banking from "./banking";

const Payment = () => {
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
                       <Banking option={'HSBC/Payoo - ATM/VISA/MASTER/JCB/QRCODE'} value={'option1'} img={'https://cdn.galaxycine.vn/media/2020/10/20/hsbc-icon_1603203578522.png'}/>
                       <Banking option={'Ví ShopeePay'} value={'option2'} img={'https://cdn.galaxycine.vn/media/2022/4/29/shopee-pay_1651229746140.png'}/>
                       <Banking option={'Ví Điện Tử MoMo'} value={'option3'} img={'https://cdn.galaxycine.vn/media/2020/10/20/momo-icon_1603203874499.png'}/>
                       <Banking option={'ZaloPay'} value={'option4'} img={'https://cdn.galaxycine.vn/media/2022/12/2/icon-96x96_1669977824597.png'}/>
                       <Banking option={'VNPAY'} value={'option5'} img={'https://cdn.galaxycine.vn/media/2021/12/2/download_1638460623615.png'}/>
                     
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Payment;