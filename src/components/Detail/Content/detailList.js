import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import MidFeature from "./mdHover/mdFeature";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../../controller/SliceReducer/tab";


const DetailListing = ({ data }) => {
  const dispatch = useDispatch();

  const handleTabClick = (tab) => {
    dispatch(setActiveTab(tab));
  };
  return (
    <div className="">
      <div className="grid grid-cols-1 gap-y-14 mt-6">
        {data.map(item => (
          <Link to='/detail'>
            <MidFeature data={item} />
          </Link>
        ))}
      </div>
      <Link to={'/more'}>
        <button  onClick={() => handleTabClick("profile")} className=" bg-transparent  border border-orange-400 text-orange-400 hover:bg-orange-500 hover:text-white px-5 py-2 mt-14 rounded">
          Xem thêm
          <span className="ml-1.5"><FontAwesomeIcon icon={faAngleRight} /></span>
        </button>
      </Link>
    </div>

  )
}
export default DetailListing;