import { useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import NoLoginTopbar from "../../components/Topbar/NoLoginTopbar";
import Banner from "../../components/Banner/Banner"
import Grid from "../../components/Grid/Grid";
import Footer from "../../components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";


const MainPage = () => {

    const marginStyle = {
        margin : "0 3rem"
    }

    const maxMarginStyle = {
        margin : "0 10rem",
    }

    const [login, setLogin] = useState(false);

    const handleLogin = () => {
        setLogin(!login);
    }
    
    return (
        <div>
            {login ? <Topbar/> : <NoLoginTopbar/>}
                
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