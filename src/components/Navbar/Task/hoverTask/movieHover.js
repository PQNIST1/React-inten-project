import React, {useState, useEffect} from "react";
import MovieFeature from "./ImageHover/hoverFeature";
import { useSelector } from "react-redux";

const MoiveHover = () => {
    const movies = useSelector((state) => state.data.data);
    const [data, setData] = useState([]);
    const status = useSelector((state) => state.data.status);
    const [sliceData, setSliceData] = useState([]);
    const [sliceData1, setSliceData1] = useState([]);
    
    useEffect(() => {
        if (status === 'succeeded') {
            setData(movies);
        }
    }, [status, movies]);

    useEffect(() => {
        if (data && data.data) {
            setSliceData(data.data.slice(0, 4));
            setSliceData1(data.data.slice(0, 4).reverse());
        }
    }, [data]);
    return (
        <div className="rounded z-10 shadow-inner w-2/5 h-auto px-5 pt-5 bg-white absolute top-20 mt-1">
            <MovieFeature title={'Phim đang chiếu'}  data={sliceData}/>
            <MovieFeature title={'Phim sắp chiếu'} data={sliceData1}/>
        </div>
    )
}
export default MoiveHover;