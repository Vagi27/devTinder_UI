import React, { useEffect } from "react";
import { addConnections } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
    useEffect(() => {
        getConnections();
    }, []);

    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection);

    const getConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true,
            });
            // console.log(res?.data?.data);
            dispatch(addConnections(res?.data?.data));
        } catch (error) {
            console.log(error.message);
        }
    };
    // if () return;
    if (!connections || connections.length === 0)
        return (
            <h1 className="text-center text-3xl font-bold my-10">
                No connections Found
            </h1>
        );

    return (
        <div className="my-10">
            <h1 className="text-center text-3xl font-bold  ">Connections</h1>

            {connections.map((connection) => {
                const { firstName, lastName, about, age, gender, photoURL } =
                    connection;
                return (
                    <div
                        key={connection._id}
                        className="flex  m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
                    >
                        <img
                            alt="photo"
                            className="place-self-center w-20 h-20 rounded-full"
                            src={photoURL}
                        />
                        <div className="ml-4">
                            <h2>{firstName + " " + lastName}</h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Connections;
