import React, {useEffect} from "react";
import Nav from "../../Navbar/nav";
import Footer from "../../Footer/footer";

import { useDispatch, useSelector } from "react-redux";
import { getMovie } from "../../../controller/SliceReducer/moive";
import ContTabs from "../tabs";

import FoodAddCtr from "./foodAddCtr";
import AddCategoryCtr from "../AddCategoryAndActor/addCategoryCtr";
import AddActorCtr from "../AddCategoryAndActor/Actor/AddActorCtr";
import AddRoomCtr from "../Room/addRoomCtr";
import AddSeatCtr from "../Seat/addSeatCtr";

const AddFood = () => {
    const dispatch = useDispatch();
    const activeTab = useSelector((state) => state.tab.activeTab);
    useEffect(() => {
        dispatch(getMovie()); 
    }, [dispatch])
    return (
        <div className="relative container text-gray-400 bg-customColor w-screen h-auto">
        <Nav />
        
        <ContTabs/>
        {activeTab === 'food' && <FoodAddCtr />}
        {activeTab === 'category' && <AddCategoryCtr />}
        {activeTab === 'actor' && <AddActorCtr />}
        {activeTab === 'room' && <AddRoomCtr/>}
        {activeTab === 'seat-type' && <AddSeatCtr/>}
        
        <Footer />
       
    </div>
    )
}
export default AddFood;