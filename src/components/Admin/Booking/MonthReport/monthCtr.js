import React from "react";
import MonthList from "./monthList";
import MonthForm from "./monthForm";


const MonthCtr = () => {
    return (
        <div className="flex  mt-10 mb-10 w-5/6 m-auto">
    
        <div className="w-4/5 pl-20">
            <MonthList/>
        </div>
        <div className="">
            <MonthForm/>
        </div>
    </div>
    )
}
export default MonthCtr;