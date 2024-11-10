import { Button, Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import './NavSysAdmin.css'
import { useNavigate } from "react-router-dom";

const NavSysAdmin = ({ setSearchTerm, setSelectedCategory }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/login");
    };
    const handlerSysAdmin = () => {
        navigate('/sysadmin');
    }
    return (
        <Navbar expand="lg" className="navbar w-100">
            <Container fluid className="container">
                <Navbar.Brand onClick={handlerSysAdmin} className="nombre-logo" >
                    <img src="https://cdn.discordapp.com/attachments/1230880736777736363/1302353991325188189/images-removebg-preview.png?ex=672d152c&is=672bc3ac&hm=cb1b67374a887792655a231d6b30770a15cd86c4abbbf82c082622e7268682d4&" alt="logo" className="logo-img mb-2" />
                    Todo al Por Mayor
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <div className="d-flex flex-column w-100">
                        <div className="d-flex justify-content-center align-items-center mb-2">
                            <Button className="d-flex align-items-center ms-auto" onClick={handleLogout} >Cerrar sesión</Button>
                        </div>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavSysAdmin;