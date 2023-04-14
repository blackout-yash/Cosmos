import React, { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../App";
import Loader from "../Extra/Loader";
import { url } from "../../url";

const Logout = () => {
    // eslint-disable-next-line
    const { state, dispatch } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${url}/api/logout`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            if (res.status !== 498 && res.status !== 200) {
                return res.json();
            }
            window.alert("Logout Successfully");
            dispatch({ type: "USER", payload: false });
            navigate('/login');
        }).then((data) => {
            if (data) throw new Error(data.message);
        }).catch((err) => {
            window.alert(err.message);
            console.error(err);
        })
        // eslint-disable-next-line
    }, []);

    return (
        <div><Loader /></div>
    )
};

export default Logout;