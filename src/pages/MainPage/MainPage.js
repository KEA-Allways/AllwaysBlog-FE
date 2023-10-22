import { useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import NoLoginTopbar from "../../components/Topbar/NoLoginTopbar";
import Banner from "../../components/Banner/Banner"
import Grid from "../../components/Grid/Grid";
import Footer from "../../components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "@emotion/styled";
import DefaultTopbar from "../../components/Topbar/DefaultTopbar";

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
            <Topbar page={"main"} />
                
            <Banner />
            
            <CardContainer>
                <Grid />
            </CardContainer>
            
            <Footer />
        </Layout>
    )
}


const Layout = styled.div`
    
`;

const CardContainer = styled.div`
    margin-top : 70px;
    margin-left : 100px;
    margin-right : 100px;
`;




export default MainPage;