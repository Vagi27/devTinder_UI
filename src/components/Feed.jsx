import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    console.log("store", feed);
    const dispatch = useDispatch();
    useEffect(() => {
        getFeed();
    }, []);
    const getFeed = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/feed", {
                withCredentials: true,
            });
            console.log(res?.data?.data);
            dispatch(addFeed(res?.data?.data));
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        feed && (
            <div className="flex justify-center my-10">
                <UserCard user={feed[0]} />
            </div>
        )
    );
};

export default Feed;
