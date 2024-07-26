import React from "react";
import ShowTimeForm from "./showTimeForm";
import ShowTimeList from "./showTimeList";


const ShowTimeCtr = () => {
    return (
        <div className="flex  mt-10 mb-10 w-5/6 m-auto">
            <div className="w-3/4 pl-20">
                <ShowTimeList />
            </div>
            <div className=" w-1/4">
                <ShowTimeForm />
            </div>
        </div>
    )
}
export default ShowTimeCtr;