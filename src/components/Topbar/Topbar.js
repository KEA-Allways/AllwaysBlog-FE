import React, { useEffect, useState, useRef } from "react";
import { Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import classnames from "classnames"
import styles from "./Topbar.module.css"
import styled from "@emotion/styled";
import axios from "axios";
import { loginStore }  from '../../store/store'
import { useLocation, useParams, useNavigate } from "react-router";
import { CommonButton } from "../../common";
import Swal from "sweetalert2";

function Topbar() {
    const image = <img src='/img/usericon.png' width="50px" height="50px" />

    const {isLogin, hasBlog, username} = loginStore(state => state);
    // const { themeNames ,addTheme } = themeListStore(state => state);
    const location = useLocation();
    const isMngtPage = location.pathname.startsWith("/mngt");
    const isBlogPage = location.pathname.startsWith("/blogs");
    const isLoginPage = location.pathname.startsWith("/login");
    const isSignUpPage = location.pathname.startsWith("/signup");
    const navigate = useNavigate();
    const [themes, setThemes] = useState(["소소한 일상 기록", "여행 다이어리"]);
    let  params  = useParams();

    const handleButtonClick = () => {
        navigate("/login");
    }

    const handleBlogButtonClicked = () => {
        if(!hasBlog){
            Swal.fire({
                title: "블로그 생성페이지로 이동합니다!",
                icon: 'info'
              }).then(() => {
                navigate("/blog-creation");
              })
        }else{
            navigate("/blogs");
        }  
    }

    const logout = () => {
        axios({
          url: "/logout",
          method: "POST",
          withCredentials: true,
        }).then((result) => {
          if (result.status === 200) {
            window.open("/", "_self");
          }
        });
      };

    return (
        <div>
            <Navbar className={classnames('justify-content-between', styles.topbar)}>
                {console.log(params.themeId)}
                {/* 로고 자리 */}
                <div className={styles.leftSideContainer}>
                    <Navbar.Brand href='/' className="d-flex justify-content-center w-100">
                        <img src="/img/logo.png" className={styles.topbarLogo}/>
                    </Navbar.Brand>

                    {/* 블로그 자리 */}
                    {isMngtPage && hasBlog && (
                        <Navbar.Brand href='/blos' className={styles.center}>
                            {username}의 우당탕탕 블로그
                        </Navbar.Brand>
                    )}

                    {isMngtPage && (!hasBlog) && (
                       <Navbar.Brand className={styles.center}>
                            {username}님, 블로그가 없습니다.
                       </Navbar.Brand>
                    )}

                    {isBlogPage && (
                        <Navbar.Brand className={styles.center}>
                            {username}의  { params.themeId !== undefined ? themes[params.themeId-1] : themes[0]}
                        </Navbar.Brand>
                    )}

                
                </div>
                {/* 로그인, 드롭다운 자리 */}
                {!(isLoginPage) && !(isSignUpPage) && (
                    <div className={styles.rightSideContainer}>
                    {isLogin ? (
                        <NavDropdown
                            title={image}
                            id="basic-nav-dropdown" 
                            drop="drop" 
                            align="end"
                            className={styles.rightSideContainer} >
                                <NavDropdown.Item 
                                    // href={hasBlog ? "/blogs" : "/blog-creation"}                             
                                    onClick={handleBlogButtonClicked}
                                    // onClick={() => { if(!hasBlog) Swal.fire({title : "블로그가 없어 생성 페이지로 이동합니다."})}} 
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