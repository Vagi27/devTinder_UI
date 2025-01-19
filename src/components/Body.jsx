import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import axios from "axios";
import { addUser } from "../utils/userSlice.js";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";

const Body = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        getProfile();
    }, []);

    const navigate = useNavigate();

    const getProfile = async () => {
        try {
            // console.log("profile/view API HIT");
            const response = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true,
            });
            // console.log("response:", response);
            dispatch(addUser(response?.data?.data));
        } catch (error) {
            if (error?.request?.response === "")
                console.error("No response from backend");
            if (error.status === 401 || error?.request?.response === "") {
                navigate("/login");
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Navbar />
                <Outlet />
            </div>
            <div className="">
                <Footer />
            </div>
        </div>
    );
};

export default Body;
