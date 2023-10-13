import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const  Topbar = () => {
  return (
    <Navbar className='justify-content-between'>
            <Navbar.Brand href="/" className='justify-content-start'>
                <img
                src="/img/logo.png"
                width="100"
                height="50"
                className="d-inline-block align-top"
                alt="Allways Logo"
                />
            </Navbar.Brand>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown" className='justify-content-end'>
            <NavDropdown.Item href="#action/3.1">내 블로그</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">계정 관리</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">로그아웃</NavDropdown.Item>
        </NavDropdown>
    </Navbar>
  );
}

export default Topbar;