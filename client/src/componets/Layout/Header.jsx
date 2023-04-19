import { useContext, useEffect } from "react";
import "../../styles/header.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { url } from "../../url";

const Header = () => {
    // eslint-disable-next-line
    const { state, dispatch } = useContext(UserContext);

    const auth = async () => {
        try {
            const res = await fetch(`${url}/api/auth`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const status = res.status;
            if (status === 200) {
                dispatch({ type: "USER", payload: true });
            } else {
                dispatch({ type: "USER", payload: false });
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        auth();
        // eslint-disable-next-line
    }, [])

    const RenderMenu = () => {
        if (state) {
            return (
                <>
                    <Link to="/contact">Contact</Link>
                    <Link to="/logout">Logout</Link>
                </>
            )
        } else {
            return (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </>
            )
        }
    }

    return (
        <div className="header">
            <h2>Cosmos</h2>
            <div className="header-link">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <RenderMenu />
            </div>
        </div>
    )
};

export default Header;