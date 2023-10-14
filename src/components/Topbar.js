import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const  Topbar = () => {
  return (
    <Navbar className='justify-content-between'>
    <Navbar.Brand href='/'>
        <img src="/img/logo.png" alt='Allways 로고'/>
    </Navbar.Brand>
    <Navbar.Collapse className="justify-content-end">
        <Navbar.Brand>
        <img src="/img/usericon.png" alt='프로필이미지' width="50" height="50"/>
        </Navbar.Brand>
    </Navbar.Collapse>
    <NavDropdown id="basic-nav-dropdown" drop="drop" align="end">
        <NavDropdown.Item href="/blogs">내 블로그</NavDropdown.Item>
        <NavDropdown.Item href="/mngt">계정 설정</NavDropdown.Item>
        <NavDropdown.Item href="/">로그아웃</NavDropdown.Item>
    </NavDropdown>
    </Navbar>
  );
}

export default Topbar;