import React, { useEffect, useState, useRef } from "react";
import { Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import classnames from "classnames"
import styles from "./Topbar.module.css"

function DefaultTopbar({page}) {
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

    return (
        
        <div>
            <Navbar className={classnames('justify-content-between', IsLogin ? styles.topbar : styles.noLoginTopbar, PageType == "main" ? styles.main : "")}>
                <div>
                    <Navbar.Brand href='/'>
                        <img src="/img/logo.png" className={styles.topbarLogo}/>
                    </Navbar.Brand>
                </div>
                <div style={{align: "left"}}>
                    {BlogName && (
                        <Navbar.Brand href='/blogs'>
                            <text>OOO의 블로그</text>
                        </Navbar.Brand>
                    )}
                </div>
                <div style={{marginRight:"20px"}}>
                    {IsLogin ? (
                        <NavDropdown 
                            title={image}
                            id="basic-nav-dropdown" 
                            drop="drop" 
                            align="end">
                                <NavDropdown.Item href="/blogs">내 블로그</NavDropdown.Item>
                                <NavDropdown.Item href="/mngt">계정 설정</NavDropdown.Item>
                                <NavDropdown.Item href="/">로그아웃</NavDropdown.Item>
                        </NavDropdown>
                    ) : <Button variant='dark' onClick={handleButtonClick}>로그인</Button>}
                    
                    
                </div>
            </Navbar>
      
    </div>
    );
}

export default DefaultTopbar;