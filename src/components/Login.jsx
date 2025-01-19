import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("vagish@gmail.com");
    const [password, setPassword] = useState("Password@123");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLoginForm, setIsLoginForm] = useState(true);

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
    const handleSignup = async () => {
        try {
            const response = await axios.post(
                BASE_URL + "/signup",
                {
                    firstName,
                    lastName,
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            );
            dispatch(addUser(response?.data?.data));
            navigate("/profile");
        } catch (err) {
            setError(err?.response?.data || "Something Went Wrong");
        }
    };
    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-xl ">
                <div className="card-body">
                    <h2 className="card-title ">
                        {isLoginForm ? "Login" : "Signup"}
                    </h2>
                    <div>
                        {!isLoginForm && (
                            <>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">
                                            First Name
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Type here"
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">
                                            Last Name
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Type here"
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </label>
                            </>
                        )}
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
                            onClick={isLoginForm ? handleLogin : handleSignup}
                            className="btn btn-primary"
                        >
                            {isLoginForm ? "Login" : "Signup"}
                        </button>
                    </div>
                    <p
                        className="m-auto cursor-pointer py-2"
                        onClick={() => {
                            setIsLoginForm(!isLoginForm);
                        }}
                    >
                        {isLoginForm
                            ? "New User? Sign up"
                            : "Existing User? Log In"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
