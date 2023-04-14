import { useEffect, useState } from "react";
import "../../styles/contact.css";
import { useNavigate } from "react-router-dom";
import Loader from "../Extra/Loader";
import { FaRegAddressBook } from "react-icons/fa";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { BiMobileAlt } from "react-icons/bi";
import Loading from "../Extra/Loading";

const Contact = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);
    const [load, setLoad] = useState(false);
    const [userData, setUserData] = useState({
        name: "", email: "", phone: "", message: ""
    });

    const userContact = async () => {
        try {
            const res = await fetch("http://localhost:4000/api/getdata", {
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
                setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });
            }
        } catch (error) {
            navigate("/login");
            console.error(error);
        }
    }

    useEffect(() => {
        userContact();
        // eslint-disable-next-line     
    }, []);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({ ...userData, [name]: value });
    }

    const contactForm = async (e) => {
        e.preventDefault();

        try {
            setLoad(true);
            const { name, email, phone, message } = userData;

            const res = await fetch("http://localhost:4000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ name, email, phone, message })
            })

            const data = await res.json();
            const status = res.status;
            if (!data || status === 422) {
                setLoad(false);
                window.alert(data.message);
                navigate("/login");
            } else {
                setLoad(false);
                window.alert(data.message);
                setUserData({ ...userData, message: "" });
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
                <section className="contact">
                    <div className="admin-contact">
                        <p><MdOutlinePeopleAlt /> <span>Yash Kumar</span></p>
                        <p><BiMobileAlt /><span>+91 7667516444</span></p>
                        <p><FaRegAddressBook /><span>Chandigarh</span></p>
                    </div>

                    <div className="contact-form">
                        <h2>Get in Touch</h2>
                        <form>
                            <div className="contact-input">
                                <input type="text" name="name" placeholder="Your Name" required
                                    value={userData.name}
                                    onChange={handleInput}
                                />
                                <br />
                                <input type="email" name="email" placeholder="abc@gmail.com" required
                                    value={userData.email}
                                    onChange={handleInput}
                                />
                                <input type="number" name="phone" placeholder="Your phone" required
                                    value={userData.phone}
                                    onChange={handleInput}
                                />
                            </div>
                            <textarea name="message" cols="30" rows="8" placeholder="Your Message" required
                                value={userData.message}
                                onChange={handleInput}
                            ></textarea>
                            <button type="submit" className="contact-btn"
                                onClick={contactForm}
                            >Send Message</button>
                        </form>
                    </div>
                </section>
            }
        </>
    )
};

export default Contact;