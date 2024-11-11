import { useRef, useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useDarkMode from "../../custom/UseDarkMode";

import '../register/Register.css'


const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [errors, setErrors] = useState({
        username: false,
        email: false,
        password: false,
        passwordRepeat: false,
    });

    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordRepeatRef = useRef(null);
    const navigate = useNavigate();

    const [isDarkMode, toggleDarkMode] = useDarkMode();

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
        setErrors(prevErrors => ({
            ...prevErrors,
            username: event.target.value.length === 0
        }));
    };

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

    const handleChangePasswordRepeat = (event) => {
        setPasswordRepeat(event.target.value);
        setErrors(prevErrors => ({
            ...prevErrors,
            passwordRepeat: event.target.value.length === 0
        }));
    };

    const handleRegister = async () => {
        if (usernameRef.current.value.length === 0) {
            alert("¡Usuario vacío!");
            usernameRef.current.focus();
            setErrors(prevErrors => ({
                ...prevErrors,
                username: true
            }));
            return;
        }
        
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

        if (passwordRepeat.length === 0) {
            alert("¡Repite la contraseña!");
            passwordRepeatRef.current.focus();
            setErrors(prevErrors => ({
                ...prevErrors,
                passwordRepeat: true
            }));
            return;
        } else if (password !== passwordRepeat) {
            alert("¡Las contraseñas no coinciden!");
            passwordRepeatRef.current.focus();
            setErrors(prevErrors => ({
                ...prevErrors,
                passwordRepeat: true
            }));
            return;
        }
        const newUser = {
            UserName: username,
            Email: email,
            Password: password,
            UserType: "Client" 
        };
        try {
            const response = await fetch("https://localhost:7121/api/Register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                alert("Usuario registrado con éxito");
                navigate("/login");
            } else {
                alert("Error al registrar el usuario");
            }
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            alert("Ocurrió un error en el servidor");
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <Row className={`align-items-center min-vh-100 mx-0 w-50 ${isDarkMode ? "dark-mode" : ""}`}>
            <Col xs={12} md={5} className="text-center">
                <a href="/">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1THseam-yBpdGJYlt60zc_zFR-vlRSHuiRw&s" alt="logo" className="logo-img mb-2 w-50" />
                </a>
            </Col>
            <Col xs={12} md={7} className="mx-auto">
                <Card className="mt-5 mx-3 p-3 px-5 no-shadow">
                    <Card.Body>
                        <Form>
                            {/* Usuario */}
                            <FormGroup className="mb-4">
                                <Form.Control
                                    className="input"
                                    ref={usernameRef}
                                    value={username}
                                    onChange={handleChangeUsername}
                                    type="text"
                                    placeholder="Ingresar Usuario" />
                                {errors.username &&
                                    <p className="text-danger">El usuario no debe ser vacío</p>
                                }
                            </FormGroup>
                            {/* Email */}
                            <FormGroup className="mb-4">
                                <Form.Control
                                    className="input"
                                    ref={emailRef}
                                    value={email}
                                    onChange={handleChangeEmail}
                                    type="email"
                                    placeholder="Ingresar Email" />
                                {errors.email &&
                                    <p className="text-danger">El email no debe ser vacío</p>
                                }
                            </FormGroup>
                            {/* Password */}
                            <FormGroup className="mb-4">
                                <Form.Control
                                    className="input"
                                    ref={passwordRef}
                                    value={password}
                                    onChange={handleChangePassword}
                                    type="password"
                                    required
                                    placeholder="Ingresar contraseña"
                                />
                                {errors.password &&
                                    <p className="text-danger">El password no debe ser vacío</p>}
                            </FormGroup>
                            <FormGroup className="mb-4">
                                <Form.Control
                                    className="input"
                                    ref={passwordRepeatRef}
                                    value={passwordRepeat}
                                    onChange={handleChangePasswordRepeat}
                                    type="password"
                                    required
                                    placeholder="Repetir contraseña"
                                />
                                {errors.passwordRepeat &&
                                    <p className="text-danger">Las contraseñas deben coincidir</p>}
                            </FormGroup>
                            <Button className="w-100 register-button mb-3" variant="secondary"
                                onClick={handleRegister}
                                type="button">
                                Registrarse
                            </Button>
                        </Form>
                    </Card.Body>
                    <Row className="center-text mt-3">
                        <Col md="auto">
                            <p className="mb-0">
                                ¿Ya tienes cuenta?
                                <a onClick={handleLoginRedirect} href="#"> Iniciar sesión</a>
                            </p>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Button
                variant="link"  
                onClick={toggleDarkMode} 
                className="ms-auto my-3"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-brilliance" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16M1 8a7 7 0 0 0 7 7 3.5 3.5 0 1 0 0-7 3.5 3.5 0 1 1 0-7 7 7 0 0 0-7 7"/>
                </svg>
            </Button>
        </Row>
    );
};

export default Register;