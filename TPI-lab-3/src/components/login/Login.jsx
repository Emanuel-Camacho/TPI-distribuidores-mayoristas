import { useRef, useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from
    "react-bootstrap";
import { useNavigate } from "react-router-dom";

import './login.css'

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });

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

    const handleLogin = async () => {
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

        /* try {
            const res = await fetch("http://localhost:5268/api/Authentication",
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });

            if (!res.ok) {
                throw res;
            }

            const data = await res.text();
            localStorage.setItem("bookchampions-token", data);
            navigate("/");
        }
        catch (error) {
            console.error(error);
        } */

        onLogin();
        navigate("/");
    };


    const handleRegisterRedirect = () => {
        navigate('/register'); // Redirige a la ruta de registro
    }

    return (
        <>
            <Card className="mt-5 mx-3 p-3 px-5 shadow">
                <Card.Body>
                    <Form>
                        <FormGroup className="mb-4">
                            <Form.Control
                                ref={emailRef}
                                value={email}
                                onChange={handleChangeEmail}
                                type="email"
                                placeholder="Ingresar email" />
                            {errors.email &&
                                <p className="text-danger">El email no debe ser vacío</p>
                            }
                        </FormGroup>
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
                    </Form>
                    <Row>
                        <Col />
                        <Col md={8} className="d-flex justify-content-end">
                            <Button className="login-button" variant="secondary"
                                onClick={handleLogin}
                                type="button">
                                Iniciar sesión
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Row className="justify-content-end mt-3"> {/* no podemos alinear a la derecha */}
                <Col md="auto" className="d-flex">
                    <p className="mb-0">¿No tienes cuenta?<a onClick={handleRegisterRedirect} href="#">Regístrate</a></p>
                </Col>
            </Row>
        </>
    );
};
export default Login;