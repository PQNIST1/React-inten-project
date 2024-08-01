import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, setError, setSuccess } from "../../../controller/SliceReducer/getUser";

const CreateForm = () => {
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState('');
    const { success, error } = useSelector((state) => state.user);
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const formData = {
        user: {
            name: name,
            userName: name,
            phone: phone,
            email: email,
            passWord: password,
        },
        roles: [
            {
                id: selectedOption,
            },
        ],
    };

    const clearForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setSelectedOption('');
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedOption) {
            dispatch(createUser(formData));
            clearForm();
        }
        setTimeout(() => {
            dispatch(setSuccess());
            dispatch(setError());
        }, 3000);
    };

    return (
        <div className="mt-16 mb-14">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-transparent border-4 border-sky-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-transparent border-4 border-dotted shadow-lg sm:rounded-3xl sm:p-20">
                    {success && <p className="text-green-500 text-xs italic mb-4">Thành công</p>}
                    {error && error.error && <p style={{ color: 'red' }}>{error.error}</p>}
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Create User</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <form onSubmit={handleSubmit}>
                                <div className="py-8 text-base leading-6 space-y-6 text-gray-400 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="off" id="name" name="name" type="text" className="peer placeholder-transparent h-10 w-full border rounded pl-2 bg-transparent border-gray-300 text-gray-400 focus:outline-none focus:borer-rose-600" placeholder="Name" />
                                        <label htmlFor="name" className="absolute left-2 -top-5 text-gray-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-400 peer-focus:text-sm">Name</label>
                                    </div>
                                    <div className="relative">
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border rounded pl-2 bg-transparent border-gray-300 text-gray-400 focus:outline-none focus:borer-rose-600" placeholder="Email" />
                                        <label htmlFor="email" className="absolute left-2 -top-5 text-gray-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-400 peer-focus:text-sm">Email</label>
                                    </div>
                                    <div className="relative">
                                        <input value={phone} onChange={(e) => setPhone(e.target.value)} required autoComplete="off" id="phone" name="phone" type="tel" className="peer placeholder-transparent h-10 w-full border rounded bg-transparent pl-2 border-gray-300 text-gray-400 focus:outline-none focus:borer-rose-600" placeholder="Phone" />
                                        <label htmlFor="phone" className="absolute left-2 -top-5 text-gray-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-400 peer-focus:text-sm">Phone</label>
                                    </div>
                                    <div className="relative">
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border rounded bg-transparent pl-2 border-gray-300 text-gray-400 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                        <label htmlFor="password" className="absolute left-2 -top-5 text-gray-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-400 peer-focus:text-sm">Password</label>
                                    </div>
                                    <div className="text-gray-400">
                                        <fieldset className="flex flex-col space-y-2">
                                            <legend className="text-lg font-semibold">Chọn Role:</legend>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="options"
                                                    value="1"
                                                    checked={selectedOption === '1'}
                                                    onChange={handleChange}
                                                    className="form-radio h-4 w-4 text-blue-600 border-gray-300"
                                                />
                                                <span className="ml-2 ">Khách hàng</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="options"
                                                    value="2"
                                                    checked={selectedOption === '2'}
                                                    onChange={handleChange}
                                                    className="form-radio h-4 w-4 text-blue-600 border-gray-300"
                                                />
                                                <span className="ml-2 ">Nhân viên</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="options"
                                                    value="3"
                                                    checked={selectedOption === '3'}
                                                    onChange={handleChange}
                                                    className="form-radio h-4 w-4 text-blue-600 border-gray-300"
                                                />
                                                <span className="ml-2 ">Quản trị</span>
                                            </label>
                                        </fieldset>
                                    </div>
                                    <div className="relative">
                                        <button className="bg-cyan-500 text-white rounded-md px-2 py-1">Create</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateForm;