import React from "react";



const User = ({ data, pp }) => { 
    // const pathname = `/room/seat/${normalizeStringForURL(data.name)}`;
    return (
        <tr className=" transition-all duration-500  text-gray-400">

            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium hover:text-orange-400  ">{data.name}</td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium ">{data.email}</td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium ">{data.phone}</td>
            <td className="p-5 whitespace-nowrap  leading-6 font-medium text-tn"><div>
                <p>{pp.createdBy.name}</p>
            </div></td>
            <td className="p-5 whitespace-nowrap leading-6 font-medium text-tn">{pp.updatedBy && (
                <div>
                    <p>{pp.updatedBy.name}</p>

                </div>
            )}</td>
            <td className="p-5 whitespace-nowrap leading-6 font-medium text-tn">{pp.roles[0] && (
                <div>
                    <p>{pp.roles[0].name}</p>
                </div>
            )}</td>
           
           
        </tr>
    )
}
export default User;