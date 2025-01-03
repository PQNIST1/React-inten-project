import React from "react";
import ChoiseMovie from "./choiseMovie";
import ChoiseDay from "./choiseDay";
import ChoiseTime from "./choiseTime";
import FastButton from "./fastButton";

const FastTicket = () => {
    return (
        <div className="border w-full sm:w-10/12 lg:w-8/12 h-12 -bottom-8 bg-white shadow-black shadow rounded absolute flex p-1 gap-1">
            <ChoiseMovie />
            <ChoiseDay />
            <ChoiseTime />
            <FastButton />
        </div>
    )
}
export default FastTicket;