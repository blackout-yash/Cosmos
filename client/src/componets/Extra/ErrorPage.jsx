import { Link } from "react-router-dom";
import "../../styles/errorPage.css";

const ErrorPage = () => {
    return (
        <section className="error">
            <h1>Sorry Page not Found</h1>
            <h4>404 Error</h4>
            <Link to="/" className="home-btn">Home</Link>
        </section>
    )
};

export default ErrorPage;