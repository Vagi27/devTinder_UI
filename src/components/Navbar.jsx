import React from "react";
import { useSelector, useDispatch } from "react-redux";
import store from "../utils/store";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import axios from "axios";

import { removeFeed } from "../utils/feedSlice";
import { removeConnections } from "../utils/connectionSlice";
import { removeAllRequest } from "../utils/requestSlice";
const Navbar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await axios.get(BASE_URL + "/logout", { withCredentials: true });
            dispatch(removeUser());
            dispatch(removeFeed());
            dispatch(removeAllRequest());
            dispatch(removeConnections());
            navigate("/login");
        } catch (error) {
            console.log("error: " + error.message);
        }
    };
    return (
        <div className="navbar bg-base-200">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">
                    Dev Tinder
                </Link>
            </div>
            {user && (
                <div className="flex-none gap-2 mx-4">
                    <p>Welcome, {user.firstName}</p>
                    <div className="dropdown dropdown-end ">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar flex"
                        >
                            <div className="w-10 rounded-full">
                                <img alt="Profile" src={user.photoURL} />
                            </div>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/connections">Connections</Link>
                            </li>
                            <li>
                                <Link to="/requests">Requests</Link>
                            </li>
                            <li>
                                <a onClick={handleLogout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
