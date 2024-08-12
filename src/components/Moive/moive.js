import React, { useEffect, useState } from "react";
import MoiveList from "./movieList";
import MoiveListing from "./movies";
import { useSelector } from "react-redux";

const Moive = () => {
    const movies = useSelector((state) => state.data.current);
    const moviesu = useSelector((state) => state.data.upcoming);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const status = useSelector((state) => state.data.status);
    const activeTab = useSelector((state) => state.tab.activeMovieTab);
    const [sliceData, setSliceData] = useState([]);
    const [sliceData1, setSliceData1] = useState([]);
    
    useEffect(() => {
        if (status === 'succeeded') {
            setData(movies);
            setData1(moviesu)
        }
    }, [status, movies, moviesu]);

    useEffect(() => {
        if (data && data.data && data1 && data1.data) {
            setSliceData(data.data.slice(0, 8));
            setSliceData1(data1.data.slice(0, 8).reverse());
        }
    }, [data, data1]); 
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
