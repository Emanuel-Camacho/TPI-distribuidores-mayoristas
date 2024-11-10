import { Button, Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import './NavAdmin.css'
import { useNavigate } from "react-router-dom";

const NavAdmin = ({ setSearchTerm, setSelectedCategory }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/login");
    };
    const handlerAdmin = () => {
        navigate('/admin');
    }
    return (
        <Navbar expand="lg" className="navbar w-100">
            <Container fluid className="container">
                <Navbar.Brand onClick={handlerAdmin} className="nombre-logo" >
                    <img src="https://cdn.discordapp.com/attachments/1230880736777736363/1302353991325188189/images-removebg-preview.png?ex=672d152c&is=672bc3ac&hm=cb1b67374a887792655a231d6b30770a15cd86c4abbbf82c082622e7268682d4&" alt="logo" className="logo-img mb-2" />
                    Todo al Por Mayor
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <div className="d-flex flex-column w-100">
                        <div className="d-flex justify-content-center align-items-center mb-2">
                            <Form className="d-flex barra-busqueda">
                                <Button variant="light" className="search-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                    </svg>
                                </Button>
                                <Form.Control
                                    type="search"
                                    placeholder="Buscar producto"
                                    aria-label="Search"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Form>
                            <Button className="d-flex align-items-center ms-auto" onClick={handleLogout} >Cerrar sesión</Button>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <Nav className="flex-grow-1">
                                <Nav.Link onClick={handlerAdmin}>Inicio</Nav.Link>
                                <NavDropdown title="Filtro" id="navbarScrollingDropdown">
                                    <NavDropdown.Item onClick={() => setSelectedCategory("Bebidas")}>Bebidas</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => setSelectedCategory("Bebidas Alcoholicas")}>Bebidas Alcoholicas</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => setSelectedCategory("Snacks")}>Snacks</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => setSelectedCategory("Dulces")}>Dulces</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={() => setSelectedCategory("")}>Todos</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </div>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavAdmin;