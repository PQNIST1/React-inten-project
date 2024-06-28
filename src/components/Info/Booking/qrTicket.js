import React from "react";

const QrTicket = () => {
    return (
        <div className="w-1/2  space-y-5">
        <div className="flex">
            <img src="https://cdn.galaxycine.vn/media/2024/6/4/mua-he-dep-nhat-2_1717486022304.jpg" alt="" className="rounded h-52" />
            <div>
                <div className="flex ml-5">
                    <p className="text-lg font-bold w-40 ">Mùa hè đẹp nhất</p>
                    <span className=" bg-orange-500 text-white font-bold rounded h-7 px-2">T18</span>
                </div>
            </div>
           
        </div>
        <div>
            <div className="space-y-2 mt-3">
                <p><span className=" font-bold">Cinema Center</span> - Rạp 2</p>
                <p><span className=" font-bold">Xuất: 11:30</span> - Thứ Năm, 27/6/2024</p>
            </div>
        </div>
        <div className="flex items-center justify-center">
            <img src="https://i.imgur.com/MZRxnCO.png" alt="" className="h-40" />
        </div>
        <div className="border-t-2 border-dotted pt-5">
            <p><span className="font-bold">Ghế</span> - N10, N11</p>
        </div>
        <div className="flex border-t-2 border-dotted py-5 space-x-11">
            <div className="">
                <p className="font-bold">Mã vé</p>
                <p>1234567</p>
            </div>
            <div className="">
                <p className="font-bold">Số lượng</p>
                <p>2</p>
            </div>
            <div className="capitalize">
                <p className="font-bold">Tổng cộng</p>
                <p>140.000 VNĐ</p>
            </div>
        </div>
    </div>
    )
}
export default QrTicket;