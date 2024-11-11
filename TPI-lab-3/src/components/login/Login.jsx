import { useRef, useState, useContext } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/auth/Auth.context";
import useDarkMode from "../../custom/UseDarkMode";

import './login.css'

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });
    const [error, setError] = useState("")
    const {token} = useAuth();

    const { handleLogin } = useAuth();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    
    const [isDarkMode, toggleDarkMode] = useDarkMode();

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
        setErrors(prevErrors => ({
            ...prevErrors,
            email: event.target.value.length === 0
        }));
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
        setErrors(prevErrors => ({
            ...prevErrors,
            password: event.target.value.length === 0
        }));
    };

    const handleSubmit = async () => {
        if (emailRef.current.value.length === 0) {
            alert("¡Email vacío!");
            emailRef.current.focus();
            setErrors(prevErrors => ({
                ...prevErrors,
                email: true
            }));
            return;
        }

        if (password.length === 0) {
            alert("¡Password vacío!");
            passwordRef.current.focus();
            setErrors(prevErrors => ({
                ...prevErrors,
                password: true
            }));
            return;
        }
        try {
            const response = await fetch("https://localhost:7121/api/Authentication/login",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error("Usuario o contraseña incorrectos.");
            }
            const { token, id, email: userEmail, userType } = await response.json();
            localStorage.setItem("authToken", token);
            localStorage.setItem("userData", JSON.stringify({ email: userEmail, userType, id }));
            handleLogin(userEmail, userType, id, token);
            
            if (userType === "Client") {
                navigate("/dashboard");
            } else if (userType === "Admin") {
                navigate("/admin");
            } else if (userType === "SysAdmin") {
                navigate("/sysadmin");
            }
            console.log("User Type:", userType);
            console.log("Token:", token);
        }catch (error) {
            console.error("Error al autenticar:", error);
            alert("Hubo un error en la autenticación.");
        }
    }; 
    
    const handleRegisterRedirect = () => {
        navigate('/register'); 
    }

    return (
        <Row className={`align-items-center min-vh-100 mx-0 w-50 ${isDarkMode ? "dark-mode" : ""}`}>
            <Col xs={12} md={5} className="text-center">
                <a href="/">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1THseam-yBpdGJYlt60zc_zFR-vlRSHuiRw&s" alt="logo" className="logo-img mb-2 w-50" />
                </a>
            </Col>
            <Col xs={12} md={7} className="mx-auto">
                <Card className="p-4 no-shadow">
                    <Card.Body>
                        <Form>
                            <FormGroup className="mb-4">
                                <Form.Control
                                    className="input"
                                    ref={emailRef}
                                    value={email}
                                    onChange={handleChangeEmail}
                                    type="email"
                                    placeholder="Email"
                                />
                                {errors.email && (
                                    <p className="text-danger">El email no debe ser vacío</p>
                                )}
                            </FormGroup>
                            <FormGroup className="mb-4">
                                <Form.Control
                                    className="input"
                                    ref={passwordRef}
                                    value={password}
                                    onChange={handleChangePassword}
                                    type="password"
                                    placeholder="Contraseña"
                                />
                                {errors.password && (
                                    <p className="text-danger">El password no debe ser vacío</p>
                                )}
                            </FormGroup>
                            <Button
                                className="w-100 btn-login mb-3"
                                onClick={handleSubmit}
                                variant="primary"
                            >
                                Ingresar
                            </Button>
                        </Form>
                        <p className="text-center">
                            ¿No tienes cuenta? <a onClick={handleRegisterRedirect} href="#">Registrarse</a>
                        </p>
                    </Card.Body>
                </Card>
            </Col>
            <Button
                variant="link"  
                onClick={toggleDarkMode} 
                className="ms-auto my-3"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-brilliance" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16M1 8a7 7 0 0 0 7 7 3.5 3.5 0 1 0 0-7 3.5 3.5 0 1 1 0-7 7 7 0 0 0-7 7"/>
                </svg>
            </Button>
        </Row>
    );
};
export default Login;