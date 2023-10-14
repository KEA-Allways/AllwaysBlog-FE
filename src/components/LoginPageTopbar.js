import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const LoginPageTopbar = () => {
  return (
    <Navbar>
    <Navbar.Brand href='/'>
        <img src="/img/logo.png" alt='Allways 로고'/>
    </Navbar.Brand>
    </Navbar>
  );
}

export default LoginPageTopbar;