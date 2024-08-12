import React from "react";
import InputChange from "./input";
import { faUser, faLock, faEnvelope, faMobileScreen } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";


const Profile = () => {

    const userInfo = useSelector((state) => state.user.userInfo);
    const [data, setData] = useState({});
    const status = useSelector((state) => state.user.status);

    useEffect(() => {
        if (status === 'succeeded') {
            setData(userInfo);
        }
    }, [status, userInfo]);


    return (
        <div className=" flex flex-wrap w-full mt-5 ">
            {data.data && (
                <>
                    <InputChange title={'Tên đăng nhập'} icon={faUser} value={data.data.user.userName} />
                    <InputChange title={'Email'} icon={faEnvelope} value={data.data.user.email} />
                    <InputChange title={'Số điện thoại'} icon={faMobileScreen} value={data.data.user.phone} />
                    <InputChange title={'Mật khẩu'} icon={faLock} value={"**********"} />
                </>
            )}
        </div>
    )
}
export default Profile;