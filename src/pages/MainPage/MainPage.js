import { useEffect } from "react";
import Banner from "../../components/Banner/Banner"
import Grid from "../../components/Grid/Grid";
import Footer from "../../components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "@emotion/styled";
import Topbar from "../../components/Topbar/Topbar";
import axios from "axios";
import { blogStore, loginStore, mainPostStore }  from "../../store/store"
import { TokenAxios } from "../../lib/TokenAxios";

const MainPage = () => {

    // store에서 함수들 가져오기
    const {setProfileImg, setUserName} = loginStore(state => state);
    const {setBlogSeq,setBlogName} = blogStore(state => state);
    const {setTenPosts} = mainPostStore(state => state);

    // accessToken 가지고 userInfo 가져오는 코드
    const getUserInfo = async() => {
        try{
            const res = await TokenAxios.get(`/api/user`);
            if(res.data.success){
                
                // setProfileImg(res.data.result.data.profileImg); 나중에 프로필이미지도 추가되면 넣기.
                setBlogSeq(res.data.result.data.blogSeq);
                setBlogName(res.data.result.data.blogName);
                setUserName(res.data.result.data.nickname);
                
            }
        }catch(e){
            console.log(e);
        }
        
    }

    // mainPost 10개 가지고 오는 코드
    const getMainPost = async() => {
        const res = await TokenAxios.get(`/api/post/main`);
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