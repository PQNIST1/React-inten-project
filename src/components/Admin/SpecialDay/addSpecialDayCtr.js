import React from "react";
import AddSpecialDay from "./addSpecialDay";
import DayList from "./dayList";

const SpecialDayCtr = () => {
    return (
        <div className="flex  mt-10 mb-10 w-5/6 m-auto">
    
        <div className="w-4/5 pl-20">
            <DayList/>
        </div>
        <div className="">
            <AddSpecialDay/>
        </div>
    </div>
    )
}
export default SpecialDayCtr;