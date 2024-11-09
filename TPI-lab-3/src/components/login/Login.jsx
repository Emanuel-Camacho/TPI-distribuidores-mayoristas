import { useRef, useState, useContext } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/auth/Auth.context";

import './login.css'

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });
    const [error, setError] = useState("")

    const { handleLogin } = useAuth();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    // referencian los inputs directamente

    const navigate = useNavigate();
    // redirecciona al usuario a otras rutas

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

            handleLogin(userEmail, userType, id, token);
            
            if (userType === "Client") {
                navigate("/");
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
        <Row className="align-items-center min-vh-100 mx-0 w-50">
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
                                    placeholder="Usuario"
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
        </Row>
    );
};
export default Login;