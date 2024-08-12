import React from "react";
import DateForm from "../MovieReport/dateForm";
import DailyList from "./dailyList";


const DailyCtr = () => {
    return (
        <div className="flex  mt-10 mb-10 w-5/6 m-auto">
    
        <div className="w-4/5 pl-20">
            <DailyList/>
        </div>
        <div className="">
            <DateForm/>
        </div>
    </div>
    )
}
export default DailyCtr;