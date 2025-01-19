import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!feed || feed.length === 0) getFeed();
    }, [feed]);

    const getFeed = async () => {
        if (!hasMore) return;
        console.log("entered get feed function");
        try {
            const res = await axios.get(BASE_URL + "/user/feed?page=" + page, {
                withCredentials: true,
            });
            console.log(res?.data);

            setHasMore(res?.data?.hasMore);
            const newFeed = res?.data?.data;

            if (newFeed && newFeed.length > 0) {
                dispatch(addFeed(res?.data?.data));
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    if (!feed || feed.length === 0) {
        return (
            <div className="flex justify-center text-center text-3xl font-bold my-10">
                No New Devs Present !
            </div>
        );
    }
    return (
        feed && (
            <div className="flex justify-center my-10">
                <UserCard user={feed[0]} />
            </div>
        )
    );
};
export default Feed;
