import React from "react";
import InputChange from "./input";
import { faUser, faLock, faEnvelope, faMobileScreen } from "@fortawesome/free-solid-svg-icons";


const Profile = () => {
    return (
        <div className=" flex flex-wrap w-full mt-5 ">
            <InputChange title={'Tên đăng nhập'} icon={faUser} />
            <InputChange title={'Email'} icon={faEnvelope} />
            <InputChange title={'Số điện thoại'} icon={faMobileScreen} />
            <InputChange title={'Mật khẩu'} icon={faLock} />
            <div className=" w-full flex justify-end px-16">
                <button className="p-2 text-white mr-1 hover:bg-blue-500 bg-blue-700 border rounded">Cập nhập</button>
            </div>
        </div>
    )
}
export default Profile;