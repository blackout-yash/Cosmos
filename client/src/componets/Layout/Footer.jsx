import "../../styles/footer.css";
import { AiFillInstagram, AiFillTwitterCircle, AiFillGithub } from 'react-icons/ai'
import { BiHomeAlt2 } from "react-icons/bi";
import { FiSmartphone } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-title">
                <h1><span>Cosmos</span></h1>
            </div>
            <div className="footer-content">
                <div className="footer-info">
                    <div>
                        <h2>Address</h2>
                        <p><BsPerson /> <span>Yash Kumar</span> </p>
                        <p><FiSmartphone /><span>+91 7667516444</span></p>
                        <p><BiHomeAlt2 /><span>Chandigarh, Punjab</span></p>
                    </div>
                </div>
                <div className="footer-vision">
                    <h2>Vision</h2>
                    <p>Dream, innovate, inspire and empower the next generation to transform humanity through technology and imagination</p>
                </div>
                <div className="footer-icons">
                    <h3>Stay Connected</h3>
                    <a href="https://www.instagram.com/yash.raj_2002/" target='_blank' rel="noreferrer">< AiFillInstagram /></a>
                    <a href="https://github.com/blackout-yash" target='_blank' rel="noreferrer">< AiFillGithub /></a>
                    <a href="https://twitter.com/YashKum42290136" target='_blank' rel="noreferrer">< AiFillTwitterCircle /></a>
                </div>
            </div>
            <div className="tagline">
                <em>Space is beyond infinity.</em>
                <strong>All rights reserverd @blackout_yash</strong>
            </div>
        </div>
    )
};

export default Footer;