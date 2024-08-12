import React from "react";
import UserAvatar from "./userAvatar";
import InfoTab from "./infoTabs";
import Profile from "./profile";
import { useSelector} from "react-redux";
import Booking from "./Booking/booking";



const UserBlog = () => {
    const activeTab = useSelector((state) => state.tab.activeTab);
    return (
        <div className="w-5/6 m-auto mt-10 mb-20 flex">
            <UserAvatar />
            <div className="ml-20 w-full">
                <InfoTab />
                {activeTab === 'profile' && <Profile/>}
                {activeTab === 'history' && <Booking/>}
                
            </div>
        </div>
    )
}
export default UserBlog;