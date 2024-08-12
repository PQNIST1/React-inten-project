import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab, setPage } from '../../../controller/SliceReducer/tab'
import { Link } from "react-router-dom";
import { clearForm } from "../../../controller/SliceReducer/specialDay";


const Tab = ({ title, isActive, onClick, link}) => {
  return (
    <div
      className={`cursor-pointer inline-block  ${isActive ? "text-blue-500 border-b-2 border-blue-500" : ""}`}
      onClick={onClick}
    >
      <Link to={`/ticket/#${link}?page=1`}>
        {title}
      </Link>
    </div>
  );
};

const TabsBooking = () => {
  const activeTab = useSelector((state) => state.tab.activeTab);
  const dispatch = useDispatch();

  const handleTabClick = (tab) => {
    dispatch(setActiveTab(tab));
    dispatch(setPage(1));
    dispatch(clearForm());
  };

  return (
    <div className="mx-auto w-1/2 mt-5 ">
      <div className="flex space-x-4 justify-center ">
        <Tab
          title="Vé"
          isActive={activeTab === "ticket"}
          link={'ticket'}
          onClick={() => handleTabClick("ticket")}
        />
        <Tab
          title="Doanh thu phim"
          isActive={activeTab === "movie"}
          link={'movie'}
          onClick={() => handleTabClick("movie")}
        />
        <Tab
          title="Doanh thu tháng"
          isActive={activeTab === "month"}
          link={'month'}
          onClick={() => handleTabClick("month")}
        />
        <Tab
          title="Doanh thu ngày"
          isActive={activeTab === "daily"}
          link={'daily'}
          onClick={() => handleTabClick("daily")}
        />
      </div>
    </div>

  );
}
export default TabsBooking;