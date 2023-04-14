import "../../styles/loader.css";
import { Circles } from "react-loader-spinner";

const Loader = () => {
    return (
        <div className="loader">
            <Circles
                height="80"
                width="80"
                color="#081c3b"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
            <h2>Loading...</h2>
        </div>
    )
}

export default Loader