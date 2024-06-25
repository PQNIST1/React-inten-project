import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab } from "../../controller/tab";

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

const MoviesTabs = () => {
  const activeTab = useSelector((state) => state.tab.activeTab);
  const dispatch = useDispatch();

  const handleTabClick = (tab) => {
    dispatch(setActiveTab(tab));
  };

  return (
    <div className="flex space-x-4">
      <Tab
        title="Đang chiếu"
        isActive={activeTab === "tab1"}
        onClick={() => handleTabClick("tab1")}
      />
      <Tab
        title="Sắp chiếu"
        isActive={activeTab === "tab2"}
        onClick={() => handleTabClick("tab2")}
      />
    </div>
  );
};

export default MoviesTabs;
