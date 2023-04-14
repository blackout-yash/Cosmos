import { useEffect, useState } from "react";
import "../../styles/home.css";
import Loader from "../Extra/Loader";

const Home = () => {
    const [userName, setUserName] = useState();
    const [show, setShow] = useState(true);
    const [user, setUser] = useState(true);
    const [fact, setFact] = useState("The sun's mass takes up 99.86% of the solar system.");

    const userHome = async () => {
        try {
            const res = await fetch("https://cosmos-server.onrender.com/api/getdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });
            const data = await res.json();
            const status = res.status;
            if (!data || status !== 200) {
                setShow(false);
                setUser(false);
                const error = new Error(res.error);
                throw error;
            } else {
                setUserName(data.name);
                setShow(false);
            }
        } catch (error) {
            console.error(error);
        }
    }


    const facts = async () => {
        try {
            const res = await fetch('https://space-facts.vercel.app/blackout_yash/space-facts/api?length=1');
            const data = await res.json();
            const status = res.status;

            if (status !== 200) {
                throw new Error(data.message);
            } else {
                setFact(data[0].fact);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        userHome();
        facts();
        // eslint-disable-next-line     
    }, []);

    return (
        <>
            {show ? <Loader /> :
                <section className="home">
                    <div className="home-text">
                        <h1>Welcome Cosmos</h1>
                        <h2>{user ? userName : "Vacuum"}</h2>
                    </div>
                    <div className="fact">
                        <h3>{fact}</h3>
                    </div>
                </section>
            }
        </>
    )
}

export default Home