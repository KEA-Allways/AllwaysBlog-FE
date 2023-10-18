import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import classnames from "classnames"
import styles from "./Topbar.module.css"

const  Topbar = () => {
  const image = <img src='/img/usericon.png' width="50px" height="50px" />

  return (
    <Navbar className={classnames('justify-content-between', styles.topbar)}>
      <Navbar.Brand href='/'>
        <img src="/img/logo.png" className={styles.topbarLogo}/>
      </Navbar.Brand>
      <NavDropdown 
        title={image}
        id="basic-nav-dropdown" 
        drop="drop" 
        align="end">
          <NavDropdown.Item href="/blogs">내 블로그</NavDropdown.Item>
          <NavDropdown.Item href="/mngt">계정 설정</NavDropdown.Item>
          <NavDropdown.Item href="/">로그아웃</NavDropdown.Item>
      </NavDropdown>
    </Navbar>
  );
}

export default Topbar;



