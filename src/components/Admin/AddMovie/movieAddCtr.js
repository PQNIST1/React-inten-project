import React from "react";
import MovieForm from "./movieForm";
import MovieList from "./movieList";

const MovieAddCtr = () => {
    return (
        <div className="flex w-5/6 m-auto my-10">
            <div className="w-3/5 pl-20">
                <MovieList/>
            </div>
            <div className="w-2/5 ">
                <MovieForm />
            </div>
        </div>
    )
}
export default MovieAddCtr;