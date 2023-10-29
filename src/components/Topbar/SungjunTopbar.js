import React, { useEffect, useState, useRef } from "react";
import { Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import classnames from "classnames"
import styles from "./Topbar.module.css"
import axios from "axios";
import { loginStore }  from '../../store/store'
import { useLocation, useParams, useNavigate } from "react-router";

function SungjunTopbar() {
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
                            align="end">
                                <NavDropdown.Item href="/blogs">내 블로그</NavDropdown.Item>
                                <NavDropdown.Item href="/mngt">계정 설정</NavDropdown.Item>
                                <NavDropdown.Item onClick={logout}>로그아웃</NavDropdown.Item>
                        </NavDropdown>
                    ) : <Button variant='dark' onClick={handleButtonClick}>로그인</Button>}
                    </div>
                )}
            </Navbar>
    </div>
    );
}

export default SungjunTopbar;