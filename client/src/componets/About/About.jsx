import "../../styles/about.css";
import me from "../../assets/me.jpg";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Extra/Loader";
import Loading from "../Extra/Loading";
import { UserContext } from "../../App";

import { SlSocialYoutube } from "react-icons/sl";
import { CiLinkedin } from "react-icons/ci";
import { AiFillInstagram, AiFillTwitterCircle, AiFillGithub } from 'react-icons/ai'


const About = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);
    const [imgPen, setimgPen] = useState(true);
    const [load, setLoad] = useState(false);
    const [showImg, setShowImg] = useState(true);
    const [userData, setUserData] = useState({
        name: "", work: "", email: "", phone: "", _id: ""
    });
    const [file, setFile] = useState("");
    const [url, setUrl] = useState();
    const fileInput = useRef();

    const callAboutPage = async () => {
        try {
            // const res = await fetch("https://cosmos-server.onrender.com/api/about", {
            const res = await fetch(`${url}/api/about`, {
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
                setUserData(data);
            }
        } catch (error) {
            console.error(error);
            navigate('/login');
        }
    }

    const send = async (e) => {
        e.preventDefault();
        try {
            setLoad(true);
            const data = new FormData();
            data.append("image", file);

            // const res = await fetch("https://cosmos-server.onrender.com/api/uploading", {
            const res = await fetch(`${url}/api/uploading`, {
                method: "POST",
                credentials: 'include',
                body: data
            })

            const respond = await res.json();
            const status = res.status;

            if (status === 402) {
                setLoad(false);
                throw new Error();
            } else {
                window.location.reload();
                window.alert(respond.message);
                setFile(null);
                fileInput.current.value = "";
                setLoad(false);
            }
        } catch (error) {
            setLoad(false);
            console.error("send", error);
        }
    }

    const userImg = async () => {
        try {
            // const res = await fetch("https://cosmos-server.onrender.com/api/getimage", {+
            const res = await fetch(`${url}/api/getimage`, {
                method: "GET",
                credentials: 'include'
            });

            const data = await res.json();
            const status = res.status;
            if (!data || status !== 200) {
                setimgPen(false);
                throw new Error("Something went wrong");
            }
            const imgBuffer = data.data.data;

            var base64String = btoa(
                new Uint8Array(imgBuffer)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );

            setShowImg(false);
            setUrl(`data:image/*;base64,${base64String}`);
            setimgPen(false);
        } catch (error) {
            console.error(error.message);
        }
    }

    // eslint-disable-next-line
    const { state, dispatch } = useContext(UserContext);

    const deleteUser = async () => {
        try {
            setLoad(true);
            // const res = await fetch("https://cosmos-server.onrender.com/api/deleteuser", {
            const res = await fetch(`${url}/api/deleteuser`, {
                method: "DELETE",
                credentials: 'include'
            });

            const data = await res.json();
            const status = res.status;
            if (!data || status !== 201) {
                setLoad(false);
                const error = new Error(res.error);
                throw error;
            } else {
                setLoad(false);
                dispatch({ type: "USER", payload: false });
                window.alert(data.message);
                navigate('/login');
            }
        } catch (error) {
            setLoad(false);
            window.location.reload();
            window.alert(error.message);
            navigate('/login');
        }
    }

    useEffect(() => {
        callAboutPage();
        userImg();
        // eslint-disable-next-line     
    }, []);

    const Render = () => {
        if (load) {
            return <Loading />
        } else {
            return <Loader />
        }
    }

    return (
        <>
            {(load || show || imgPen) ? <Render /> :
                <section className="about">
                    <div className="about-container">
                        <div className="about-profile">
                            <dir className="about-img">
                                <img src={showImg ? me : url} alt="me" className="item1" />
                            </dir>
                            <div className="about-content">
                                <h2 >{userData.name}</h2>
                                <h4>{userData.work}</h4>
                                <h4 className="abt-pad">Rating: {Math.floor(Math.random() * (10 - 1 + 1)) + 1}/10</h4>
                                <form className="file-form">
                                    <label htmlFor="image">Change Img</label>
                                    <input type="file" accept='image/*' className="custom-file-input" required
                                        ref={fileInput}
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setFile(file);
                                        }}
                                    />
                                    <button type="submit" className="file-btn" onClick={send}>Upload</button>
                                </form>
                                <div className="about-upt">
                                    <Link to="/profileupdate">Update Profile</Link>
                                    <Link to="/credentialupdate">Update Password</Link>
                                </div>
                                <button type="submit" className="del-btn" onClick={deleteUser}>Delete User</button>
                            </div>
                        </div>

                        <div className="about-link">
                            <div className="about-link-work">
                                <div>
                                    <div className="about-link-comp">
                                        <a href="https://www.youtube.com/channel/UCo0pwOUS3MxuAOX7M8XtpKg" target="_blank" rel="noreferrer"><SlSocialYoutube /><span>Youtube</span></a>
                                    </div>

                                    <div className="about-link-comp">
                                        <a href="https://www.linkedin.com/in/blackoutyash" target="_blank" rel="noreferrer"><CiLinkedin /><span>LinkedIn</span></a>
                                    </div>

                                    <div className="about-link-comp">
                                        <a href="https://www.instagram.com/yash.raj_2002" target="_blank" rel="noreferrer"><AiFillInstagram /><span>Instagram</span></a>
                                    </div>

                                    <div className="about-link-comp">
                                        <a href="https://github.com/blackout-yash" target="_blank" rel="noreferrer"><AiFillGithub /><span>Github</span></a>
                                    </div>

                                    <div className="about-link-comp">
                                        <a href="https://twitter.com/YashKum42290136" target="_blank" rel="noreferrer"><AiFillTwitterCircle /><span>Twitter</span></a>
                                    </div>
                                </div>
                            </div>
                            <div className="about-link-form ">
                                <table>
                                    <tr>
                                        <td>Id</td>
                                        <td>{userData._id}</td>
                                    </tr>
                                    <tr>
                                        <td>Name</td>
                                        <td>{userData.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>{userData.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Work</td>
                                        <td>{userData.work}</td>
                                    </tr>
                                    <tr>
                                        <td>Mobile</td>
                                        <td>{userData.phone}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </section >
            }
        </>
    )
};

export default About;