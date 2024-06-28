import React from "react";
import LargeFeature from "../Moive/movieImage/largeFeature";



const MoreListing = ({ data }) => {
  return (
    <div className="">
      <div className="grid grid-cols-4 gap-7 mt-6">
        {data.map(item => (
            <LargeFeature data={item} />
        ))}
      </div>
      
    </div>

  )
}
export default MoreListing;