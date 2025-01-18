import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [about, setAbout] = useState(user?.about);
    const [photoURL, setPhotoURL] = useState(user?.photoURL);
    const [gender, setGender] = useState(user?.gender);
    const [age, setAge] = useState(user?.age);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();

    const saveProfile = async () => {
        setError("");
        try {
            const response = await axios.patch(
                BASE_URL + "/profile/edit",
                { firstName, lastName, photoURL, age, gender, about },
                { withCredentials: true }
            );
            console.log(response?.data?.data);
            dispatch(addUser(response?.data?.data));

            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch (err) {
            setError(err.response.data);
        }
    };

    return (
        <div className="flex justify-center my-10">
            <div className="flex justify-center mx-4">
                <div className="card bg-base-300 w-96 shadow-xl ">
                    <div className="card-body">
                        <h2 className="card-title">Profile</h2>
                        <div>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">
                                        First Name:
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
                                        Last Name:
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
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">
                                        Photo URL:
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    value={photoURL}
                                    onChange={(e) =>
                                        setPhotoURL(e.target.value)
                                    }
                                    className="input input-bordered w-full max-w-xs"
                                />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Age:</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    className="input input-bordered w-full max-w-xs"
                                />
                            </label>

                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">About:</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    className="input input-bordered w-full max-w-xs "
                                />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Gender:</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="input input-bordered w-full max-w-xs"
                                />
                            </label>
                        </div>
                        <p className="text-red-500">{error} </p>

                        <div className="card-actions justify-center my-4">
                            <button
                                onClick={saveProfile}
                                className="btn btn-primary"
                            >
                                Save Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <UserCard
                user={{ firstName, lastName, about, photoURL, gender, age }}
            />
            {showToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile Saved Successfully.</span>
                    </div>
                </div>
            )}
        </div>
    );
};
export default EditProfile;
