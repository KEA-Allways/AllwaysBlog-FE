import React, { useEffect, useState, useRef } from "react";
import { Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import classnames from "classnames"
import styles from "./Topbar.module.css"
import axios from "axios";

function DefaultTopbar({page, isLogin, hasBlog, username}) {
    const image = <img src='/img/usericon.png' width="50px" height="50px" />

    const [IsLogin, setIsLogin] = useState(true);
    const [PageType, setPageType] = useState(null);
    const [BlogName, setBlogName] = useState(null);

    useEffect( () => {
        if (page != null && page != ""){
            setPageType(page);
        }
    })

    const handleButtonClick = () => {
        window.location.href = "/login"
    }

    const loginYn = () => {
        if (IsLogin) setIsLogin(false);
        else setIsLogin(true)
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
            <Navbar className={classnames('justify-content-between', IsLogin ? styles.topbar : styles.noLoginTopbar, PageType == "main" ? styles.main : "")}>
                <div>
                    <Navbar.Brand href='/'>
                        <img src="/img/logo.png" className={styles.topbarLogo}/>
                    </Navbar.Brand>
                
                
                    {hasBlog && (
                        <Navbar.Brand href='/blogs'>
                            <text>{username}의 블로그</text>
                        </Navbar.Brand>
                    )}
                </div>
                <div style={{marginRight:"20px"}}>
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
            </Navbar>
      
    </div>
    );
}

export default DefaultTopbar;