import { Button, Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import './nav.css'
import { useNavigate } from "react-router-dom";
import useDarkMode from "../../custom/UseDarkMode";
import { useAuth } from "../../services/auth/Auth.context";

const NavBar = ({ setSearchTerm, setSelectedCategory }) => {
    const [isDarkMode, toggleDarkMode] = useDarkMode();
    const navigate = useNavigate();
    const { handleLogout } = useAuth();
    const handleLogoutButton = () => {
        handleLogout();
    };
    const handlerCart = () => {
        navigate('/cart');
    }
    const handlerDashboard = () => {
        navigate('/dashboard');
    }
    const handlerPurchases = () => {
        navigate('/mypurchases');
    }
    return (
        <Navbar expand="lg" className={`navbar w-100 ${isDarkMode ? "dark-mode" : ""}`}>
            <Container fluid className="container">
                <Navbar.Brand onClick={handlerDashboard} className="nombre-logo" >
                    <img 
                        src="https://cdn.discordapp.com/attachments/1230880736777736363/1302353991325188189/images-removebg-preview.png?ex=6735a6ec&is=6734556c&hm=455c61881b321c961781d74280fbc0855ee9b46e6e0ef8e74fc04dc64359745c&" 
                        alt="logo" 
                        className="logo-img mb-2" />
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
                            <Button className="carrito" onClick={handlerCart}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
                                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                                </svg>
                            </Button>
                            <div className="d-flex align-items-center ms-auto">
                                <Button className="d-flex align-items-center ms-auto" onClick={handleLogoutButton} >Cerrar sesión</Button>
                            <Button
                                variant="link"
                                onClick={toggleDarkMode}
                                className="ms-auto my-3"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-brilliance" viewBox="0 0 16 16">
                                    <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16M1 8a7 7 0 0 0 7 7 3.5 3.5 0 1 0 0-7 3.5 3.5 0 1 1 0-7 7 7 0 0 0-7 7" />
                                </svg>
                            </Button>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <Nav className="flex-grow-1">
                                <Nav.Link onClick={handlerDashboard}>Inicio</Nav.Link>
                                <Nav.Link onClick={handlerPurchases}>Mis compras</Nav.Link>
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

export default NavBar;