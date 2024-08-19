import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, setError, setSuccess } from "../../controller/SliceReducer/loggin";

const InputChange = ({ icon, title, value }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [comfirmPassword, setComfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showCfPassword, setShowCfPassword] = useState(false);
    const [errorr, setErrorr] = useState('');
    const form = useSelector((state) => state.loggin);
    const { success, error } = form;

    const dispatch = useDispatch();

    const handleEditClick = () => {
        setIsEditing(!isEditing);
        setPassword('');
        setNewPassword('');
        setComfirmPassword('');
        setErrorr('');
        setShowPassword(false);
        setShowCfPassword(false);
        setShowNewPassword(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleCfPasswordVisibility = () => {
        setShowCfPassword(!showCfPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const formData = {
        "currentPassword": password,
        "newPassword": newPassword,
        "confirmNewPassword": comfirmPassword,
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === newPassword) {
            setErrorr('Mật khẩu mới trùng với mật khẩu cũ');
        } else if (newPassword !== comfirmPassword) {
            setErrorr('Mật khẩu mới không trùng nhau');
        } else {
            dispatch(updatePassword(formData));
            setErrorr('');
            setTimeout(() => {
                dispatch(setSuccess());
                dispatch(setError());
            }, 3000);
        }
    };

    useEffect(() => {
        if (success) {
            setIsEditing(false);
        }
    }, [success]);

    const isPasswordTitle = title === 'Mật khẩu';

    let buttonContent;

    if (isEditing && isPasswordTitle) {
        buttonContent = (
            <div className='w-20 ml-2 flex flex-col space-y-2'>
                <button onClick={handleSubmit} type="button" className="w-20 h-10 hover:text-white text-white border bg-blue-700 rounded">Xác nhận</button>
                <button onClick={handleEditClick} type="button" className="w-20 h-10 text-white border bg-blue-700 rounded hover:text-white">Hủy</button>
            </div>
        );
    } else if (isPasswordTitle) {
        buttonContent = (
            <button onClick={handleEditClick} type="button" className="w-20 text-white border bg-blue-700 rounded ml-2">Thay đổi</button>
        );
    } else {
        buttonContent = <button className="w-20 ml-2"></button>;
    }

    return (
        <div className="w-1/2 mb-5 h-20">
            <label>{title}:</label>
            <div className="w-full flex">
                {isEditing && isPasswordTitle ? (
                    <div>
                        <form className="">
                            <label htmlFor="current-password">Mật khẩu hiện tại:</label>
                            <div className="w-[268px] border h-10 rounded hover:border-blue-500 px-2 flex mb-2">
                                <FontAwesomeIcon icon={icon} className="my-auto mr-2 text-lg" />
                                <input
                                    id="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-transparent border-none h-full focus:outline-none w-full"
                                    required
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password" // Thêm thuộc tính autocomplete
                                />
                                <button type="button" onClick={togglePasswordVisibility} className="my-auto mr-2 text-lg">
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                            <label htmlFor="new-password">Mật khẩu mới:</label>
                            <div className="w-[268px] border h-10 rounded hover:border-blue-500 px-2 flex mb-2">
                                <FontAwesomeIcon icon={icon} className="my-auto mr-2 text-lg" />
                                <input
                                    id="new-password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="bg-transparent border-none h-full focus:outline-none w-full"
                                    required
                                    type={showNewPassword ? 'text' : 'password'}
                                    autoComplete="new-password" // Thêm thuộc tính autocomplete
                                />
                                <button type="button" onClick={toggleNewPasswordVisibility} className="my-auto mr-2 text-lg">
                                    <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                            <label htmlFor="confirm-password">Nhập lại mật khẩu mới:</label>
                            <div className="w-[268px] border h-10 rounded hover:border-blue-500 px-2 flex">
                                <FontAwesomeIcon icon={icon} className="my-auto mr-2 text-lg" />
                                <input
                                    id="confirm-password"
                                    value={comfirmPassword}
                                    onChange={(e) => setComfirmPassword(e.target.value)}
                                    className="bg-transparent border-none h-full focus:outline-none w-full"
                                    required
                                    type={showCfPassword ? 'text' : 'password'}
                                    autoComplete="new-password" // Thêm thuộc tính autocomplete
                                />
                                <button type="button" onClick={toggleCfPasswordVisibility} className="my-auto mr-2 text-lg">
                                    <FontAwesomeIcon icon={showCfPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                        </form>
                        {errorr && <p className="text-red-500 text-xs italic mb-4">{errorr}</p>}
                        {error && error.error && <p style={{ color: 'red' }}>{error.error}</p>}
                        {success && <p className="text-green-500 text-xs italic mb-4">Cập nhật thành công!</p>}
                    </div>
                ) : (
                    <div className="w-80 border h-10 rounded hover:border-blue-500 px-2 flex">
                        <FontAwesomeIcon icon={icon} className="my-auto mr-2 text-lg" />
                        <p className="my-auto">{value}</p>
                    </div>
                )}

                {buttonContent}
            </div>
        </div>
    )
}

export default InputChange;
