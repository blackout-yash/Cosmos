import "../../styles/loader.css";
import { MagnifyingGlass } from "react-loader-spinner";

const Loader = () => {
    return (
        <div className="loader">
            <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor='#c0efff'
                color='#081c3b'
            />
            <h2>Fetching data from DB...</h2>
        </div>
    )
}

export default Loader