import React from "react";
import { Link } from "react-router-dom";
import LargeFeature from "./movieImage/largeFeature";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";


const MoiveListing = ({ data }) => {
  
  return (
    <div className="">
      <div className="grid grid-cols-4 gap-7 mt-6">
        {data.map(item => (
            <LargeFeature data={item.object} />
            
        ))}
      </div>
      <Link to={'/more'}>
        <button className="bg-transparent  border border-orange-400 text-orange-400 hover:bg-orange-500 hover:text-white px-5 py-2 mt-8 rounded">
          Xem thêm
          <span className="ml-1.5"><FontAwesomeIcon icon={faAngleRight} /></span>
        </button>
      </Link>
    </div>

  )
}
export default MoiveListing;