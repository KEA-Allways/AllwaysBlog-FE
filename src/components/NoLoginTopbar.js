import { Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const  NoLoginTopbar = () => {

    const handleButtonClick = () => {
        window.location.href = "/login"
    }
    
    return (
        <Navbar className='justify-content-between'>
        <Navbar.Brand href='/'>
            <img src="/img/logo.png" />
        </Navbar.Brand>
        <Button variant='dark' onClick={handleButtonClick}>로그인</Button>
        </Navbar>
    );
    }

export default NoLoginTopbar;