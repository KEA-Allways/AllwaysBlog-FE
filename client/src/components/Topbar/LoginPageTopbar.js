import Navbar from 'react-bootstrap/Navbar';
import classnames from "classnames"
import styles from "./Topbar.module.css"

const LoginPageTopbar = () => {
  return (
    <Navbar className={classnames('justify-content-between', styles.loginTopbar)}>
      <div>
        <Navbar.Brand href='/'>
          <img src="/img/logo.png" className={styles.topbarLogo}/>
        </Navbar.Brand>
      </div>
      
    </Navbar>
  );
}

export default LoginPageTopbar;