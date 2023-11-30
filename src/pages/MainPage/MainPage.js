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
import { redirect } from "react-router-dom";
import { DefaultAxios } from "../../lib/DefaultAxios";

const MainPage = () => {

    // store에서 함수들 가져오기
    const {setProfileImg, setUserName,setUserSeq} = loginStore(state => state);
    const { setBlogName,setBlogDescription} = blogStore(state => state);
    const {setTenPosts} = mainPostStore(state => state);

    // accessToken 가지고 userInfo 가져오는 코드
    const getUserInfo = async() => {
        try{
            const res = await TokenAxios.get(`/api/user`);
            const data=res.data.result.data
            
            // const profileUrl =await axios.get("localhost:8001/receive_profile")
            
            if(res.data.success){
                const userSeq=res.data.result.data.userSeq
                const response = await fetch(`http://localhost:8001/receive_profile/${userSeq}`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                if (response.ok) {
                    const profileData = await response.json(); // Convert response to JSON
                    const profileUrl = profileData.profileImg;
                    setUserSeq(data.userSeq);
                    setProfileImg(profileUrl);
                    setUserName(data.nickname);
                     
                    
                } else {
                    // Handle error, if any
                    console.error('Error fetching profile image:', response.statusText);
                }
                 
            }
        }catch (e) {
            if (e.response && e.response.status === 500) {
                setProfileImg("");
                setBlogName("");
                setUserName("");
                console.log("로컬스토리지에 accessToken 없거나 만료되었습니다.");
            } else {
                // Handle other types of errors or log them
                console.error("An error occurred:", e);
                // You might want to redirect to an error page or display an error message to the user
            }
        }
        
    }

    const getBlogInfo = async() => {
        try{
            const res = await TokenAxios.get(`/api/blog`);
            const data=res.data.result.data
            console.log(data);
            
            // const profileUrl =await axios.get("localhost:8001/receive_profile")
            
            if(res.data.success){
                setBlogName(data.blogName);
                setBlogDescription(data.blogDescription);
            }
        }catch (e) {
            if (e.response && e.response.status === 500) {
                setBlogName("");
                setBlogDescription("")
                console.log("로컬스토리지에 accessToken 없거나 만료되었습니다.");
            } else {
                // Handle other types of errors or log them
                console.error("An error occurred:", e);
                // You might want to redirect to an error page or display an error message to the user
            }
        }
        
    }

    // mainPost 10개 가지고 오는 코드
    const getMainPost = async() => {
        const res = await DefaultAxios.get(`/api/post/main`);
        await setTenPosts(res.data.result.data);
      }


    // 화면 렌더링 될때 한번만 실행하는 코드
    useEffect(() => {
        getUserInfo();
        getMainPost();
        getBlogInfo();
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