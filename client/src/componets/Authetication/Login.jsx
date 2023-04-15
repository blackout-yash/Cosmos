import "../../styles/login.css";
import signup from "../../assets/password.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import Loading from "../Extra/Loading";
import { url } from "../../url";

const Login = () => {
    // eslint-disable-next-line
    const { state, dispatch } = useContext(UserContext);

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const loginUser = async (e) => {
        e.preventDefault();

        try {
            setShow(true);
            const res = await fetch(`${url}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            })

            const data = await res.json();
            const status = res.status;
            if (!data || status === 400 || status === 422) {
                setShow(false);
                window.alert(data.message);
            } else {
                setShow(false);
                dispatch({ type: "USER", payload: true });
                window.alert(data.message);
                navigate("/");
            }
        } catch (error) {
            setShow(false);
            console.error(error);
        }
    }

    return (
        <>
            {show ? <Loading /> :
                <section className="login">
                    <div className="login-container">
                        <div className="login-aside">
                            <img src={signup} alt="me" />
                            <Link to="/signup">Signup</Link>
                        </div>

                        <div className="login-box">
                            <h1>Login</h1>
                            <form method="POST" className="login-form">
                                <div className="login-input-container">
                                    <input type="email" name="email" placeholder="abc@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="login-input-container">
                                    <input type="password" name="password" placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <input type="submit" name="login" id="login" value="Login" className="login-btn"
                                    onClick={loginUser}
                                />
                            </form>
                        </div>
                    </div>
                </section>
            }
        </>
    )
};

export default Login;