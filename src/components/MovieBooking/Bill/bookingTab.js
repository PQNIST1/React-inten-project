import React from "react";
import { useSelector } from "react-redux";

const Tab = ({ title, isActive, onClick }) => {
  return (
    <div
      className={`cursor-pointer inline-block capitalize   ${isActive ? "text-blue-500 border-b-2 border-blue-500" : ""}`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

const BookingTabs = () => {
  const activeTab = useSelector((state) => state.tab.activeTab);


  return (
    <div className="flex space-x-4 justify-center mb-10">
      <Tab
        title="Chọn phim / Suất "
        isActive={activeTab === "movie"}
      />
      <Tab
        title="Chọn ghế"
        isActive={activeTab === "seat"}
      />
      <Tab
        title="Chọn thức ăn"
        isActive={activeTab === "food"}
      />
      <Tab
        title="thanh toán"
        isActive={activeTab === "payment"}
      />
      <Tab
        title="xác nhận"
        isActive={activeTab === "comfirm"}
      />
    </div>
  );
};

export default BookingTabs;
