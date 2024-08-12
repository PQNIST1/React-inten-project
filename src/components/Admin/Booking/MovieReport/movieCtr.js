import React from "react";
import MovieList from "./movieList";
import DateForm from "./dateForm";


const MovieCtr = () => {
    return (
        <div className="flex  mt-10 mb-10 w-5/6 m-auto">
    
        <div className="w-4/5 pl-20">
            <MovieList/>
        </div>
        <div className="">
            <DateForm/>
        </div>
    </div>
    )
}
export default MovieCtr;