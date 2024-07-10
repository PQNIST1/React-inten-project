import React from "react";

import AddActor from "./addActor";
import ActorList from "./actorList";

const AddActorCtr = () => {
    return (
        <div className="flex  mt-10 mb-10 w-5/6 m-auto">
            <div className="w-2/3 pl-32">
                <ActorList />
            </div>
            <AddActor />
        </div>
    )
}
export default AddActorCtr;