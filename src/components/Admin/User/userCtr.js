import React from "react";
import Nav from '../../Navbar/nav';
import Footer from '../../Footer/footer';
import UserTabs from "./userTabs";
import {  useSelector } from "react-redux";
import UserList from "./userList";
import CreateForm from "./createForm";

const UserCtr = () => {
    const activeTab = useSelector((state) => state.tab.activeTab);
    return (
        <div className="relative container text-gray-400 bg-customColor w-screen  flex flex-col min-h-screen">
            <Nav />
            <div className="w-5/6 mx-auto">
                <div className="flex  justify-center">
                    <UserTabs />
                </div>
                {activeTab === 'users' && <UserList />}
                {activeTab === 'create' && <CreateForm />}
            </div>

            <Footer />

        </div>
    )
}
export default UserCtr;