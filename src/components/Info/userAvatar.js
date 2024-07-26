import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab } from "../../controller/SliceReducer/tab";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Tab = ({ title, isActive, onClick, link }) => {
    return (
        <div>
            <Link to={`/info/#${link}`}>
                <button onClick={onClick} className={`border rounded text-white text-2xl h-14 w-28 ${isActive ? "bg-blue-700" : ""}`}>{title}</button>
            </Link>
        </div>
    );
};


const UserAvatar = () => {
    const userInfo = useSelector((state) => state.user.userInfo);
    const [data, setData] = useState({});
    const status = useSelector((state) => state.user.status);

    useEffect(() => {
        if (status === 'succeeded') {
            setData(userInfo);
        }
    }, [status, userInfo]);

    const activeTab = useSelector((state) => state.tab.activeTab);
    const dispatch = useDispatch();

    const handleTabClick = (tab) => {
        dispatch(setActiveTab(tab));
    };
    return (
        <div className="w-2/3  h-80  ml-10 rounded p-5">
            <div className="flex justify-center">
                <div className="h-20 w-20 my-auto mr-3 mt-2 rounded-full">
                    <img src="https://i.imgur.com/ZI1BmOM.png" alt="avatar" className="h-full w-full rounded-full" />
                </div>
                <div className="">
                    {data.data && (
                        <div className="flex hover:text-yellow-400 font-bold justify-center items-center">
                            <img src="https://i.imgur.com/vsSqNTa.png" alt="avatar" className="h-16" />
                            <p className="text-2xl">{data.data.user.userName}</p>
                        </div>
                    )}
                    <div className="flex hover:text-yellow-400 items-center">
                        <img src="https://i.imgur.com/Kfno3ND.png" alt="avatar" className="h-8 px-1 mt-1" />
                        <p className="text-2xl">0 Stars</p>
                    </div>
                </div>
            </div>
            <div className="mt-10  space-x-5 flex justify-center">
                <Tab
                    title="Tài khoản"
                    isActive={activeTab === "profile"}
                    onClick={() => handleTabClick("profile")}
                    link={'profile'}
                />
                <Tab
                    title="Lịch sử"
                    isActive={activeTab === "history"}
                    onClick={() => handleTabClick("history")}
                    link={'history'}
                />
            </div>
        </div>
    )
}
export default UserAvatar;