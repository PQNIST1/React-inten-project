import React from "react";
import AddCategory from "./addCategory";
import CategoryList from "./categoryList";

const AddCategoryCtr = () => {
    return (
        <div className="flex  mt-10 mb-10 w-5/6 m-auto">
            <div className="w-2/3 pl-32">
                <CategoryList />
            </div>
            <AddCategory />
        </div>
    )
}
export default AddCategoryCtr;