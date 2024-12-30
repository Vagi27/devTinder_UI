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
            const response = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true,
            });
            // console.log(response?.data);
            dispatch(addUser(response?.data?.data));
        } catch (error) {
            if (error.status === 401) {
                navigate("/login");
            }
        }
    };

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

export default Body;
