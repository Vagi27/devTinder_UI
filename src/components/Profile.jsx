import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import EditProfile from "./EditProfile";
const Profile = () => {
    const user = useSelector((store) => store.user);

    return (
        user && (
            <>
                <EditProfile user={user} />
            </>
        )
    );
};

export default Profile;
