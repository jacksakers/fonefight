import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function NewNavbar() {
  return (
    <Navbar className="navbar">
      <Container>
        <Navbar.Brand href="#home">FoneFight</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NewNavbar;