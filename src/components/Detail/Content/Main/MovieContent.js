import React, {useEffect, useState} from "react";
import DetailListing from "../detailList";
import { useSelector } from "react-redux";

const MoiveContent = () => {
    const movies = useSelector((state) => state.data.current);
    const [data, setData] = useState([]);
    const status = useSelector((state) => state.data.status);
    const [sliceData, setSliceData] = useState([]);
    
    useEffect(() => {
        if (status === 'succeeded') {
            setData(movies);
        }
    }, [status, movies]);

    useEffect(() => {
        if (data && data.data) {
            setSliceData(data.data.slice(0, 3));
        }
    }, [data]);
    return (
        <div className=" h-full w-full pl-5 pt-5">
            <div className="border-l-4 border-blue-800 font-bold h-6 flex mb-4">
                <h1 className="mr-10 uppercase inline ml-3 text-white my-auto text-lg">phim đang chiếu</h1>
            </div>
            <DetailListing data={sliceData}/>
        </div>

    )
}
export default MoiveContent;