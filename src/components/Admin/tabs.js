import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab, setPage } from '../../controller/SliceReducer/tab'
import { clearSearch } from "../../controller/SliceReducer/search";
import { clearForm } from "../../controller/SliceReducer/seat";
import { clearForm as clearForm1 } from "../../controller/SliceReducer/addFood";
import { clearForm as clearForm2 } from "../../controller/SliceReducer/addCategory";
import { clearForm as clearForm3 } from "../../controller/SliceReducer/addActor";
import { clearForm as clearForm5 } from "../../controller/SliceReducer/addRoom";
import { clearForm as clearForm6 } from "../../controller/SliceReducer/addShowTime";
import { Link } from "react-router-dom";


const Tab = ({ title, isActive, onClick, link}) => {
  return (
    <div
      className={`cursor-pointer inline-block  ${isActive ? "text-blue-500 border-b-2 border-blue-500" : ""}`}
      onClick={onClick}
    >
      <Link to={`/add/#${link}?page=1`}>
        {title}
      </Link>
    </div>
  );
};

const ContTabs = () => {
  const activeTab = useSelector((state) => state.tab.activeTab);
  const dispatch = useDispatch();

  const handleTabClick = (tab) => {
    dispatch(setActiveTab(tab));
    dispatch(setPage(1));
    dispatch(clearSearch());
    dispatch(clearForm());
    dispatch(clearForm1());
    dispatch(clearForm2());
    dispatch(clearForm3());
    dispatch(clearForm5());
    dispatch(clearForm6());
  };

  return (
    <div className="mx-auto w-1/2 mt-5 ">
      <div className="flex space-x-4 ">
        <Tab
          title="Thêm đồ ăn"
          isActive={activeTab === "food"}
          link={'food'}
          onClick={() => handleTabClick("food")}
        />
        <Tab
          title="Thêm thể loại"
          isActive={activeTab === "category"}
          link={'category'}
          onClick={() => handleTabClick("category")}
        />
        <Tab
          title="Thêm diễn viên"
          isActive={activeTab === "actor"}
          link={'actor'}
          onClick={() => handleTabClick("actor")}
        />
        <Tab
          title="Thêm phòng"
          isActive={activeTab === "room"}
          link={'room'}
          onClick={() => handleTabClick("room")}
        />
        <Tab
          title="Thêm ghế"
          isActive={activeTab === "seat-type"}
          link={'seat-type'}
          onClick={() => handleTabClick("seat-type")}
        />
        <Tab
          title="Thêm thời gian"
          isActive={activeTab === "time"}
          link={'time'}
          onClick={() => handleTabClick("time")}
        />
         <Tab
          title="Ngày khởi chiếu"
          isActive={activeTab === "showTime"}
          link={'showTime'}
          onClick={() => handleTabClick("showTime")}
        />
      </div>
    </div>

  );
}
export default ContTabs;