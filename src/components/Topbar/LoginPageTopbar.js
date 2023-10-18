import Navbar from 'react-bootstrap/Navbar';
import styles from "./Topbar.module.css"

const LoginPageTopbar = () => {
  return (
    <Navbar>
    <Navbar.Brand href='/'>
    <img src="/img/logo.png" className={styles.topbarLogo}/>
    </Navbar.Brand>
    </Navbar>
  );
}

export default LoginPageTopbar;