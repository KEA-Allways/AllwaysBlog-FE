import React, { useEffect, useState, useRef } from "react";
import { Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import classnames from "classnames"
import styles from "./Topbar.module.css"
import axios from "axios";
import loginStore from "../../store/store";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

function SungjunTopbar() {
    const image = <img src='/img/usericon.png' width="50px" height="50px" />

    const {isLogin, hasBlog, username} = loginStore(state => state);
    const location = useLocation();
    const isMngtPage = location.pathname.startsWith("/mngt");
    const isBlogPage = location.pathname.startsWith("/blogs");
    const isLoginPage = location.pathname.startsWith("/login");
    const isSignUpPage = location.pathname.startsWith("/signup");
    const navigate = useNavigate();

    // 홈페이지, 블로그페이지, 관리페이지 전부 다른 탑바를 써야해
    // 로고는 기본값이고, 로그인버튼이랑 드롭다운 메뉴는 로그인 여부로 갈리고
    // 블로그 여부는 블로그를 가지고 있는지 여부도 있지만 그건 mngt 페이지에서 보여줄때이고
    // path가 더 중요하네 여기서 다 따로 만든다면 컴포넌트를 만들어 놓는게 훨씬 낫지.
    // 로고, 블로그이름, 로그인버튼, 드롭다운 메뉴를 다 컴포넌트로 만들어? 귀찮다. 어차피 탑바에만 쓰일건데 굳이.

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
        // 블로그 이름 : 홈은 아무것도 안나오게 하고, 블로그는 블로그주인의 블로그이름 나오게 하고, 관리페이지는 로그인한 사용자의 블로그 나오게 하기.
        // 블로그가 없는 사용자는 블로그 이름이 안뜨게 하고, 블로그가 없습니다. 생성하시겠습니까? 띄우고 블로그 생성 버튼
        // 남의 블로그로 들어갔을 때는 글 작성버튼 없게하고, 내 블로그로 들어갔을 때는 글 작성버튼 뜨게 하기.
        <div>
            <Navbar className={classnames('justify-content-between', styles.topbar)}>
                {/* 로고 자리 */}
                <div className={styles.leftSideContainer}>
                    <Navbar.Brand href='/' className="d-flex justify-content-center w-100">
                        <img src="/img/logo.png" className={styles.topbarLogo}/>
                    </Navbar.Brand>

                    {/* 블로그 자리 */}
                    {isMngtPage && hasBlog && (
                        <Navbar.Brand href='/blogs' className={styles.center}>
                            {username}의 블로그
                        </Navbar.Brand>
                    )}

                    {isMngtPage && (!hasBlog) && (
                       <Navbar.Brand className={styles.center}>
                            {username}님, 블로그가 없습니다.
                       </Navbar.Brand>
                    )}

                    {isBlogPage && (
                        <Navbar.Brand className={styles.center}>
                            우딩탕탕 블로그~
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
                                <NavDropdown.Item href="/blogs" style={{width: "100px", marginRight: "50px"}} >내 블로그</NavDropdown.Item>
                                <NavDropdown.Item href="/mngt" style={{width: "100px"}}>계정 설정</NavDropdown.Item>
                                <NavDropdown.Item onClick={logout} style={{width: "100px"}}>로그아웃</NavDropdown.Item>
                        </NavDropdown>
                    ) : <Button variant='dark' onClick={handleButtonClick}>로그인</Button>}
                    </div>
                )}
            </Navbar>
    </div>
    );
}

export default SungjunTopbar;