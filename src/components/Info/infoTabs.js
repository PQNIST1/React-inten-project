import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab } from "../../controller/SliceReducer/tab";
import { Link } from "react-router-dom";


const Tab = ({ title, isActive, onClick, link }) => {
    return (

        <div
            className={`h-10 cursor-pointer inline-block text-lg  ${isActive ? "text-blue-500 border-b-2 border-blue-500" : ""}`}
            onClick={onClick}
        >
            <Link to={`/info/#${link}`}>
                {title}

            </Link>
        </div>
    );
};


const InfoTab = () => {
    const activeTab = useSelector((state) => state.tab.activeTab);
    const dispatch = useDispatch();

    const handleTabClick = (tab) => {
        dispatch(setActiveTab(tab));
    };

    return (
        <div className="flex space-x-4  ">
            <Tab
                title="Thông tin cá nhân"
                isActive={activeTab === "profile"}
                onClick={() => handleTabClick("profile")}
                link={"profile"}
            />
            <Tab
                title="Lịch sử giao dịch"
                isActive={activeTab === "history"}
                onClick={() => handleTabClick("history")}
                link={"history"}
            />
        </div>
    );
}
export default InfoTab;