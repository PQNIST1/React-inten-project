import React from "react";




const Movie = ({ data }) => {

    return (
        <tr className=" transition-all duration-500  text-gray-400 ">
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium">
                {data.movie}
            </td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.successRevenue)}
            </td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium ">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.failedRevenue)}
            </td>

        </tr>
    )
}
export default Movie;