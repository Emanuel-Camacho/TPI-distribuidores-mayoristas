import { useRef, useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import '../login/login.css'

const Register = ({ onRegister }) => {
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

        /* try {
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error en el registro');
            }
            catch (error) {
            alert(error.message);
            }   
            } */
        onRegister();
        navigate("/"); 
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <>
            <Card className="mt-5 mx-3 p-3 px-5 shadow">
                <Card.Body>
                    <Form>
                        {/* Usuario */}
                        <FormGroup className="mb-4">
                            <Form.Control
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
                    </Form>
                    <Row>
                        <Col />
                        <Col md={8} className="d-flex justify-content-end">
                            <Button className="register-button" variant="secondary"
                                onClick={handleRegister}
                                type="button">
                                Registrarse
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Row className="justify-content-end mt-3">
                <Col md="auto" className="d-flex">
                    <p className="mb-0">¿Ya tienes cuenta? <a onClick={handleLoginRedirect} href="#">Iniciar sesión</a></p>
                </Col>
            </Row>
        </>
    );
};

export default Register;
