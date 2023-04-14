import { useContext, useEffect } from "react";
import "../../styles/header.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Header = () => {
    // eslint-disable-next-line
    const { state, dispatch } = useContext(UserContext);
    useEffect(() => {
        dispatch({ type: "USER", refresh: true });
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