import { Link, useNavigate } from "react-router-dom";
import "../../styles/profileUpdate.css";
import profile from "../../assets/password.png";
import { useEffect, useState } from "react";
import Loader from "../Extra/Loader";
import Loading from "../Extra/Loading";

const ProfileUpdate = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);
    const [load, setLoad] = useState(false);
    const [userData, setUserData] = useState({
        name: "", work: "", phone: ""
    });

    const callAboutPage = async () => {
        try {
            const res = await fetch("http://localhost:4000/api/getdata", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            const status = res.status;
            if (!data || status !== 200) {
                const error = new Error(res.error);
                throw error;
            } else {
                setShow(false);
                setUserData({ ...userData, name: data.name, work: data.work, phone: data.phone });
            }
        } catch (error) {
            console.error(error);
            navigate('/login');
        }
    }

    useEffect(() => {
        callAboutPage();
        // eslint-disable-next-line     
    }, []);

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({ ...userData, [name]: value });
    }

    const update = async (e) => {
        e.preventDefault();

        try {
            setLoad(true);
            const { name, work, phone } = userData;

            const res = await fetch("http://localhost:4000/api/updateprofile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ name, work, phone })
            })

            const data = await res.json();
            const status = res.status;
            if (!data || status === 422 || status === 402) {
                setLoad(false);
                window.alert(data.message);
            } else {
                setLoad(false);
                window.alert(data.message);
                setUserData({ ...userData, name: "", work: "", phone: "" });
                navigate("/about");
            }
        } catch (error) {
            setLoad(false);
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
                <section className="profile">
                    <div className="profile-container">
                        <div className="profile-box">
                            <h1>Profile Update</h1>
                            <form method="POST" className="profile-form">
                                <div className="profile-input-container">
                                    <input type="text" name="name" placeholder="Name" autoComplete="off"
                                        value={userData.name}
                                        onChange={handleInputs}
                                    />
                                </div>

                                <div className="profile-input-container">
                                    <input type="number" name="phone" placeholder="Mobile No" autoComplete="off"
                                        value={userData.phone}
                                        onChange={handleInputs}
                                    />
                                </div>

                                <div className="profile-input-container">
                                    <input type="text" name="work" placeholder="Your Profession" autoComplete="off"
                                        value={userData.work}
                                        onChange={handleInputs}
                                    />
                                </div>
                                <input type="submit" name="signup" value="Update" className="profile-btn"
                                    onClick={update}
                                />
                            </form>
                        </div>

                        <div className="profile-aside">
                            <img src={profile} alt="me" />
                            <Link to="/about">About</Link>
                        </div>
                    </div>
                </section>
            }
        </>
    )
};

export default ProfileUpdate;