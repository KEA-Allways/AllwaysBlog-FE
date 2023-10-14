import { useState } from "react";
import Topbar from "../components/Topbar";
import NoLoginTopbar from "../components/NoLoginTopbar";
import Banner from "../components/Banner";
import Grid from "../components/Grid";

const MainPage = () => {

    const [login, setLogin] = useState(false);

    const handleLogin = () => {
        setLogin((cur) => !cur);
    }
    
    return (
        <div>
            {login ? <Topbar/> : <NoLoginTopbar/>}
            <Banner />
            <div style={{marginBottom : "50px", marginTop : "50px"}}></div>
            <Grid />
        </div>
    )
}

export default MainPage;