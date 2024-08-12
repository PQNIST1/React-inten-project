import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEyeSlash,faEye } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { logginUser } from "../../controller/SliceReducer/loggin";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state || '/';
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { loading, error, user } = useSelector((state) => state.loggin);

    const formData = {
        "username": name,
        "password": password,
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(logginUser(formData));
    };
    useEffect(() => {
        if (user) {
            navigate('/', { replace: true });
        }
    }, [user, navigate, from]);


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
                        <form className="text-white flex flex-col space-y-3" onSubmit={handleSubmit}>
                            <label>Tên đăng nhập:</label>
                            <div className="w-full border h-10 rounded hover:border-blue-500 px-2 flex">
                                <FontAwesomeIcon icon={faUser} className="my-auto mr-2 text-lg" />
                                <input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}
                                    placeholder="Nhập tên đăng nhập của bạn....." className="bg-transparent border-none h-full focus:outline-none w-full " required type="text"></input>
                            </div>
                            <label>Mật khẩu:</label>
                            <div className="w-full border h-10 rounded hover:border-blue-500 px-2 flex">
                                <FontAwesomeIcon icon={faLock} className="my-auto mr-2 text-lg" />
                                <input placeholder="Nhập mật khẩu của bạn....." className="bg-transparent border-none focus:outline-none h-full w-full " required type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}></input>
                                <button type="button" onClick={togglePasswordVisibility} className="my-auto mr-2 text-lg"><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} /></button>
                            </div>
                            {error && error.error && <p style={{ color: 'red' }}>{error.error}</p>}
                            <button type="submit" className=" rounded h-10 hover:bg-blue-500 bg-indigo-500">
                                {loading ? (
                                    <div className="flex justify-center items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <p>Đang đăng nhập....</p>
                                    </div>
                                ) : (
                                    'Đăng nhập'
                                )}
                            </button>
                            <Link className="h-full w-full" to={'/register'}>
                                <button type="button" className="bg-indigo-500 rounded px-5 py-2 hover:bg-blue-500 h-full w-full">Đăng ký</button>
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