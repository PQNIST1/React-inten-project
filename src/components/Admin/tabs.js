import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab } from '../../controller/SliceReducer/tab'

const Tab = ({ title, isActive, onClick }) => {
  return (
    <div
      className={`cursor-pointer inline-block  ${isActive ? "text-blue-500 border-b-2 border-blue-500" : ""}`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

const ContTabs = () => {
  const activeTab = useSelector((state) => state.tab.activeTab);
  const dispatch = useDispatch();

  const handleTabClick = (tab) => {
    dispatch(setActiveTab(tab));
  };

  return (
    <div className="mx-auto w-96 mt-5 ">
      <div className="flex space-x-4  ">
        <Tab
          title="Thêm đồ ăn"
          isActive={activeTab === "food"}
          onClick={() => handleTabClick("food")}
        />
        <Tab
          title="Thêm thể loại"
          isActive={activeTab === "category"}
          onClick={() => handleTabClick("category")}
        />
        <Tab
          title="Thêm diễn viên"
          isActive={activeTab === "actor"}
          onClick={() => handleTabClick("actor")}
        />
      </div>
    </div>

  );
}
export default ContTabs;