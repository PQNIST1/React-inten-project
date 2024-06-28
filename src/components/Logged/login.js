import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

const Login = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className=" relative w-screen h-screen flex " >
            <div
                className="absolute inset-0  bg-center opacity-10"
                style={{ backgroundImage: `url(https://i.imgur.com/37Zi2kp.png)` }}
            ></div>
            <div className="relative z-10 flex w-full h-full">
                <div className="h-full w-1/2  px-16 m-auto flex">
                    <div className="my-auto">
                        <div className="flex mb-10">
                            <a href="/">
                                <img className="w-20 h-20" src="https://i.imgur.com/utVCQHK.png" alt="Logo" />
                            </a>
                            <p className="uppercase m-auto"><span className="font-bold text-5xl 
                        text-white ">Movie</span> <span className="text-3xl text-gray-400">booking</span></p>
                        </div>
                        <form className="text-white flex flex-col space-y-3">
                            <label>Email:</label>
                            <div className="w-full border h-10 rounded hover:border-blue-500 px-2 flex">
                                <FontAwesomeIcon icon={faEnvelope} className="my-auto mr-2 text-lg" />
                                <input placeholder="Nhập email của bạn....." className="bg-transparent border-none h-full focus:outline-none w-full " required type="email"></input>
                            </div>
                            <label>Mật khẩu:</label>
                            <div className="w-full border h-10 rounded hover:border-blue-500 px-2 flex">
                                <FontAwesomeIcon icon={faLock} className="my-auto mr-2 text-lg" />
                                <input placeholder="Nhập mật khẩu của bạn....." className="bg-transparent border-none focus:outline-none h-full w-full " required type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}></input>
                                <button type="button" onClick={togglePasswordVisibility} className="my-auto mr-2 text-lg"><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} /></button>
                            </div>
                            <button type="submit" className="bg-blue-700 rounded h-10 px-3 py-2 hover:bg-blue-500">Đăng nhập</button>
                            <Link className="h-full w-full" to={'/register'}>
                                <button type="button" className="bg-blue-700 rounded px-5 py-2 hover:bg-blue-500 h-full w-full">Đăng ký</button>
                            </Link>
                        </form>
                        <div className="mx-auto text-center">
                            <p className="text-white my-3">Hoặc</p>
                        </div>
                        <div>
                            <div className="flex border rounded h-10 justify-center">
                                <img src="https://i.imgur.com/QvXI3ku.png" alt="" className="h-7 my-auto mr-2" />
                                <button className="text-white ">Đăng nhập bằng Google</button>
                            </div>
                            <div className="flex border rounded h-10 justify-center mt-5">
                                <img src="https://i.imgur.com/eMdd29W.png" alt="" className="h-7 my-auto mr-2" />
                                <button className="text-white ">Đăng nhập bằng Facebook</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-5/6 m-auto">
                    <img src="https://i.imgur.com/GNACC0W.png" alt="" className="h-full m-auto w-full" />
                </div>
            </div>

        </div>
    )
}

export default Login;