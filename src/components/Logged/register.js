import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEyeSlash, faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faMobileScreen } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../controller/SliceReducer/loggin";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector((state) => state.loggin);
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [comfirmPassword, setComfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showCfPassword, setShowCfPassword] = useState(false);
    const [errorr, setError] = useState('');

    const formData = {
        "name": name,
        "userName": name,
        "phone": phone,
        "email": email,
        "passWord": password,
    }

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
            dispatch(registerUser(formData));
        }
    };
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

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
                            <a href="/">
                                <img className="w-20 h-20" src="https://i.imgur.com/utVCQHK.png" alt="Logo" />
                            </a>
                            <p className="uppercase m-auto"><span className="font-bold text-5xl 
                    text-white ">Movie</span> <span className="text-3xl text-gray-400">booking</span></p>
                        </div>
                        <form className="text-white flex flex-col space-y-3" onSubmit={handleSubmit} >
                            <label>Tên đăng nhập:</label>
                            <div className="w-full border h-10 rounded hover:border-blue-500 px-2 flex">
                                <FontAwesomeIcon icon={faUser} className="my-auto mr-2 text-lg" />
                                <input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}
                                    placeholder="Nhập tên đăng nhập của bạn....." className="bg-transparent border-none h-full focus:outline-none w-full " required type="text"></input>
                            </div>

                            <label>Email:</label>
                            <div className="w-full border h-10 rounded hover:border-blue-500 px-2 flex">
                                <FontAwesomeIcon icon={faEnvelope} className="my-auto mr-2 text-lg" />
                                <input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Nhập email của bạn....." className="bg-transparent border-none h-full focus:outline-none w-full " required type="email"></input>
                            </div>
                            <label>Số điện thoại:</label>
                            <div className="w-full border h-10 rounded hover:border-blue-500 px-2 flex">
                                <FontAwesomeIcon icon={faMobileScreen} className="my-auto mr-2 text-lg" />
                                <input id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Nhập số điện thoại của bạn....." className="bg-transparent border-none h-full focus:outline-none w-full " required type="tel"></input>
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
                            {errorr && <p className="text-red-500 text-xs italic mb-4">{errorr}</p>}
                            {error && error.error && <p style={{ color: 'red' }}>{error.error}</p>}
                            <button type="submit" className=" rounded h-10 hover:bg-blue-500 bg-indigo-500">
                                {loading ? (
                                    <div className="flex justify-center items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                       <p>Đang đăng ký....</p>
                                    </div>
                                ) : (
                                    'Đăng ký'
                                )}
                            </button>

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