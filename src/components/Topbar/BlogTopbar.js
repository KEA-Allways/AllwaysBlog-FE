import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import classnames from "classnames"
import styles from "./Topbar.module.css"
import { NavbarCollapse } from 'react-bootstrap';

const  BlogTopbar = () => {
  const image = <img src='/img/usericon.png' width="50px" height="50px" />

  return (
    <Navbar className={classnames('justify-content-between', styles.topbar)}>
      <Navbar.Brand href='/'>
          <img src="/img/logo.png" className={styles.topbarLogo}/>
      </Navbar.Brand>
      <Navbar.Brand href='/blogs'>
        {/* <img src="/logo192.png" alt='Blog 로고'/> */}
        <text>OOO의 블로그</text>
      </Navbar.Brand>
      <NavbarCollapse className='justify-content-end'>
        <Navbar.Brand>
            {image}
        </Navbar.Brand>
      </NavbarCollapse>
      <NavDropdown 
        id="basic-nav-dropdown" 
        drop="drop" 
        align="end"
      >
            <NavDropdown.Item href="/blogs">내 블로그</NavDropdown.Item>
            <NavDropdown.Item href="/mngt">계정 설정</NavDropdown.Item>
            <NavDropdown.Item href="/">로그아웃</NavDropdown.Item>
      </NavDropdown>
    </Navbar>
  );
}

export default BlogTopbar;


