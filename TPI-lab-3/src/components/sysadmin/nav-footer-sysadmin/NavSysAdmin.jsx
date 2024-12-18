import { Button, Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import './NavSysAdmin.css'
import { useNavigate } from "react-router-dom";
import useDarkMode from "../../../custom/UseDarkMode";

const NavSysAdmin = ({ setSearchTerm, setSelectedCategory }) => {
    const [isDarkMode, toggleDarkMode] = useDarkMode();
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/login");
    };
    const handlerSysAdmin = () => {
        navigate('/sysadmin');
    }
    return (
        <Navbar expand="lg" className={`navbar w-100 ${isDarkMode ? "dark-mode" : ""}`}>
            <Container fluid className="container">
                <Navbar.Brand onClick={handlerSysAdmin} className="nombre-logo" >
                    <img 
                        src="https://cdn.discordapp.com/attachments/1230880736777736363/1302353991325188189/images-removebg-preview.png?ex=6735a6ec&is=6734556c&hm=455c61881b321c961781d74280fbc0855ee9b46e6e0ef8e74fc04dc64359745c&" 
                        alt="logo" 
                        className="logo-img mb-2" />
                    Todo al Por Mayor
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <div className="d-flex flex-column w-100">
                        <div className="d-flex align-items-center ms-auto">
                            <Button className="d-flex align-items-center ms-auto" onClick={handleLogout} >Cerrar sesión</Button>
                            <Button
                                variant="link"
                                onClick={toggleDarkMode}
                                className="ms-auto my-3 dark-mode-button"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-brilliance" viewBox="0 0 16 16">
                                    <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16M1 8a7 7 0 0 0 7 7 3.5 3.5 0 1 0 0-7 3.5 3.5 0 1 1 0-7 7 7 0 0 0-7 7" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    );
}

export default NavSysAdmin;