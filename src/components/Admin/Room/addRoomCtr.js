import React from "react";
import AddRoom from "./addRoom";
import RoomList from "./roomList";

const AddRoomCtr = () => {
    return (
        <div className="flex  mt-10 mb-10 w-5/6 m-auto">
            <div className="w-2/3 pl-32">
                <RoomList />
            </div>
            <AddRoom />
        </div>
    )
}
export default AddRoomCtr;