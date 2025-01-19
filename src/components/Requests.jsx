import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
const Requests = () => {
    useEffect(() => {
        getRequests();
    }, []);

    const dispatch = useDispatch();
    const requests = useSelector((store) => store.request);
    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(
                BASE_URL + "/request/review/" + status + "/" + _id,
                {},
                { withCredentials: true }
            );

            dispatch(removeRequest(_id));
        } catch (error) {
            console.log(error.message);
        }
    };
    const getRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests", {
                withCredentials: true,
            });
            console.log(res?.data?.data);
            dispatch(addRequest(res?.data?.data));
        } catch (error) {
            console.log(error.message);
        }
    };
    if (!requests || requests.length === 0)
        return (
            <h1 className="text-center text-3xl font-bold my-10">
                No Requests Found
            </h1>
        );

    return (
        <div className="my-10">
            <h1 className="text-center text-3xl font-bold  ">Requests</h1>

            {requests.map((request) => {
                const { firstName, lastName, about, age, gender, photoURL } =
                    request.fromUserId;
                return (
                    <div
                        key={request._id}
                        className="flex justify-between m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
                    >
                        <div className="flex  ">
                            <img
                                alt="photo"
                                className="items-center w-20 h-20  rounded-full"
                                src={photoURL}
                            />
                            <div className="mx-4  ">
                                <h2>{firstName + " " + lastName}</h2>
                                {age && gender && <p>{age + ", " + gender}</p>}
                                <p className="text-sm">{about}</p>
                            </div>
                        </div>
                        <div className="my-auto flex">
                            <button
                                onClick={() => {
                                    reviewRequest("rejected", request._id);
                                }}
                                className="btn btn-active mx-2 btn-primary"
                            >
                                Reject
                            </button>
                            <button
                                onClick={() => {
                                    reviewRequest("accepted", request._id);
                                }}
                                className="btn btn-active mx-2 btn-secondary"
                            >
                                Accepted
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Requests;
