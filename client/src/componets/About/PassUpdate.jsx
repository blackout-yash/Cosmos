import { useEffect, useState } from "react";
import "../../styles/passUpdate.css";
import img from "../../assets/signup.png";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Extra/Loader";
import Loading from "../Extra/Loading";
import { url } from "../../url";


const PassUpdate = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);
    const [load, setLoad] = useState(false);
    const [userEmail, setUserEmail] = useState();
    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();

    const passEmail = async () => {
        try {
            // const res = await fetch("https://cosmos-server.onrender.com/api/getdata", {
            const res = await fetch(`${url}/api/getdata`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });
            const data = await res.json();
            const status = res.status;
            if (!data || status !== 200) {
                const error = new Error(res.error);
                throw error;
            } else {
                setShow(false);
                setUserEmail(data.email);
            }
        } catch (error) {
            navigate("/login");
            console.error(error);
        }
    }

    useEffect(() => {
        passEmail();
        // eslint-disable-next-line     
    }, []);

    const passUpdate = async (e) => {
        e.preventDefault();

        try {
            setLoad(true);
            // const res = await fetch("https://cosmos-server.onrender.com/api/passUpdate", {
            const res = await fetch(`${url}/api/passUpdate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ password, newPassword })
            })

            const data = await res.json();
            const status = res.status;
            if (status === 404) {
                setLoad(false);
                window.alert(data.message);
            }
            else if (!data || status === 400 || status === 422) {
                setLoad(false);
                window.alert(data.message);
                navigate("/about");
            } else {
                setLoad(false);
                window.alert(data.message);
                setPassword("");
                setNewPassword("");
                navigate("/about");
            }

        } catch (error) {
            setLoad(false);
            navigate("/about");
            console.error(error);
        }
    }

    const Render = () => {
        if (load) {
            return <Loading />
        } else {
            return <Loader />
        }
    }

    return (
        <>
            {show || load ? <Render /> :
                <section className="update">
                    <div className="update-container">
                        <div className="update-aside">
                            <img src={img} alt="me" />
                            <Link to="/about">About</Link>
                        </div>

                        <div className="update-box">
                            <h1>Update Credentials</h1>
                            <form method="POST" className="update-form">
                                <div className="update-input-container">
                                    <input type="email" name="email" readOnly
                                        value={userEmail}
                                    />
                                </div>

                                <div className="update-input-container">
                                    <input type="password" name="password" placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="update-input-container">
                                    <input type="password" name="new_password" placeholder="Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <input type="submit" name="login" id="login" value="Update" className="profile-btn"
                                    onClick={passUpdate}
                                />
                            </form>
                        </div>
                    </div>
                </section>
            }

        </>
    )
};

export default PassUpdate;