import { Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import classnames from "classnames"
import styles from "./Topbar.module.css";

const  NoLoginTopbar = () => {

    const handleButtonClick = () => {
        window.location.href = "/login"
    }
    
    return (
        <Navbar className={classnames('justify-content-between',styles.noLoginTopbar)}>
            <Navbar.Brand href='/'>
                <img src="/img/logo.png" />
            </Navbar.Brand>
            <Button variant='dark' onClick={handleButtonClick}>로그인</Button>
        </Navbar>
        
    );
    }

export default NoLoginTopbar;