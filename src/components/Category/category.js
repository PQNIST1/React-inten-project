import React from "react";
import CategoryFilter from "./categoryFilter";
import CategoryList from "./categoryList";
import MoiveContent from "../Detail/Content/Main/MovieContent"

const Category = () => {
    return (
        <div className="w-5/6 m-auto mt-5 mb-10">
            <div className="border-l-4 border-blue-800 font-bold h-full">
                <h1 className="mr-10 text-xl font-bold not-italic uppercase inline ml-3 text-gray-600">Phim</h1>
            </div>
            <div className="w-2/3">
                <CategoryFilter />
            </div>
            <div className="flex w-full">
                <div className="w-2/3">
                    <CategoryList />
                </div>
                <div className="w-1/3">
                    <MoiveContent />
                </div>
            </div>
        </div>
    )
}
export default Category;