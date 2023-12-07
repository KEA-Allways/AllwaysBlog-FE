import React, { useEffect, useState, useRef } from "react";
import { Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import classnames from "classnames"
import styles from "./Topbar.module.css"
import styled from "@emotion/styled";
import axios from "axios";
import { blogStore, loginStore, themeStore }  from '../../store/store'
import { useLocation, useParams, useNavigate } from "react-router";
import { CommonButton } from "../../common";
import Swal from "sweetalert2";
import { DefaultAxios } from "../../lib/DefaultAxios";

function Topbar() {
    const profileImg = localStorage.getItem('profileImg');
    const userSeq = localStorage.getItem("userSeq");
    const userName = localStorage.getItem("userName");
    const blogName = localStorage.getItem("blogName");
    let blogCreation = (localStorage.getItem("blogCreation"))
    if(blogCreation === "false"){
        blogCreation = false;
    }
    const params = useParams();


    const image = <img src={profileImg} alt="Profile" width="50px" height="50px" />;

    
    
    const {blogMasterName} = blogStore(state => state);
    const [themeName, setThemeName] = useState("");
    // const { themeNames ,addTheme } = themeListStore(state => state);
    const location = useLocation();
    const isMngtPage = location.pathname.startsWith("/mngt");
    const isBlogPage = location.pathname.startsWith("/blog/");
    const isLoginPage = location.pathname.startsWith("/login");
    const isSignUpPage = location.pathname.startsWith("/signup");
    const isBlogCreationPage = location.pathname.startsWith("/blog-creation");
    const navigate = useNavigate();
    
    // "null" ! ! false
    // "dawsd" ! ! true

    
    const changeThemeName = async () => {
        try{
            const res = await DefaultAxios.get(`/api/theme/one/${params.themeSeq}`)
            setThemeName(res.data.result.data);
        }catch(e){
            console.log("탑바에서 나는 오류인데, 잡기 귀찮다")
        }
    }

    const handleButtonClick = () => {
        navigate("/login");
    }

    const handleBlogButtonClicked = () => {
        if(!blogCreation){
            Swal.fire({
                title: "블로그 생성페이지로 이동합니다!",
                icon: 'info'
              }).then(() => {
                navigate("/blog-creation");
              })
        }else{
            navigate(`/blog/${userSeq}`);
        }  
    }

    const logout = () => {
        localStorage.clear();
        window.open("/", "_self");
    };

    useEffect(() => {
        changeThemeName();
    }, [params.themeSeq])

      
    return (
        <div>
            <Navbar className={classnames('justify-content-between', styles.topbar)}>
                {/* 로고 자리 */}
                <div className={styles.leftSideContainer}>
                    <Navbar.Brand href='/' className="d-flex justify-content-center w-100">
                        <img src="/img/logo.png" className={styles.topbarLogo}/>
                    </Navbar.Brand>

                    {/* {console.log(themes[0].themeName)} */}
                    {/* 관리 페이지에 블로그이름 있을 경우 */}
                    {isMngtPage && blogName && (
                        <Navbar.Brand href='/blog' className={styles.center}>
                            {userName} 의 {blogName}
                        </Navbar.Brand>
                    )}
                    
                    {/* 관리 페이지에 블로그이름 없을 경우 */}
                    {isMngtPage && (!blogName) && (
                       <Navbar.Brand className={styles.center}>
                            {userName}님, 블로그가 없습니다.
                       </Navbar.Brand>
                    )}

                    {/* 블로그 페이지에 테마이름 */}
                    {isBlogPage && (
                        <Navbar.Brand className={styles.center}>
                            {blogMasterName}의 {themeName}
                        </Navbar.Brand>
                    )}

                    {isBlogCreationPage && (
                        <Navbar.Brand className={styles.center}>
                        
                        </Navbar.Brand>
                    )}

                
                </div>
                {/* 로그인, 드롭다운 자리 */}
                {/* 로그인페이지와 회원가입 페이지에는 로그인쪽 버튼 X */}
                {!(isLoginPage) && !(isSignUpPage) && (
                    <div className={styles.rightSideContainer}>
                        {console.log(userName)}
                    {userName ? (
                        <NavDropdown
                            title={image}
                            id="basic-nav-dropdown" 
                            drop="drop" 
                            align="end"
                            className={styles.rightSideContainer} >
                                <NavDropdown.Item 
                                    onClick={handleBlogButtonClicked}
                                    style={{width: "100px", marginRight: "50px"}}>내 블로그</NavDropdown.Item>
                                <NavDropdown.Item href="/mngt" style={{width: "100px"}}>계정 설정</NavDropdown.Item>
                                <NavDropdown.Item onClick={logout} style={{width: "100px"}}>로그아웃</NavDropdown.Item>
                        </NavDropdown>
                    ) : <LoginButton onClick={handleButtonClick}>로그인</LoginButton>}
                    </div>
                )}
            </Navbar>
    </div>
    );
}

const LoginButton = styled(CommonButton)`
    padding : 3px;
    height : 45px;
    margin-top: 4px;
    transition: all 0.5 ease;

    &:hover {
    transition: all 0.5 ease;
    border-width : 2px;
    border-color : black;
  }
`

export default Topbar;