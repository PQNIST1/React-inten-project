import React from "react";
import { Link } from "react-router-dom";
import Box from "./box";
import BoxSub from "./boxSub";
import { dataCinema, dataPreview, dataSupport } from "../../data/hashData";

const Footer = () => {
    const data = dataPreview;
    const data1 = dataCinema;
    const data2 = dataSupport;
    return (
        <div className="w-full h-96 mt-20" style={{ backgroundImage: `url(https://i.imgur.com/4wpUhOR.jpeg)` }}>
            <div className="w-5/6 flex m-auto py-14 px-10">
                <div className=" w-60">
                    <Link to={"/"}>
                        <img src="https://i.imgur.com/utVCQHK.png" alt="" className="h-28" />
                    </Link>
                    <p className="uppercase text-sm mt-10 mb-2">12 đại lộ khoa học, p.ghềnh ráng, tp.quy nhơn, t.bình định </p>
                    <p className="">Liên hệ: <span className="text-white text-lg">(+84) 362696258</span></p>
                </div>
                <Box data={data}/>
                <Box data={data1}/>
                <Box data={data2}/>
                <BoxSub/>
            </div>
        </div>
    )
}
export default Footer;