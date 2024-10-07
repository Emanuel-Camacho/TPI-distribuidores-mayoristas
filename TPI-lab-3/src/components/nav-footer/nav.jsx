import { Button, Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import './nav.css'
import { useNavigate } from "react-router-dom";

const NavBar = ({ onLogout }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/login");
        onLogout();
    };
return (
<Navbar expand="lg" className="navbar w-100">
    <Container fluid className="container">
    <Navbar.Brand href="#" className="nombre-logo" >Todo al Por Mayor</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
        <div className="d-flex flex-column w-100">
            <div className="d-flex justify-content-center align-items-center mb-2">
                <Form className="d-flex barra-busqueda">
                <Form.Control
                    type="search"
                    placeholder="Buscar producto"
                    className="me-2"
                    aria-label="Search"
                    
                />
                <Button variant="btn btn-light">🔍</Button>
                </Form>
                <Button className="carrito"><img src="https://cdn-icons-png.flaticon.com/512/107/107831.png" alt="Carrito"/></Button>
                <Button className="d-flex align-items-center ms-auto" onClick={handleLogout} >Cerrar sesión</Button>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <Nav className="flex-grow-1">
                <Nav.Link href="#action1">Inicio</Nav.Link>
                <Nav.Link href="#action2">Mis compras</Nav.Link>
                <NavDropdown title="Filtro" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#action3">Ropa</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Libreria</NavDropdown.Item>
                    {/* <NavDropdown.Divider /> */}
                    <NavDropdown.Item href="#action5">Comida</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                
            </div>
        </div>
    </Navbar.Collapse>
    </Container>
</Navbar>
);
}

export default NavBar;