import { useState } from "react";
import Topbar from "../components/Topbar";
import NoLoginTopbar from "../components/NoLoginTopbar";
import Banner from "../components/Banner";

const MainPage = () => {

    const [login, setLogin] = useState(false);

    const handleLogin = () => {
        setLogin((cur) => !cur);
    }
    return (
        <div>
            {login ? <Topbar/> : <NoLoginTopbar/>}
            <Banner />
        </div>
    )
}

export default MainPage;