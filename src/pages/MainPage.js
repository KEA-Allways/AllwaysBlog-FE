import { useState } from "react";
import Topbar from "../components/Topbar";
import NoLoginTopbar from "../components/NoLoginTopbar";

const MainPage = () => {

    const [login, setLogin] = useState(false);

    const handleLogin = () => {
        setLogin((cur) => !cur);
    }
    return (
        <div>
            {login ? <Topbar/> : <NoLoginTopbar/>}
        </div>
    )
}

export default MainPage;