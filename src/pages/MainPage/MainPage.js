import { useEffect } from "react";
import Banner from "../../components/Banner/Banner"
import Grid from "../../components/Grid/Grid";
import Footer from "../../components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "@emotion/styled";
import Topbar from "../../components/Topbar/Topbar";
import axios from "axios";
import { loginStore, mainPostStore }  from "../../store/store"

const MainPage = () => {

    // store에서 함수들 가져오기
    const {setIsLogin, setProfileImg, setBlogName, setUserName} = loginStore(state => state);
    const {setTenPosts} = mainPostStore(state => state);

    // accessToken 가지고 userInfo 가져오는 코드
    const getUserInfo = async() => {
        const res = await axios.get(`${process.env.REACT_APP_GATEWAY_URL}/api/user`, {
            headers : {
                "AccessToken" : localStorage.getItem("accessToken"),
                "RefreshToken" : localStorage.getItem("refreshToken"),
            }
        });
        if(res.data.success){
            setIsLogin(true);
            // setProfileImg(res.data.result.data.profileImg); 나중에 프로필이미지도 추가되면 넣기.
            setBlogName(res.data.result.data.blogName);
            setUserName(res.data.result.data.nickname);
        }
    }

    // mainPost 10개 가지고 오는 코드
    const getMainPost = async() => {
        const res = await axios.get(`${process.env.REACT_APP_GATEWAY_URL}/api/post/main`, {
            headers : {
                "AccessToken" : localStorage.getItem("accessToken"),
                "RefreshToken" : localStorage.getItem("refreshToken"),
            }
        });
        await setTenPosts(res.data.result.data);
      }

    // 화면 렌더링 될때 한번만 실행하는 코드
    useEffect(() => {
        getUserInfo();
        getMainPost();
    }, [])
    
    // 화면 띄워주는 코드
    return (
        <Layout>
            <Topbar />
                
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