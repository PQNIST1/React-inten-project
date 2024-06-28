import React from "react";
import MoiveList from "./movieList";
import MoiveListing from "./movies";
import { useSelector } from "react-redux";
import { dataComming, dataShowing } from "../../data/hashData";


const Moive = () => {
    const data = dataShowing;
    const data1 = dataComming;
    const activeTab = useSelector((state) => state.tab.activeTab);
    return (
        <div className="w-5/6 h-auto mx-auto mt-20 flex-col text-center">
            <MoiveList />
            {activeTab === 'profile' && <MoiveListing data={data} />}
            {activeTab === 'history' && <MoiveListing data={data1} />}
           

        </div>
    )
}
export default Moive;