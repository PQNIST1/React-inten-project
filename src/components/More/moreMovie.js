import React from "react";
import MoiveList from "../Moive/movieList";
import { useSelector } from "react-redux";
import { dataComming, dataShowing } from "../../data/hashData";
import MoreListing from "./moreListing";


const MoreMoive = () => {
    const data = dataShowing;
    const data1 = dataComming;
    const activeTab = useSelector((state) => state.tab.activeTab);
    return (
        <div className="w-5/6 h-auto mx-auto mt-20 flex-col text-center mb-20">
            <MoiveList />
            {activeTab === 'profile' && <MoreListing data={data} />}
            {activeTab === 'history' && <MoreListing data={data1} />}
        </div>
    )
}
export default MoreMoive;