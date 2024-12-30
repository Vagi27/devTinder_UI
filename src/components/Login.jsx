import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [email, setEmail] = useState("vagish@gmail.com");
    const [password, setPassword] = useState("Password@123");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                BASE_URL + "/login",
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            );
            dispatch(addUser(response?.data));
            navigate("/");
        } catch (err) {
            setError(err?.response?.data || "Something Went Wrong");
        }
    };
    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-xl ">
                <div className="card-body">
                    <h2 className="card-title">Login</h2>
                    <div>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered w-full max-w-xs"
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input input-bordered w-full max-w-xs"
                            />
                        </label>
                    </div>
                    <p className="text-red-500">{error} </p>
                    <div className="card-actions justify-center my-4">
                        <button
                            onClick={handleLogin}
                            className="btn btn-primary"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
