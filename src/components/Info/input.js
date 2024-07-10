import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const InputChange = ({ icon, title, value }) => {
    const [isEditing, setIsEditing] = useState(false);
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };
    return (
        <div className="w-1/2 mb-5 h-20 ">
            <label>{title}:</label>
            <div className="w-full flex">
                <div className="w-80 border h-10 rounded hover:border-blue-500 px-2 flex">
                    <FontAwesomeIcon icon={icon} className="my-auto mr-2 text-lg" />
                    {isEditing ? (
                        <input  className="bg-transparent border-none h-full focus:outline-none w-full " required type="text"></input>

                    ) : (
                        <p className="my-auto">{value}</p>
                    )}
                </div>
                {isEditing ? (
                    <>
                        <div className='w-20 h-14 '>
                            <button onClick={handleEditClick} type="button"  className="w-16 h-6 text-blue-700  hover:text-white ">Thay đổi</button>
                            <button onClick={handleEditClick} type="button" className="w-16 h-6 text-blue-700  hover:text-white ">Hủy</button>
                        </div>
                    </>
                ) : (
                    <button onClick={handleEditClick} type="button" className="w-20 text-blue-700">Thay đổi</button>
                )}
            </div>

        </div>
    )
}
export default InputChange;