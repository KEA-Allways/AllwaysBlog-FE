import { useState } from "react";
import Topbar from "../components/Topbar";
import NoLoginTopbar from "../components/NoLoginTopbar";
import Banner from "../components/Banner";
import Grid from "../components/Grid";
import Footer from "../components/Footer";

const MainPage = () => {

    const marginStyle = {
        margin : "0 3rem"
    }

    const maxMarginStyle = {
        margin : "0 10rem",
    }

    const [login, setLogin] = useState(false);

    const handleLogin = () => {
        setLogin((cur) => !cur);
    }
    
    return (
        <div>
            <div style={marginStyle}>
                {login ? <Topbar/> : <NoLoginTopbar/>}
                
            </div>
            <Banner />
            <div style={{marginBottom : "50px", marginTop : "50px"}}></div>
            <div style={maxMarginStyle}>
                <Grid />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default MainPage;