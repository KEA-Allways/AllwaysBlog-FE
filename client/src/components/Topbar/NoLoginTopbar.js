import { Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import styles from "./Topbar.module.css";

const  NoLoginTopbar = () => {

    const handleButtonClick = () => {
        window.location.href = "/login"
    }
    
    return (
        <Navbar className={(`justify-content-between ${styles.noLoginTopbar}`)}>
            <Navbar.Brand href='/'>
                <img src="/img/logo.png" className={styles.topbarLogo}/>
            </Navbar.Brand>
            <Button variant='dark' onClick={handleButtonClick}>로그인</Button>
        </Navbar>
        
    );
    }

export default NoLoginTopbar;