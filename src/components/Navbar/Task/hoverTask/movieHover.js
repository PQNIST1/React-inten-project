import React, {useState, useEffect} from "react";
import MovieFeature from "./ImageHover/hoverFeature";
import { useDispatch, useSelector } from "react-redux";
import { getMovieCurrent, getMovieUpcoming } from "../../../../controller/SliceReducer/moive";

const MoiveHover = () => {
    const dispatch = useDispatch();
    const moviec = useSelector((state) => state.data.current);
    const movieu = useSelector((state) => state.data.upcoming);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const status = useSelector((state) => state.data.status);
    const [sliceData, setSliceData] = useState([]);
    const [sliceData1, setSliceData1] = useState([]);
    
    useEffect(()=> {
        dispatch(getMovieCurrent());
        dispatch(getMovieUpcoming());
    },[dispatch]);

    useEffect(() => {
        if (status === 'succeeded') {
            setData(moviec);
            setData1(movieu);
        }
    }, [status, moviec, movieu]);

    useEffect(() => {
        if (data && data.data && data1 && data1.data) {
            setSliceData(data.data.slice(0, 4));
            setSliceData1(data1.data.slice(0, 4).reverse());
        }
    }, [data, data1]);
    return (
        <div className="rounded z-10 shadow-inner w-2/5 h-auto px-5 pt-5 bg-white absolute top-20 mt-1">
            <MovieFeature title={'Phim đang chiếu'}  data={sliceData}/>
            <MovieFeature title={'Phim sắp chiếu'} data={sliceData1}/>
        </div>
    )
}
export default MoiveHover;