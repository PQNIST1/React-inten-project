import React from "react";
import CategoryMovie from "./categoryMovie";

const CategoryList = () => {
    return (
        <div className="space-y-5 mt-10">
            <CategoryMovie />
            <CategoryMovie />
            <CategoryMovie />
        </div>
    )
}
export default CategoryList;