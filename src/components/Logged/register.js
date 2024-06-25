import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEyeSlash, faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

const Register = () => {
    const [password, setPassword] = useState('');
    const [comfirmPassword, setComfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showCfPassword, setShowCfPassword] = useState(false);
    const [error, setError] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleCfPasswordVisibility = () => {
        setShowCfPassword(!showCfPassword);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== comfirmPassword) {
            setError('Mật khẩu không trùng nhau');
        } else {
            setError('');
        }
    };
    return (
        <div className=" relative w-screen h-screen flex " >
            <div
                className="absolute inset-0  bg-center opacity-10"
                style={{ backgroundImage: `url(https://i.imgur.com/37Zi2kp.png)` }}
            ></div>
            <div className="relative z-10 flex w-full h-full">
                <div className="h-full w-1/2  px-16 m-auto flex">
                    <div className="my-auto space-y-10">
                        <div className="flex">
                            <Link to="/">
                                <img className="w-20 h-20" src="https://i.imgur.com/utVCQHK.png" alt="Logo" />
                            </Link>
                            <p className="uppercase m-auto"><span className="font-bold text-5xl 
                    text-white ">Movie</span> <span className="text-3xl text-gray-400">booking</span></p>
                        </div>
                        <form className="text-white flex flex-col space-y-3" onSubmit={handleSubmit} >
                            <label>Tên đăng nhập:</label>
                            <div className="w-full border h-10 rounded hover:border-blue-500 px-2 flex">
                                <FontAwesomeIcon icon={faUser} className="my-auto mr-2 text-lg" />
                                <input placeholder="Nhập tên đăng nhập của bạn....." className="bg-transparent border-none h-full focus:outline-none w-full " required type="text"></input>
                            </div>
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
                            <label>Nhập lại mật khẩu:</label>
                            <div className="w-full border h-10 rounded hover:border-blue-500 px-2 flex">
                                <FontAwesomeIcon icon={faLock} className="my-auto mr-2 text-lg" />
                                <input placeholder="Nhập lại mật khẩu....." className="bg-transparent border-none focus:outline-none h-full w-full " required type={showCfPassword ? 'text' : 'password'}
                                    value={comfirmPassword}
                                    onChange={(e) => setComfirmPassword(e.target.value)}></input>
                                <button type="button" onClick={toggleCfPasswordVisibility} className="my-auto mr-2 text-lg"><FontAwesomeIcon icon={showCfPassword ? faEyeSlash : faEye} /></button>
                            </div>
                            {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                            <button type="submit" className="bg-blue-700 rounded h-10  hover:bg-blue-500">Đăng ký</button>
                        </form>

                    </div>
                </div>
                <div className="h-5/6 m-auto">
                    <img src="https://i.imgur.com/GNACC0W.png" alt="" className="h-full m-auto w-full" />
                </div>
            </div>

        </div>
    )
}
export default Register;