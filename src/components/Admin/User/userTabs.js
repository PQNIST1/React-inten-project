import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab } from '../../../controller/SliceReducer/tab'
import { Link } from "react-router-dom";


const Tab = ({ title, isActive, onClick, link}) => {
  return (
    <div
      className={`cursor-pointer inline-block  ${isActive ? "text-blue-500 border-b-2 border-blue-500" : ""}`}
      onClick={onClick}
    >
      <Link to={`/user/#${link}?page=1`}>
        {title}
      </Link>
    </div>
  );
};

const UserTabs = () => {
  const activeTab = useSelector((state) => state.tab.activeTab);
  const dispatch = useDispatch();

  const handleTabClick = (tab) => {
    dispatch(setActiveTab(tab));
  };

  return (
    <div className="mx-auto  mt-5 ">
      <div className="flex space-x-4 ">
        <Tab
          title="Người dùng"
          isActive={activeTab === "users"}
          link={'users'}
          onClick={() => handleTabClick("users")}
        />
        <Tab
          title="Tạo tài khoản"
          isActive={activeTab === "create"}
          link={'create'}
          onClick={() => handleTabClick("create")}
        />
      </div>
    </div>

  );
}
export default UserTabs;