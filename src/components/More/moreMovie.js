import React from "react";
import MoiveList from "../Moive/movieList";
import { useSelector } from "react-redux";
import MoreListing from "./moreListing";
import { useState, useEffect } from "react";


const MoreMoive = () => {
      const movies = useSelector((state) => state.data.data);
    const [data, setData] = useState([]);
    const status = useSelector((state) => state.data.status);
    useEffect(() => {
        if (status === 'succeeded') {
            setData(movies);
        }
    }, [status, movies]);
    const activeTab = useSelector((state) => state.tab.activeMovieTab);
    return (
        <div className="w-5/6 h-auto mx-auto mt-20 flex-col text-center mb-20">
            <MoiveList />
           {data.data && (
                <>
                    {activeTab === 'tab1' && <MoreListing data={data.data} />}
                    {activeTab === 'tab2' && <MoreListing data={data.data} />}
                </>
            )}
        </div>
    )
}
export default MoreMoive;