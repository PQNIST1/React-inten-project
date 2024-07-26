import React from "react";
import CategoryType from "./categoryType";
import Country from "./country";

const CategoryFilter = () => {
    return (
        <div className="flex mt-5 space-x-5">
            <CategoryType/>
            <Country/>
        </div>
    )
}
export default CategoryFilter;