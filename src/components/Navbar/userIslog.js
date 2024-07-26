import React, { useEffect, useState } from "react";
import UserHover from "./Task/hoverTask/userHover";
import { useSelector } from "react-redux";
import AdminHover from "./Task/hoverTask/hoverAdmin";

const Userlog = () => {
    const [isHovered, setIsHovered] = useState(false);
    const userInfo = useSelector((state) => state.user.userInfo);
    const [data, setData] = useState({});
    const status = useSelector((state) => state.user.status);

    useEffect(() => {
        if (status === 'succeeded') {
            setData(userInfo);
        }
    }, [status, userInfo]);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="my-auto flex ml-14 pb-2"
        >
            <div className="h-12 my-auto mr-3 mt-2">
                <img
                    src="https://i.imgur.com/ZI1BmOM.png"
                    alt="avatar"
                    className="h-10 w-10 rounded-full"
                />
            </div>
            <div>
                {data.data && ( 
                    <>
                        <div className="flex hover:text-yellow-400 font-bold">
                            <img
                                src="https://i.imgur.com/vsSqNTa.png"
                                alt="avatar"
                                className="h-8"
                            />
                            <h6>{data.data.user.userName}</h6>
                        </div>
                        <div className="flex hover:text-yellow-400">
                            <img
                                src="https://i.imgur.com/Kfno3ND.png"
                                alt="avatar"
                                className="h-4 px-1 mt-1"
                            />
                            <h6>0 Stars</h6>
                        </div>
                    </>
                )}
            </div>
            {/* {isHovered && <UserHover />} */}
            {isHovered && <AdminHover />}
        </div>
    );
};
export default Userlog;