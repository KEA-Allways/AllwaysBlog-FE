import { useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import NoLoginTopbar from "../../components/Topbar/NoLoginTopbar";
import Banner from "../../components/Banner/Banner"
import Grid from "../../components/Grid/Grid";
import Footer from "../../components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "@emotion/styled";

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
        <Layout>
            {login ? <Topbar/> : <NoLoginTopbar/>}
                
            <Banner />
            
            <CardContainer>
                <Grid />
            </CardContainer>
            
            <Footer />
        </Layout>
    )
}


const Layout = styled.div`
    transition: all 0.5s ease;
`;

const CardContainer = styled.div`
    margin-top : 70px;
    margin-left : 100px;
`;




export default MainPage;