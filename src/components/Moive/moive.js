import React, { useEffect, useState } from "react";
import MoiveList from "./movieList";
import MoiveListing from "./movies";
import { useSelector } from "react-redux";

const Moive = () => {
    const movies = useSelector((state) => state.data.data);
    const [data, setData] = useState([]);
    const status = useSelector((state) => state.data.status);
    const activeTab = useSelector((state) => state.tab.activeMovieTab);
    const [sliceData, setSliceData] = useState([]);
    const [sliceData1, setSliceData1] = useState([]);
    
    useEffect(() => {
        if (status === 'succeeded') {
            setData(movies);
        }
    }, [status, movies]);

    useEffect(() => {
        if (data && data.data) {
            setSliceData(data.data.slice(0, 8));
            setSliceData1(data.data.slice(0, 8).reverse());
        }
    }, [data]);

    return (
        <div className="w-5/6 h-auto mx-auto mt-20 flex-col text-center">
            <MoiveList />
            {sliceData && (
                <>
                    {activeTab === 'tab1' && <MoiveListing data={sliceData} />}
                    {activeTab === 'tab2' && <MoiveListing data={sliceData1} />}
                </>
            )}
        </div>
    )
}

export default Moive;
