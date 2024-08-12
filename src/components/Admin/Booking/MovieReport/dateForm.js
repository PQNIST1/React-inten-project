import React from "react";
import  MyDatePicker from '../../SpecialDay/selectDay';


const DateForm = () => {
    return (
        <div className="">
            <div className="dark:bg-gray-900 bg-gray-100 flex justify-center items-center mt-10 mb-10">
                <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-md shadow-lg">
                    <h2 className="text-3xl font-semibold text-center mb-6 dark:text-white">Thống kê</h2>
                    <form className="" >
                        <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md px-8  py-8 space-y-5">
                            <div>
                                <label htmlFor="name">Ngày</label>
                                <div className="special">
                                    <MyDatePicker />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default DateForm;