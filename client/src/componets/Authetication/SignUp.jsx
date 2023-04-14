import "../../styles/signUp.css";
import signup from "../../assets/signup.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../Extra/Loading";
import { url } from "../../url";

const SignUp = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cnf_password: ""
    });

    const handleInputs = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value });
    };

    const postData = async (e) => {
        e.preventDefault();

        try {
            setShow(true);
            const { name, email, phone, work, password, cnf_password } = user;

            const res = await fetch(`${url}/api/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, phone, work, password, cnf_password })
            })

            const data = await res.json();
            const status = res.status;
            if (!data || status === 422) {
                setShow(false);
                window.alert(data.message);
            } else {
                setShow(false);
                window.alert(data.message);
                navigate("/login");
            }
        } catch (error) {
            setShow(false);
            console.error(error);
        }
    }

    return (
        <>
            {show ? <Loading /> :
                <section className="signup">
                    <div className="signup-container">
                        <div className="signup-box">
                            <h1>SignUp</h1>
                            <form method="POST" className="signup-form">
                                <div className="signup-input-container">
                                    <input type="text" name="name" placeholder="Your Name" autoComplete="off"
                                        value={user.name}
                                        onChange={handleInputs}
                                    />
                                </div>
                                <div className="signup-input-container">
                                    <input type="email" name="email" placeholder="abc@gmail.com" autoComplete="off"
                                        value={user.email}
                                        onChange={handleInputs}
                                    />
                                </div>
                                <div className="signup-input-container">
                                    <input type="number" name="phone" placeholder="7667516XXX" autoComplete="off"
                                        value={user.phone}
                                        onChange={handleInputs}
                                    />
                                </div>
                                <div className="signup-input-container">
                                    <input type="text" name="work" placeholder="Your Profession" autoComplete="off"
                                        value={user.work}
                                        onChange={handleInputs}
                                    />
                                </div>
                                <div className="signup-input-container">
                                    <input type="password" name="password" placeholder="Password" autoComplete="off"
                                        value={user.password}
                                        onChange={handleInputs}
                                    />
                                </div>
                                <div className="signup-input-container">
                                    <input type="password" name="cnf_password" placeholder="Password" autoComplete="off"
                                        value={user.cnf_password}
                                        onChange={handleInputs}
                                    />
                                </div>
                                <input type="submit" name="signup" value="Register" className="signup-btn" onClick={postData} />
                            </form>
                        </div>

                        <div className="signup-aside">
                            <img src={signup} alt="me" />
                            <Link to="/login">Login</Link>
                        </div>
                    </div>
                </section>
            }
        </>
    )
};

export default SignUp;